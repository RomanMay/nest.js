import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/auth/user.entity";
import { TaskEntity } from "src/tasks/task.entity";

import { LogsRepository } from "./logger.repository";

import { ActionMessageOptions } from "./actionMessageOptions";
import { TaskLogActionTypes } from "./task-logs.enum"
import { LogEntity } from "./logs.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectRepository } from "src/projects/project.repository";

@Injectable()
export class LoggerService {
    constructor(
        // private projectRepository: ProjectRepository,
        private logRepository: LogsRepository
        

    ){}

    async writeLog(actionType: TaskLogActionTypes,
        affectedUser: UserEntity,
        task: TaskEntity,
        ip: string,
        city: string,
        options?: ActionMessageOptions,
        
        ){
            const actionMessage = this.buildActionMessage(actionType, options)

            const newLog = this.logRepository.create({
                actionMessage,
                affectedUser,
                task,
                city,
                ip
                
            })

        return this.logRepository.save(newLog)
    }

    // async getLogs(projectId: number, userId: number): Promise<LogEntity[]> {
    //     // const project = this.projectRepository.getById(projectId, userId)
    //     // if(!project) { 
    //     //     throw new Error('kek')
    //     // }
    //     return this.logRepository.getLogs(projectId)
    // }

    buildActionMessage(actionType: TaskLogActionTypes, option?: ActionMessageOptions): string{
        switch(actionType){
            case TaskLogActionTypes.changeStatus:
                return `${actionType} from ${option.taskStatuses.old} to ${option.taskStatuses.new}`
            case TaskLogActionTypes.assignUser:
                return `${actionType} : ${option.assignedUserId}`
            default:
                return actionType
        }
    }
}