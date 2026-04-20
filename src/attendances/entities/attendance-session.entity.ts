import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Attendance } from "./attendance.entity";

@Entity()
export class AttendanceSession {
  @PrimaryGeneratedColumn("uuid")
  sessionId!: string;

  @Column({
    type: "date",
    default: () => "CURRENT_DATE",
  })
  date!: string;

  @Column()
  sessionTitle!: string;

  @Column({ nullable: true })
  sessionDescription?: string;

  @Column({ type: "timestamptz" })
  startTime!: Date;

  @Column({ type: "timestamptz" })
  endTime!: Date;

  @Column({ default: false })
  isClosed!: boolean;

  @OneToMany(() => Attendance, (attendance) => attendance.session, {
    cascade: true,
  })
  records!: Attendance[];

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
