import { attendanceStatus } from "src/enums/attendance.status.enum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AttendanceSession } from "./attendance.session.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  checkInTime!: Date;

  @Column({
    type: "enum",
    enum: attendanceStatus,
    default: attendanceStatus.ABSENT,
  })
  checkInStatus!: attendanceStatus;

  @Column({ nullable: true })
  checkOutTime!: Date;

  @Column({
    type: "enum",
    enum: attendanceStatus,
    default: attendanceStatus.ABSENT,
  })
  checkOutStatus!: attendanceStatus;

  @Column({ nullable: true })
  remark!: string;

  @ManyToOne(() => AttendanceSession, (session) => session.records, {
    onDelete: "CASCADE",
  })
  session!: AttendanceSession;

  @ManyToOne(() => User, (user) => user.attendances, {
    eager: true,
  })
  user!: User;
}
