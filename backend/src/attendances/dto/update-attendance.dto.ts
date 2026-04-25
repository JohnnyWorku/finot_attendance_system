import { attendanceStatus } from "src/enums/attendance-status.enum";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateAttendanceDto {
  @IsString()
  @IsNotEmpty()
  attendanceId!: string;

  @IsEnum(attendanceStatus, {
    message: "valid status required (present, permission, late or absent)",
  })
  status?: attendanceStatus;

  @IsOptional()
  @IsString()
  remark?: string;
}
