import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import * as bcrypt from 'bcrypt'

import { TaskEntity } from '../tasks/task.entity'
import { ProjectEntity } from '../projects/project.entity'
import { LogEntity } from '../logger/logs.entity'

@Entity({name: 'user'})
@Unique(['username'])
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    salt: string

    @Column({nullable: true})
    avatar: string
    
    @OneToMany(type => TaskEntity, task => task.author, {eager: true})
    tasks: TaskEntity[]
    
    @OneToMany(type => TaskEntity, task => task.assignedUser, {eager: true})
    assignedTasks: TaskEntity[]
    
    @ManyToMany(type => ProjectEntity, project => project.users, {cascade: true})
    @JoinTable()
    projects: ProjectEntity[]

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }

    @OneToMany(type => LogEntity, logs => logs.affectedUser)
    logs: LogEntity[]

}