import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Attendance } from "./attendance.entity";

@Entity()
export class AttendanceSession {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  sessionTitle!: string;

  @Column({ type: "date" })
  date!: Date;

  @Column({ nullable: true })
  startTime!: Date | null;

  @Column({ nullable: true })
  endTime!: Date | null;

  @Column({ default: false })
  isClosed!: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @OneToMany(() => Attendance, (attendance) => attendance.session, {
    cascade: true,
  })
  records!: Attendance[];
}
