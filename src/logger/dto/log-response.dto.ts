import { LogEntity } from "../logs.entity"

class LogResponseDto {

    // User(id) | created a task                                 | by user :userId | :date
    // User(id) | changed task status (old status -> new status) | by user :userId | :date
    // User(id) | new user assigned to task: id                  | by user :userId | :date
    // User(id) | deleted the task                               | by user :userId | :date
    message: string

    date: Date

    constructor(log: LogEntity){
        this.message = `User (${log.affectedUserId}) ${log.actionMessage}`
        this.date = log.createdAt
    }
}