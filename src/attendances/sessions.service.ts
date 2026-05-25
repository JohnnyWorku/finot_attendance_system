import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateSessionDto } from "./dto/create-session.dto";
import { UpdateSessionDto } from "./dto/update-session.dto";
import { FindSessionDto } from "./dto/find-session.dto";

import { Session } from "./entities/session.entity";
import { Attendance } from "./entities/attendance.entity";
import { attendanceStatus } from "src/enums/attendance-status.enum";
import { attendanceType } from "src/enums/attendance-type.enum";

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,

    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  // Create session
  async create(createSessionDto: CreateSessionDto) {
    const session =
      this.sessionRepository.create(createSessionDto);

    return this.sessionRepository.save(session);
  }

  async findAll() {
    return this.sessionRepository.find({
      relations: ["records", "records.user"],
      select: {
        sessionId: true,
        date: true,
        sessionTitle: true,
        sessionDescription: true,
        records: {
          attendanceId: true,
          attendanceType: true,
          status: true,
          remark: true,
          user: {
            id: true,
            userId: true,
            userFullName: true,
          },
        },
      },
    });
  }

  async findOneById(sessionId: string) {
    return this.sessionRepository.findOne({
      where: { sessionId },
      relations: ["records", "records.user"],
      select: {
        sessionId: true,
        date: true,
        sessionTitle: true,
        sessionDescription: true,
        records: {
          attendanceId: true,
          attendanceType: true,
          status: true,
          remark: true,
          user: {
            id: true,
            userId: true,
            userFullName: true,
          },
        },
      },
    });
  }

  async findOne(findSessionDto: FindSessionDto) {
    return this.sessionRepository.findOne({
      where: { ...findSessionDto },
      relations: ["records", "records.user"],
      select: {
        sessionId: true,
        date: true,
        sessionTitle: true,
        sessionDescription: true,
        records: {
          attendanceId: true,
          attendanceType: true,
          status: true,
          remark: true,
          user: {
            id: true,
            userId: true,
            userFullName: true,
          },
        },
      },
    });
  }

  async update(
    sessionId: string,
    updateSessionDto: UpdateSessionDto
  ) {
    const session =
      await this.findOneById(sessionId);

    if (!session) {
      throw new NotFoundException(
        `Session with id ${sessionId} not found`
      );
    }

    await this.sessionRepository.update(
      sessionId,
      updateSessionDto
    );

    return this.findOneById(sessionId);
  }

  async remove(sessionId: string) {
    const session =
      await this.findOneById(sessionId);

    if (!session) {
      throw new NotFoundException(
        `Session with id ${sessionId} not found`
      );
    }

    return this.sessionRepository.remove(session);
  }

  async getDashboardStats() {
    const totalSessions =
      await this.sessionRepository.count();

    const totalAttendance =
      await this.attendanceRepository.count();

    const present =
      await this.attendanceRepository.count({
        where: { status: attendanceStatus.PRESENT },
      });

    const late =
      await this.attendanceRepository.count({
        where: { status: attendanceStatus.LATE },
      });

    const absent =
      await this.attendanceRepository.count({
        where: { status: attendanceStatus.ABSENT},
      });

    const excused =
      await this.attendanceRepository.count({
        where: { status: attendanceStatus.EXCUSED },
      });

    const checkIn =
      await this.attendanceRepository.count({
        where: { attendanceType: attendanceType.CHECKIN },
      });

    const checkOut =
      await this.attendanceRepository.count({
        where: { attendanceType: attendanceType.CHECKOUT },
      });

    const recentSessions =
      await this.sessionRepository.find({
        order: {
          createdAt: "DESC",
        },
        take: 2,
      });

    return {
      totalSessions,
      totalAttendance,
      statusBreakdown: {
        present,
        late,
        absent,
        excused,
      },
      typeBreakdown: {
        checkIn,
        checkOut,
      },
      recentSessions,
    };
  }
}