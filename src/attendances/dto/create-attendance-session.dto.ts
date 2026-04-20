import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateAttendanceSessionDto {
  @IsString()
  @IsNotEmpty()
  sessionTitle!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  sessionDescription?: string;

  @IsDateString({}, { message: "startTime must be a valid ISO date-time" })
  startTime!: string;

  @IsDateString({}, { message: "startTime must be a valid ISO date-time" })
  endTime?: string;
}
