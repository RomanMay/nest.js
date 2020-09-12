import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Task } from "../tasks/task.entity";
import { User } from "../auth/user.entity";

@Entity()
export class Logs extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({type: 'time without time zone'})
    createdAt: Date

    @Column()
    logMessage: string

    @ManyToOne(user => User, user => user.logs)
    affectedUser: User

    @ManyToOne(task => Task, task => task.logs)
    task: Task

    
}