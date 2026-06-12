import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    fullName!: string;

    @Column()
    baptismName!: string;

    @Column()
    age!: string;

    @Column({ unique: true })
    phoneNumber!: string;

    @Column()
    learningStatus!: string;

    @Column()
    suitableTime!: string;
}
