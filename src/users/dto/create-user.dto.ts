import { Type } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxDate,
  Matches,
  IsDate,
} from "class-validator";
import { otherSundaySchoolEnrollment } from "src/enums/other.sunday.school.enrollment.enum";
import { usersRole } from "src/enums/users.roles.enum";

export class CreateUserDto {
  @IsString()
  @Matches(/^ft_[a-z]{3}_[a-z]{2}_[0-9]{3}_(admin|student)$/, {
    message:
      "userId must be like ft_yoh_wo_001_admin (format: ft_xxx_xx_000_role)",
  })
  userId!: string;

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
