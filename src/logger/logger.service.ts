import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/auth/user.entity";
import { TaskEntity } from "src/tasks/task.entity";

import { LogsRepository } from "./logger.repository";

import { ActionMessageOptions } from "./actionMessageOptions";
import { TaskLogActionTypes } from "./task-logs.enum"

@Injectable()
export class LoggerService {
    constructor(
        private logRepository: LogsRepository
    ){}

    async writeLog(actionType: TaskLogActionTypes,
        affectedUser: UserEntity,
        task: TaskEntity,
        options?: ActionMessageOptions,
        ){
            const actionMessage = this.buildActionMessage(actionType, options)

            const newLog = this.logRepository.create({
                actionMessage,
                affectedUser,
                task
            })

        return this.logRepository.save(newLog)
    }

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