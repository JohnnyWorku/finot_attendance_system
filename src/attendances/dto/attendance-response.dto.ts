import { Session } from "../entities/session.entity";
import { UserResponseDto } from "src/users/dto/user-response.dto";

export class AttendanceResoponseDto {
  attendanceId?: string;
  attendanceType?: string;
  status?: string;
  remark?: string;
  session?: Session;
  user?: UserResponseDto;
  createdAt?: Date;
  updatedAt?: Date;
}
