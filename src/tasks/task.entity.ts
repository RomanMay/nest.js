import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, DeleteDateColumn } from 'typeorm'

import { TaskStatus } from './task-status.enum'

import { UserEntity } from '../auth/user.entity'
import { ProjectEntity } from '../projects/project.entity'
import { LogEntity } from '../logger/logs.entity'

@Entity({name: 'task'})
export class TaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column({type: 'enum', enum: TaskStatus, default: TaskStatus.open})
    status: TaskStatus

    @ManyToOne(user => UserEntity, user => user.tasks, {eager: false})
    user: UserEntity

    @Column()
    userId: number

    @ManyToOne(user => UserEntity, user => user.tasks, {eager: false})
    assignedUser: UserEntity

    @ManyToOne(project => ProjectEntity, project => project.tasks)
    project: ProjectEntity

    @OneToMany(type => LogEntity, logs => logs.task)
    logs: LogEntity[]
    
    @DeleteDateColumn({ name: 'deleted_at' })
    public deletedAt: Date
}