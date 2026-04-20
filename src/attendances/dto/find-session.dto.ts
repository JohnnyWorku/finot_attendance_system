import { IsNotEmpty, IsString } from "class-validator";

export class FindSessionDto {
  @IsString()
  @IsNotEmpty()
  date!: string;

  @IsString()
  @IsNotEmpty()
  sessionTitle!: string;
}
