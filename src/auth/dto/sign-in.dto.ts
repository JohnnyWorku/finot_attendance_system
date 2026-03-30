import { IsString } from "class-validator";

export class signInDto {
  @IsString()
  userId!: string;

  @IsString()
  password!: string;
}
