import { LogEntity } from "../logs.entity"

export class LogResponseDto {

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