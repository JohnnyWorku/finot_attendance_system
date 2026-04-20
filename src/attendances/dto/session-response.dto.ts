import { Attendance } from "../entities/attendance.entity";

export class SessionResoponseDto {
  sessionId?: string;
  date?: string;
  sessionTitle?: string;
  sessionDescription?: string;
  startTime?: Date;
  endTime?: Date;
  isClosed?: boolean;
  records?: Attendance[];
  createdAt?: Date;
  updatedAt?: Date;
}
