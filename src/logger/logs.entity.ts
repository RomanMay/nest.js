import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { TaskEntity } from "../tasks/task.entity";
import { UserEntity } from "../auth/user.entity";

@Entity({ name: 'log' })
export class LogEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({ type: 'time without time zone' })
    createdAt: Date

    @Column()
    actionMessage: string

    @Column({ nullable: true })
    city: string

    @Column({ nullable: true })
    ip: string

    @ManyToOne(user => UserEntity, user => user.logs)
    affectedUser: UserEntity

    @Column()
    affectedUserId: number

    @ManyToOne(task => TaskEntity, task => task.logs)
    task: TaskEntity

    @Column()
    taskId: number
}