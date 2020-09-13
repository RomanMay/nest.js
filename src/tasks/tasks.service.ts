import { Injectable, NotFoundException } from '@nestjs/common'

import { TaskRepository } from './task.repository'
import { UserRepository } from 'src/auth/user.repository'
import { ProjectRepository } from 'src/projects/project.repository'

import { TaskEntity } from './task.entity'
import { UserEntity } from 'src/auth/user.entity'

import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { TaskStatus } from './task-status.enum'
import { LoggerService } from '../logger/logger.service'
import { TaskLogActionTypes } from 'src/logger/task-logs.enum'

@Injectable()
export class TasksService {
    constructor(
        private loggerService: LoggerService,
        private taskRepository: TaskRepository,
        private userRepository: UserRepository,
        private projectRepository: ProjectRepository
    ) {}

    async getAllTasks(filterDto: GetTasksFilterDto) {
        return this.taskRepository.find()
    }

    async getFilteredByUser(filterDto: GetTasksFilterDto, user: UserEntity){
        return this.taskRepository.getFilteredByUser(filterDto, user)
    }

    async getTaskById(id: number, user: UserEntity): Promise<TaskEntity> {

        const task = await this.taskRepository.getFullInformationById(id, user.id)

        if(!task) {
            throw new NotFoundException(`Task with id ${id} is not found`)
        }

        return task
    }

    async createTask(createTaskDto: CreateTaskDto, user: UserEntity, projectId: number):Promise<TaskEntity> {

        const project = await this.projectRepository.getById(projectId, user.id)

        if(!project){
            throw new NotFoundException(`Project with id ${projectId} is not found`)
        }

        const newTask = this.taskRepository.createTask(createTaskDto, user, project)
        const savedTask = await this.taskRepository.save(newTask)

        await this.loggerService.writeLog(TaskLogActionTypes.create, user, savedTask)

        return savedTask
    }


    async deleteTask(id: number, user: UserEntity): Promise<void> {
        const task = await this.taskRepository.getByIdOrFail(id, user)
        const result = await this.taskRepository.softDelete({id, userId: user.id})

        if(result.affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }

        await this.loggerService.writeLog(TaskLogActionTypes.delete, user, task)
    }


    async updateTaskStatus(id: number, status: TaskStatus, user: UserEntity): Promise<TaskEntity> {

        const task = await this.taskRepository.getByIdOrFail(id, user)
        const taskStatuses = {
            old: task.status,
            new: status
        }
        task.status = status
        await task.save()

        await this.loggerService.writeLog(TaskLogActionTypes.changeStatus, user, task, {taskStatuses})
        return task
    }

    async assignUser(taskId: number, ownerUser: UserEntity, assignedUserId: number): Promise<TaskEntity> {

        const task = await this.taskRepository.getByIdOrFail(taskId, ownerUser)
        task.assignedUser = await this.userRepository.findOne(assignedUserId)
    
        await this.loggerService.writeLog(TaskLogActionTypes.assignUser, ownerUser, task, {assignedUserId})

        return await task.save()
    }
}
