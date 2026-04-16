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

  @Column({
    type: "date",
    unique: true,
    default: () => "CURRENT_DATE",
  })
  date!: string;

  @Column()
  sessionTitle!: string;

  @Column({ nullable: true })
  sessionDescription?: string;

  @Column({ type: "timestamptz", nullable: true })
  startTime?: Date;

  @Column({ type: "timestamptz", nullable: true })
  endTime?: Date;

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
