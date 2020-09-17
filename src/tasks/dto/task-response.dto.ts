import { UserResponseDto } from "src/auth/dto/user-response.dto";
import { LogResponseDto } from "src/logger/dto/log-response.dto";
import { TaskStatus } from "../task-status.enum";
import { TaskEntity } from "../task.entity";

export class TaskResponseDto {

    id: number

    title: string

    description: string

    status: TaskStatus

    author: UserResponseDto

    logs: LogResponseDto[]


    constructor(task: TaskEntity){
        this.id = task.id
        this.title = task.title
        this.description = task.description
        this.status = task.status
        this.author = new UserResponseDto(task.author)
        this.logs = task.logs.map(log => new LogResponseDto(log))
    }
}