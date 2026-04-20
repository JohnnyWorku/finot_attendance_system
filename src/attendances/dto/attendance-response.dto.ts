import { User } from "src/users/entities/user.entity";
import { Session } from "../entities/session.entity";

export class AttendanceResoponseDto {
  attendanceId?: string;
  attendanceType?: string;
  status?: string;
  remark?: string;
  session?: Session;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
}
