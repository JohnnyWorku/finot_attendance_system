import {
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  sessionTitle!: string;

  @IsOptional()
  @IsString()
  sessionDescription?: string;

  @IsDateString()
  date!: string;

  @IsMilitaryTime()
  startTime!: string;

  @IsMilitaryTime()
  endTime?: string;
}
