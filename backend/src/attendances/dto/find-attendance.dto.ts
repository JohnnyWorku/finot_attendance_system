import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { attendanceType } from "src/enums/attendance-type.enum";

export class FindAttendanceDto {
  @IsString()
  @IsNotEmpty()
  date!: string;

  @IsString()
  @IsNotEmpty()
  sessionTitle!: string;

  @IsEnum(attendanceType, {
    message: "valid type required (checkIn or checkOut)",
  })
  attendanceType!: attendanceType;
}
