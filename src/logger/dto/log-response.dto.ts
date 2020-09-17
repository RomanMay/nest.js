import { LogEntity } from "../logs.entity"

export class LogResponseDto {

    // User(id) | created a task                                 | by user :userId | :date
    // User(id) | changed task status (old status -> new status) | by user :userId | :date
    // User(id) | new user assigned to task: id                  | by user :userId | :date
    // User(id) | deleted the task                               | by user :userId | :date
    message: string

    date: Date

    city: string

    ip: string

    constructor(log: LogEntity) {
        this.message = `User (${log.affectedUserId}) ${log.actionMessage}`
        this.date = log.createdAt
        this.city = log.city
        this.ip = log.ip
    }
}