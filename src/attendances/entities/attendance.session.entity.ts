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
  id!: string;

  @Column({ type: "date" })
  date!: Date;

  @Column()
  sessionTitle!: string;

  @Column()
  sessionDescription?: string;

  @Column({ nullable: true })
  startTime!: Date | null;

  @Column({ nullable: true })
  endTime!: Date | null;

  @Column({ default: false })
  isClosed!: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;

  @OneToMany(() => Attendance, (attendance) => attendance.session, {
    cascade: true,
  })
  records!: Attendance[];
}
