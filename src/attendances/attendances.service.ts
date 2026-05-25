import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Attendance } from "./entities/attendance.entity";
// import { AttendanceSession } from "./entities/attendance-session.entity";
// import { User } from "src/users/entities/user.entity";
// import { usersRole } from "src/enums/users-roles.enum";
// import { createAttendanceSessionDto } from "./dto/create-attendance-session.dto";
import { UsersService } from "src/users/users.service";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";
import { SessionService } from "./sessions.service";
import { attendanceType } from "src/enums/attendance-type.enum";
import { UpdateAttendanceDto } from "./dto/update-attendance.dto";
import { FindAttendanceDto } from "./dto/find-attendance.dto";

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    private userService: UsersService,
    private sessionService: SessionService,
  ) {}

  async create(sessonId: string, createAttendanceDto: CreateAttendanceDto) {
    const session = await this.sessionService.findOneById(sessonId);

    if (!session) {
      throw new Error("Session not found.");
    }

    const users = await this.userService.findAll();

    const records = users.map((user) =>
      this.attendanceRepository.create({
        ...createAttendanceDto,
        user: user,
        session: session,
      }),
    );

    return this.attendanceRepository.save(records);
  }

  async findAll(attendanceType?: attendanceType) {
    if (attendanceType) {
      return this.attendanceRepository.find({
        where: { attendanceType },
        relations: ["session", "user"],
        select: {
          session: {
            sessionId: true,
            date: true,
            sessionTitle: true,
            sessionDescription: true,
          },

          user: {
            id: true,
            userId: true,
            userFullName: true,
          },
        },
      });
    }

    return this.attendanceRepository.find({
      relations: ["session", "user"],
      select: {
        session: {
          sessionId: true,
          date: true,
          sessionTitle: true,
          sessionDescription: true,
        },

        user: {
          id: true,
          userId: true,
          userFullName: true,
        },
      },
    });
  }

  async findOneById(attendanceId: string) {
    const attendace = await this.attendanceRepository.findOne({
      where: { attendanceId },
      relations: ["session", "user"],
      select: {
        session: {
          sessionId: true,
          date: true,
          sessionTitle: true,
          sessionDescription: true,
        },

        user: {
          id: true,
          userId: true,
          userFullName: true,
        },
      },
    });

    if (!attendace) {
      throw new NotFoundException(
        `Attendance with id ${attendanceId} not found.`,
      );
    }

    return attendace;
  }

  async findOne(findAttendanceDto: FindAttendanceDto) {
    const { attendanceType, ...sessionDto } = findAttendanceDto;
    const session = await this.sessionService.findOne(sessionDto);

    if (!session) {
      throw new NotFoundException(
        `There was no session on ${sessionDto.date} with "${sessionDto.sessionTitle}" title`,
      );
    }

    return this.attendanceRepository.find({
      where: {
        attendanceType,
        session: {
          sessionId: session.sessionId,
        },
      },

      relations: ["session", "user"],
      select: {
        session: {
          sessionId: true,
          date: true,
          sessionTitle: true,
          sessionDescription: true,
        },

        user: {
          id: true,
          userId: true,
          userFullName: true,
        },
      },
    });
  }

  async update(attendanceId: string, updateAttendanceDto: UpdateAttendanceDto) {
    const attendance = await this.findOneById(attendanceId);

    if (!attendance)
      throw new NotFoundException(
        `Attendance with id ${attendanceId} not found.`,
      );

    await this.attendanceRepository.update(attendanceId, updateAttendanceDto);
    return attendance;
  }

  async bulkUpdate(
    sessionId: string,
    updateAttendanceDtos: UpdateAttendanceDto[],
  ) {
    const session = await this.sessionService.findOneById(sessionId);

    if (!session) {
      throw new Error("Session not found.");
    }

    const records = await this.attendanceRepository.find({
      where: { session: { sessionId } },
    });

    const recordMap = new Map(records.map((r) => [r.attendanceId, r]));

    console.log(updateAttendanceDtos);
    console.log(Array.isArray(updateAttendanceDtos));

    updateAttendanceDtos.forEach((update) => {
      const record = recordMap.get(update.attendanceId);
      if (!record) return;

      if (update.status) record.status = update.status;
      if (update.remark) record.remark = update.remark;
    });

    const modifiedRecords = [...recordMap.values()];

    await this.attendanceRepository.save(modifiedRecords);

    return this.sessionService.findOneById(sessionId);
  }

  async remove(attendanceId: string) {
    const attendance = await this.findOneById(attendanceId);

    if (!attendance)
      throw new NotFoundException(
        `Attendance with id ${attendanceId} not found.`,
      );

    return this.attendanceRepository.remove(attendance);
  }

  // // Get all students for a session
  // async getSessionAttendance(sessionId: string) {
  //   return this.attendanceRepo.find({
  //     where: { session: { id: sessionId } },
  //     relations: ["student", "session"],
  //   });
  // }
}
