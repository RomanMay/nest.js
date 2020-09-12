import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { User } from '../auth/user.entity';

@Entity({name: 'project'})
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name : string;

    @OneToMany(type => Task, task => task.project)
    tasks: Task[]

    @ManyToMany(() => User, user => user.projects)
    users: User[]
    project: User;
}
