import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import * as bcrypt from 'bcrypt'

import { Task } from '../tasks/task.entity'
import { Project } from '../projects/project.entity'
import { Logs } from '../logger/logs.entity'

@Entity({name: 'user'})
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    salt: string
    
    @OneToMany(type => Task, task => task.user, {eager: true})
    tasks: Task[]
    
    @ManyToMany(type => Project, project => project.users, {cascade: true})
    @JoinTable()
    projects: Project[]

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }

    @OneToMany(type => Logs, logs => logs.affectedUser)
    logs: Logs[]

}