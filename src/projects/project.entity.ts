import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import { TaskEntity } from '../tasks/task.entity';
import { UserEntity } from '../auth/user.entity';

@Entity({name: 'project'})
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name : string;

    @OneToMany(type => TaskEntity, task => task.project)
    tasks: TaskEntity[]

    @ManyToMany(() => UserEntity, user => user.projects)
    users: UserEntity[]
    project: UserEntity;
}
