import { UserResponseDto } from "../../auth/dto/user-response.dto"

import { ProjectEntity } from "../../projects/project.entity"
import { TaskEntity } from "../task.entity"

import { TaskStatus } from "../task-status.enum"


export class AllTasksResponseDto {

    id: number

    title: string

    description: string

    status: TaskStatus

    author: UserResponseDto

    assignedUser: UserResponseDto

    project: ProjectEntity

    constructor(task: TaskEntity) {
        this.id = task.id
        this.title = task.title
        this.description = task.description
        this.status = task.status
        this.author = new UserResponseDto(task.author)

        if (task.assignedUser) {
            this.assignedUser = new UserResponseDto(task.assignedUser)
        }

        this.project = task.project
    }
}