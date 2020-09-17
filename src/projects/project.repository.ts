import { EntityRepository, Repository } from 'typeorm';

import { ProjectEntity } from './project.entity';
import { UserEntity } from '../auth/user.entity';

import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { LogResponseDto } from 'src/logger/dto/log-response.dto';
import { LogEntity } from 'src/logger/logs.entity';
import { TasksModule } from 'src/tasks/tasks.module';
import { TaskEntity } from 'src/tasks/task.entity';

@EntityRepository(ProjectEntity)
export class ProjectRepository extends Repository<ProjectEntity> {
  async createProject(createProjectDto: CreateProjectDto, user: UserEntity){
      const {name} = createProjectDto

      const project = this.create(createProjectDto)
      project.users = [user]

      return this.save(project)
  }

  async getById(projectId: number, userId: number): Promise<ProjectEntity>{
      return this.createQueryBuilder("project")
        .leftJoinAndSelect( "project.users" ,"user")
        .where("user.id = :userId", {userId} )
        .andWhere("project.id = :projectId", {projectId})
        .getOne()
  }

  async getLogs(projectId: number, userId: number): Promise<LogEntity[]>{
    
    const project = await this.createQueryBuilder("project")
        .leftJoinAndSelect('project.users', 'user')
        .leftJoinAndSelect('project.tasks', 'task')
        .leftJoinAndSelect('task.logs', 'log')
        .where("project.id = :projectId", {projectId})
        .andWhere("user.id = :userId", {userId} )
        .getOne()

        const logsArray = project.tasks.reduce((acum: LogEntity[] , cur: TaskEntity) => {
          return cur.logs.concat(acum)
        }, []
        )
      return logsArray
  }

}
