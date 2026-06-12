import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    FullName!: string;

    @Column()
    baptismName!: string;

    @Column()
    age!: string;

    @Column()
    phoneNumber!: string;

    @Column()
    learningStatus!: string;

    @Column()
    suitableTime!: string;
}
