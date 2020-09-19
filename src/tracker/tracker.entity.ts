import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { TaskEntity } from "../tasks/task.entity";

@Entity({name: 'tracker'})
export class TrackerEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:true})
    startDate: Date

    @Column({default: false})
    isActive: boolean

    @Column({nullable:true})
    tracked: number

    @OneToOne(type => TaskEntity, task => task.tracker)
    @JoinColumn()
    task: TaskEntity
    
}