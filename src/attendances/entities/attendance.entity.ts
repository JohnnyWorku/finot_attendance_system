import { attendanceStatus } from "src/enums/attendance-status.enum";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AttendanceSession } from "./attendance-session.entity";
import { User } from "src/users/entities/user.entity";
import { attendanceType } from "src/enums/attendance-type.enum";

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn("uuid")
  attendanceId!: string;

  @Column({
    type: "enum",
    enum: attendanceType,
  })
  attendanceType!: attendanceType;

  @Column({
    type: "enum",
    enum: attendanceStatus,
    default: attendanceStatus.ABSENT,
  })
  status!: attendanceStatus;

  @Column({ nullable: true })
  remark?: string;

  @ManyToOne(() => AttendanceSession, (session) => session.records, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  session!: AttendanceSession;

  @ManyToOne(() => User, (user) => user.records, {
    eager: false,
  })
  @JoinTable()
  user!: User;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
