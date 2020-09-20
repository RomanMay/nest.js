import { Injectable } from "@nestjs/common";

import { LogsRepository } from "./logger.repository";

import { ActionMessageOptions } from "./actionMessageOptions";

import { TaskLogActionTypes } from "./task-logs.enum"

import { ApiService } from "../shared/ApiService";



@Injectable()
export class LoggerService {

    constructor(
        private logRepository: LogsRepository,
        private apiService: ApiService
    ) { }

    async writeLog(actionType: TaskLogActionTypes,
        affectedUserId: number,
        taskId: number,
        ip: string,
        options?: ActionMessageOptions,

    ) {

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

    buildActionMessage(actionType: TaskLogActionTypes, option?: ActionMessageOptions): string {
        switch (actionType) {
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