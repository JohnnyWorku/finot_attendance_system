import { AttendanceResoponseDto } from "./attendance-response.dto";

export class SessionResoponseDto {
  sessionId?: string;
  date?: string;
  sessionTitle?: string;
  sessionDescription?: string;
  startTime?: Date;
  endTime?: Date;
  isClosed?: boolean;
  records?: AttendanceResoponseDto;
  createdAt?: Date;
  updatedAt?: Date;
}
