import { Module } from "@nestjs/common";
import { AttendanceService } from "./attendances.service";
import { AttendanceController } from "./attendances.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Attendance } from "./entities/attendance.entity";
import { Session } from "./entities/session.entity";
import { User } from "src/users/entities/user.entity";
import { UsersModule } from "src/users/users.module";
import { SessionController } from "./sessions.controller";
import { SessionService } from "./sessions.service";

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Session, User]), UsersModule],
  controllers: [AttendanceController, SessionController],
  providers: [AttendanceService, SessionService],
})
export class AttendancesModule {}
