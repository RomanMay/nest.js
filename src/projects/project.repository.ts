import { EntityRepository, Repository } from 'typeorm';

import { ProjectEntity } from './project.entity';
import { UserEntity } from '../auth/user.entity';

import { CreateProjectDto } from './dto/create-project.dto';

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

}
