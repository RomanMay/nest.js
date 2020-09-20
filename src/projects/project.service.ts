import { Injectable, NotFoundException } from "@nestjs/common";

import { UserRepository } from "../auth/user.repository";
import { ProjectRepository } from "./project.repository";
import { LogsRepository } from "src/logger/logger.repository";

import { CreateProjectDto } from "./dto/create-project.dto";

import { UserEntity } from "../auth/user.entity";
import { ProjectEntity } from "./project.entity";
import { LogEntity } from "src/logger/logs.entity";


@Injectable()
export class ProjectService {
    
    constructor(
        private userRepository: UserRepository,
        private projectRepository: ProjectRepository,
        private loggerRepository: LogsRepository,
    ){}

    async createProject(createProjectDto: CreateProjectDto, user: UserEntity): Promise<ProjectEntity> {
        const project = await this.projectRepository.createProject(createProjectDto, user) 
        return project
    }

    async getProjectById(id: number, user: UserEntity): Promise<ProjectEntity>{
        const proj = await this.projectRepository.getById(id, user.id)

        if(!proj){
            throw new NotFoundException(`Project with id ${id} is not found`)
        }

        return proj 
    }

    async getLogsOld(projectId: number, user: UserEntity): Promise<LogEntity[]> {
        const proj = await this.projectRepository.getLogs(projectId, user.id)
        return proj
    }

    async getLogs(projectId: number, user: UserEntity): Promise<LogEntity[]> {
        const project = await this.projectRepository.getById(projectId, user.id)
        if(!project) { 
            throw new Error('kek')
        }        

        return this.loggerRepository.getLogs(projectId)
    }


    async addUserToProject(projectId: number, user: UserEntity, assignedUserId: number): Promise<ProjectEntity> {
 
        const project = await this.getProjectById(projectId,user)
        const targetUser = await this.userRepository.findOne({where: {id: assignedUserId}})

        project.users.push(targetUser) 

        return this.projectRepository.save(project)

        
    }

}