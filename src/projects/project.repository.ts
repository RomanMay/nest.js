import { EntityRepository, Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async createProject(createProjectDto: CreateProjectDto, user: User){
      const {name} = createProjectDto

      const project = this.create(createProjectDto)
      project.users = [user]

      return this.save(project)   
  }


  
}
