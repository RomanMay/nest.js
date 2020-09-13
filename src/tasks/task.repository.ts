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

        const {status, search} = filterDto

        const query = this.createQueryBuilder('task')
        query.where('task.userId = :userId OR task.assignedUser = :userId', {userId: user.id})

        if(status) {
            query.andWhere('task.status = :status', {status})
        }

        if(search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search: `%${search}%`})
        }

        return query.getMany()

    }

    createTask(createTaskDto: CreateTaskDto, user: UserEntity, project: ProjectEntity) {

        const {title, description} = createTaskDto

        return this.create({
            title,
            description,
            user,
            project,
        })
    }

    async getFullInformationById(taskId, userId): Promise<TaskEntity>{
        return this.createQueryBuilder("task")
            .leftJoin('task.logs', 'logs')
            .where('task.id = :taskId' , {taskId})
            .andWhere('(task.assignedUser = :userId OR task.userId = :userId)', {userId})
            .getOne()
    }

    async getByIdOrFail(taskId, userId): Promise<TaskEntity>{
        const task = this.createQueryBuilder("task")
            .where('task.id = :taskId' , {taskId})
            .andWhere('(task.assignedUser = :userId OR task.userId = :userId)', {userId})
            .getOne()

        if(!task) {
            throw new NotFoundException(`Task with id ${taskId} is not found`)
        }
        return task
    }
}