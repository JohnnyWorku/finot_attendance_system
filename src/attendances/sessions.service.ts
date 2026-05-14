import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSessionDto } from "./dto/create-session.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Session } from "./entities/session.entity";
import { Repository } from "typeorm";
import { UpdateSessionDto } from "./dto/update-session.dto";
import { FindSessionDto } from "./dto/find-session.dto";

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  // Create a Session
  async create(createSessionDto: CreateSessionDto) {
    const session = this.sessionRepository.create(createSessionDto);
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

  async update(sessionId: string, updateSessionDto: UpdateSessionDto) {
    const session = await this.findOneById(sessionId);

    if (!session)
      throw new NotFoundException(`Attendance with id ${sessionId} not found.`);

    await this.sessionRepository.update(sessionId, updateSessionDto);
    return this.findOneById(sessionId);
  }

  async remove(sessionId: string) {
    const session = await this.findOneById(sessionId);

    if (!session)
      throw new NotFoundException(`Attendance with id ${sessionId} not found.`);

    return this.sessionRepository.remove(session);
  }
}
