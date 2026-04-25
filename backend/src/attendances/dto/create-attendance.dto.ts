import { IsEnum } from "class-validator";
import { attendanceType } from "src/enums/attendance-type.enum";

export class CreateAttendanceDto {
  @IsEnum(attendanceType, {
    message: "valid type required (checkIn or checkOut)",
  })
  attendanceType!: attendanceType;
}
