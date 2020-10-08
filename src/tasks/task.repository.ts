import { EntityRepository, Repository } from 'typeorm'
import { NotFoundException } from '@nestjs/common'

import { TaskEntity } from './task.entity'
import { UserEntity } from 'src/auth/user.entity'

import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {

    async getFilteredByUser(filterDto: GetTasksFilterDto, user: UserEntity): Promise<TaskEntity[]> {

        const { status, authorId, assignedUserId } = filterDto



        const query = this.createQueryBuilder("task")
        query
            .leftJoinAndSelect('task.project', 'project')
            .leftJoinAndSelect('task.author', 'author')
            .leftJoinAndSelect('task.assignedUser', 'assignedUser')
            .where('(task.authorId = :userId OR task."assignedUserId" = :userId)', { userId: user.id })

        if (status) {
            query.andWhere('task.status = :status', { status })
        }

        if(authorId) {
            query.andWhere('task.authorId = :authorId', { authorId })
        }

        if(assignedUserId) {
            query.andWhere('task.assignedUserId = :assignedUserId', { assignedUserId})
        }
        

        

        return query.getMany()

    }

    createTask(createTaskDto: CreateTaskDto, author: UserEntity) {

        const { title, description, projectId } = createTaskDto

        return this.create({
            title,
            description,
            projectId,
            author,
            
        })
    }

    async getFullInformationById(taskId: number, userId: number): Promise<TaskEntity> {
        return this.createQueryBuilder("task")
            .leftJoinAndSelect('task.logs', 'logs')
            .leftJoinAndSelect('task.author', 'user')
            .leftJoinAndSelect('task.assignedUser', 'asuser')
            .leftJoinAndSelect('task.tracker', 'tracker')
            .where('task.id = :taskId', { taskId })
            .andWhere('(task.assignedUser = :userId OR task.authorId = :userId)', { userId })
            .getOne()
    }

    async getByIdOrFail(taskId: number, userId: number): Promise<TaskEntity> {
        const task = this.createQueryBuilder("task")
            .leftJoinAndSelect('task.tracker', 'tracker')
            .leftJoinAndSelect('task.assignedUser', 'asuser')
            .leftJoinAndSelect('task.author', 'user')
            .where('task.id = :taskId', { taskId })
            .andWhere('(task.assignedUser = :userId OR task.authorId = :userId)', { userId })
            .getOne()

        if (!task) {
            throw new NotFoundException(`Task with id ${taskId} is not found`)
        }
        return task
    }
}