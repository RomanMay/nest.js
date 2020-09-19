import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/auth/user.entity";
import { TaskEntity } from "src/tasks/task.entity";

import { LogsRepository } from "./logger.repository";

import { ActionMessageOptions } from "./actionMessageOptions";

import { TaskLogActionTypes } from "./task-logs.enum"

import { ApiService } from "../shared/ApiService";



@Injectable()
export class LoggerService {
    constructor(
        // private projectRepository: ProjectRepository,
        private logRepository: LogsRepository,
        private apiService: ApiService
        

    ){}

    async writeLog(actionType: TaskLogActionTypes,
        affectedUserId: number,
        taskId: number,
        ip: string,
        options?: ActionMessageOptions,
        
        ){
            console.log('tracked in', options)

            const actionMessage = this.buildActionMessage(actionType, options)

            const city = await this.apiService.getDataFromApi(ip)

            const newLog = this.logRepository.create({
                actionMessage,
                affectedUserId,
                taskId,
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
            case TaskLogActionTypes.startTracked:
                return `${actionType} : ${option.startTrackingDate}`
            case TaskLogActionTypes.stopTracked:
                return `${actionType} : ${option.trackedTime}`
            default:
                return actionType
        }
    }
}