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
export class Session {
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

  @Column({ type: "time" })
  startTime!: Date;

  @Column({ type: "time" })
  endTime!: Date;

  @Column({ default: false })
  isCheckedIn!: boolean;

  @Column({ default: false })
  isCheckedOut!: boolean;

  @OneToMany(() => Attendance, (attendance) => attendance.session, {
    cascade: true,
  })
  records!: Attendance[];

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
