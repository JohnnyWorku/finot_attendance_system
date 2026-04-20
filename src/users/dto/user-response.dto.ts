import { Attendance } from "src/attendances/entities/attendance.entity";
import { otherSundaySchoolEnrollment } from "src/enums/other-sunday-school-enrollment.enum";
import { usersRole } from "src/enums/users-roles.enum";

export class UserReport {
  id?: string;
  userId?: string;
  userFullName?: string;
  userPhone?: string;
  userEmail?: string;
  fatherName?: string;
  fatherPhone?: string;
  motherName?: string;
  motherPhone?: string;
  address?: string;
  dateOfBirth?: Date;
  otherSundaySchoolEnrollment?: otherSundaySchoolEnrollment;
  userRole?: usersRole;
  records?: Attendance;
}
