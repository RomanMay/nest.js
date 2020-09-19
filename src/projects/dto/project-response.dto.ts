import { UserResponseDto } from "../../auth/dto/user-response.dto"

import { ProjectEntity } from "../project.entity"

export class ProjectResponseDto {
    id: number

    name: string

    users: UserResponseDto[]

    constructor(project: ProjectEntity) {
        this.id = project.id
        this.name = project.name
        this.users = project.users.map(user => new UserResponseDto(user))
    }
}