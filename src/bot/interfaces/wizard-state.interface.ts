import { otherSundaySchoolEnrollment } from "src/enums/other-sunday-school-enrollment.enum";

export interface RegistrationState {
  userFullName?: string;
  userPhone?: string;
  userEmail?: string;
  fatherName?: string;
  fatherPhone?: string;
  motherName?: string;
  motherPhone?: string;
  address?: string;
  dateOfBirth?: Date;
  otherSundaySchoolEnrollment: otherSundaySchoolEnrollment;
}
