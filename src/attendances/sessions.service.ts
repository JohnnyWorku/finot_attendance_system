import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAttendanceSessionDto } from "./dto/create-attendance-session.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AttendanceSession } from "./entities/attendance-session.entity";
import { Repository } from "typeorm";
import { UpdateAttendanceSessionDto } from "./dto/update-attendance-session.dto";
import { FindSessionDto } from "./dto/find-session.dto";

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(AttendanceSession)
    private readonly sessionRepository: Repository<AttendanceSession>,
  ) {}

  // Create a Session
  async create(createAttendanceSessionDto: CreateAttendanceSessionDto) {
    const session = this.sessionRepository.create(createAttendanceSessionDto);
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
    updateAttendanceSessionDto: UpdateAttendanceSessionDto,
  ) {
    const session = await this.findOneById(sessionId);

    if (!session)
      throw new NotFoundException(`Attendance with id ${sessionId} not found.`);

    await this.sessionRepository.update(sessionId, updateAttendanceSessionDto);
    return this.findOneById(sessionId);
  }

  async remove(sessionId: string) {
    const session = await this.findOneById(sessionId);

    if (!session)
      throw new NotFoundException(`Attendance with id ${sessionId} not found.`);

    return this.sessionRepository.remove(session);
  }
}
