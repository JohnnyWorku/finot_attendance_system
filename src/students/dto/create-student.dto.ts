import { IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    fullName!: string;

    @IsString()
    @IsNotEmpty()
    baptismName!: string;

    @IsString()
    @IsNotEmpty()
    age!: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber!: string;

    @IsString()
    @IsNotEmpty()
    learningStatus!: string;

    @IsString()
    @IsNotEmpty()
    suitableTime!: string;
}
