import { PartialType } from "@nestjs/mapped-types";
import { CreateAttendanceSessionDto } from "./create-attendance-session.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateAttendanceSessionDto extends PartialType(
  CreateAttendanceSessionDto,
) {
  @IsOptional()
  @IsBoolean()
  isClosed?: boolean;
}
