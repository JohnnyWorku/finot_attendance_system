import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { usersRole } from "src/enums/users.roles.enum";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  user_id!: string;

  @Column()
  full_name!: string;

  @Column()
  father_name!: string;

  @Column()
  mother_name!: string;

  @Column()
  user_phone!: number | undefined;

  @Column()
  father_phone!: number;

  @Column()
  mother_phone!: number;

  @Column()
  address!: string;

  @Column({ type: "date" })
  date_of_birth!: Date;

  @Column({
    type: "enum",
    enum: usersRole,
  })
  user_role!: usersRole;

  @Column()
  other_ss!: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deletedAt!: Date;
}
