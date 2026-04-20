import { Module } from "@nestjs/common";
import { AttendanceService } from "./attendances.service";
import { AttendanceController } from "./attendances.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Attendance } from "./entities/attendance.entity";
import { AttendanceSession } from "./entities/attendance-session.entity";
import { User } from "src/users/entities/user.entity";
import { UsersModule } from "src/users/users.module";
import { SessionController } from "./sessions.controller";
import { SessionService } from "./sessions.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance, AttendanceSession, User]),
    UsersModule,
  ],
  controllers: [AttendanceController, SessionController],
  providers: [AttendanceService, SessionService],
})
export class AttendancesModule {}
