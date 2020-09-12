import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { TaskStatus } from './task-status.enum'
import { User } from '../auth/user.entity'
import { Project } from '../projects/project.entity'
import { LoggerService } from '@nestjs/common'
import { Logs } from '../logger/logs.entity'

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

    @ManyToOne(project => Project, project => project.tasks)
    project: Project

    @OneToMany(type => Logs, logs => logs.task)
    logs: Logs[]
}