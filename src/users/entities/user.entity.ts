import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { usersRole } from "src/enums/users.roles.enum";
import { otherSundaySchoolEnrollment } from "src/enums/other.sunday.school.enrollment.enum";
import { Attendance } from "src/attendances/entities/attendance.entity";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  userId!: string;

  @Column()
  userFullName!: string;

  @Column({ type: "varchar", nullable: true })
  userPhone!: string | null;

  @Column({ type: "varchar", nullable: true, unique: true })
  userEmail!: string | null;

  @Column()
  fatherName!: string;

  @Column({ type: "varchar", nullable: true })
  fatherPhone!: string | null;

  @Column()
  motherName!: string;

  @Column({ type: "varchar", nullable: true })
  motherPhone!: string | null;

  @Column()
  address!: string;

  @Column({ type: "date", nullable: true })
  dateOfBirth!: Date | null;

  @Column({
    type: "enum",
    enum: otherSundaySchoolEnrollment,
  })
  otherSundaySchoolEnrollment!: otherSundaySchoolEnrollment;

  @Column({
    type: "enum",
    enum: usersRole,
  })
  userRole!: usersRole;

  @Column()
  password!: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  deletedAt!: Date | null;

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendances!: Attendance;
}
