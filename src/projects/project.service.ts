import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../auth/user.repository";
import { TaskRepository } from "../tasks/task.repository";
import { ProjectRepository } from "./project.repository";
import { CreateProjectDto } from "./dto/create-project.dto";
import { User } from "../auth/user.entity";
import { Project } from "./project.entity";
import { getRepository } from "typeorm";

@Injectable()
export class ProjectService {
    constructor(
        private userRepository: UserRepository,
        private taskRepository: TaskRepository,
        private projectRepository: ProjectRepository
    ){}

    async createProject(createProjectDto: CreateProjectDto, user: User): Promise<Project> {
        const project = await this.projectRepository.createProject(createProjectDto, user) 
        return project
    }

    async getProjectById(id: number, user: User): Promise<Project>{
        const proj = await getRepository(Project).createQueryBuilder("project")
                .leftJoinAndSelect( "project.users" ,"user")
                .where("user.id = :userId", {userId: user.id} )
                .andWhere("project.id = :id", {id})
                .getOne()

        if(!proj){
            throw new NotFoundException(`Project with id ${id} is not found`)
        }

        return proj
    }

    async addUserToProject(projectId: number, user: User, assignedUserId: number): Promise<Project> {
 
        const project = await this.getProjectById(projectId,user)
        const targetUser = await this.userRepository.findOne({where: {id: assignedUserId}})

        project.users.push(targetUser) 

        return this.projectRepository.save(project)

        
    }

}