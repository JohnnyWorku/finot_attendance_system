import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  sessionTitle!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  sessionDescription?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsDateString({}, { message: "startTime must be a valid ISO date-time" })
  startTime!: string;

  @IsDateString({}, { message: "startTime must be a valid ISO date-time" })
  endTime?: string;
}
