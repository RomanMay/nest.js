import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { TaskStatus } from './task-status.enum'
import { User } from '../auth/user.entity'

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column({type: 'enum', enum: TaskStatus, default: TaskStatus.OPEN})
    status: TaskStatus

    @ManyToOne(user => User, user => user.tasks, {eager: false})
    user: User

    @Column()
    userId: number

    @ManyToOne(user => User, user => user.tasks, {eager: false})
    assignedUser: User
}