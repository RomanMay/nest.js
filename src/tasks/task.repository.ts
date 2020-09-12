import {Task} from './task.entity'
import{ EntityRepository, Repository} from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { TaskStatus } from './task-status.enum'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { User } from 'src/auth/user.entity'
import { Logger, InternalServerErrorException } from '@nestjs/common'
import { Project } from 'src/projects/project.entity'
import { ProjectModule } from 'src/projects/project.module'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
       
        const query = this.createQueryBuilder('task')

        try{
            const task = query.getMany()
            return task
        }catch(error) {
            throw new InternalServerErrorException()
        }
    }

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {

        const {status, search} = filterDto

        const query = this.createQueryBuilder('task')
        query.where('task.userId = :userId OR task.assignedUser = :userId', {userId: user.id})       

        if(status) {
            query.andWhere('task.status = :status', {status})
        }

        if(search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search: `%${search}%`})
        }

        try{
            const task = query.getMany()
            return task
        }catch(error) {
            throw new InternalServerErrorException()
        }
        
    }

    async createTask(createTaskDto: CreateTaskDto, user: User, project: Project) {

        const {title, description} = createTaskDto

        
                    
        const task = new Task()
        task.title = title
        task.description = description
        task.status = TaskStatus.OPEN
        task.user = user
        task.project = project

        await task.save()
        delete task.user

        return task
    }
}