import { EntityRepository, Repository } from 'typeorm'
import { NotFoundException } from '@nestjs/common'

import { TaskEntity } from './task.entity'
import { UserEntity } from 'src/auth/user.entity'
import { ProjectEntity } from 'src/projects/project.entity'

import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {

    async getFilteredByUser(filterDto: GetTasksFilterDto, user: UserEntity): Promise<TaskEntity[]> {

        const {status} = filterDto

        const query = this.createQueryBuilder("task")
        query
            .leftJoinAndSelect('task.project', 'project')
            .leftJoinAndSelect('task.author',  'author')
            .leftJoinAndSelect('task.assignedUser', 'assignedUser')
            .where('task.authorId = :userId OR task."assignedUserId" = :userId', {userId: user.id})

        if(status) {
            query.andWhere('task.status = :status', {status})
        }

        return query.getMany()

    }

    createTask(createTaskDto: CreateTaskDto, author: UserEntity, project: ProjectEntity) {

        const {title, description} = createTaskDto

        return this.create({
            title,
            description,
            author,
            project,
            
        })
    }

    async getFullInformationById(taskId: number, userId: number): Promise<TaskEntity>{
        return this.createQueryBuilder("task")
            .leftJoinAndSelect('task.logs', 'logs')
            .leftJoinAndSelect('task.author', 'user')
            .where('task.id = :taskId' , {taskId})
            .andWhere('(task.assignedUser = :userId OR task.authorId = :userId)', {userId})
            .getOne()
    }

    async getByIdOrFail(taskId: number, userId: number): Promise<TaskEntity>{
        const task = this.createQueryBuilder("task")
            .where('task.id = :taskId' , {taskId})
            .andWhere('(task.assignedUser = :userId OR task.authorId = :userId)', {userId})
            .getOne()

        if(!task) {
            throw new NotFoundException(`Task with id ${taskId} is not found`)
        }
        return task
    }
}