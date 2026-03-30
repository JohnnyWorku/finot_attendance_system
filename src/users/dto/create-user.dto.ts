import { Type } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxDate,
  IsDate,
} from "class-validator";
import { otherSundaySchoolEnrollment } from "src/enums/other.sunday.school.enrollment.enum";
import { usersRole } from "src/enums/users.roles.enum";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userFullName!: string;

  @IsOptional()
  @IsString()
  userPhone?: string;

  @IsOptional()
  @IsEmail()
  userEmail?: string;

  @IsString()
  @IsNotEmpty()
  fatherName!: string;

  @IsOptional()
  @IsString()
  fatherPhone?: string;

  @IsString()
  @IsNotEmpty()
  motherName!: string;

  @IsOptional()
  @IsString()
  motherPhone?: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: "dateOfBirth must be a valid date string (YYYY-MM-DD)" })
  @MaxDate(new Date(), { message: "dateOfBirth cannot be in the future" })
  dateOfBirth?: Date;

  @IsEnum(otherSundaySchoolEnrollment, {
    message: "valid answer required (yes or no)",
  })
  otherSundaySchoolEnrollment!: otherSundaySchoolEnrollment;

  @IsEnum(usersRole, {
    message: "valid role required (student or admin)",
  })
  userRole!: usersRole;

  @IsStrongPassword()
  @IsNotEmpty()
  password!: string;
}
