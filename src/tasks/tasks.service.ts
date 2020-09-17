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
import { TaskResponseDto } from './dto/task-response.dto'
import { AllTasksResponseDto } from './dto/all-tasks-response.dto'
import { ApiService } from '../shared/ApiService'

@Injectable()
export class TasksService {
    constructor(
        private loggerService: LoggerService,
        private taskRepository: TaskRepository,
        private userRepository: UserRepository,
        private projectRepository: ProjectRepository,
        private apiService: ApiService
    ) {}

    async getAllTasks(filterDto: GetTasksFilterDto) {
        return this.taskRepository.find()
    }

    async getFilteredByUser(filterDto: GetTasksFilterDto, user: UserEntity): Promise<TaskEntity[]>{
        return this.taskRepository.getFilteredByUser(filterDto, user)
    }

    async getTaskById(id: number, user: UserEntity): Promise<TaskEntity> {

        const task = await this.taskRepository.getFullInformationById(id, user.id)

        if(!task) {
            throw new NotFoundException(`Task with id ${id} is not found`)
        }

        return task
    }

    async createTask(
        createTaskDto: CreateTaskDto, 
        user: UserEntity, 
        projectId: number, 
        ip: string, 
        city: string
    ):Promise<TaskEntity> {

        const project = await this.projectRepository.getById(projectId, user.id)

        if(!project){
            throw new NotFoundException(`Project with id ${projectId} is not found`)
        }

        const newTask = this.taskRepository.createTask(createTaskDto, user, project)
        const savedTask = await this.taskRepository.save(newTask)
        const getCity = await this.apiService.getDataFromApi(ip)

        await this.loggerService.writeLog(TaskLogActionTypes.create, user, savedTask, ip, getCity)

        return savedTask
    }


    async deleteTask(
        id: number, 
        user: UserEntity, 
        ip: string, 
        city: string
    ): Promise<void> {

        const task = await this.taskRepository.getByIdOrFail(id, user.id)
        const result = await this.taskRepository.softDelete({id, authorId: user.id})

        if(result.affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }
        const getCity = await this.apiService.getDataFromApi(ip)

        await this.loggerService.writeLog(TaskLogActionTypes.delete, user, task, ip, getCity)
    }


    async updateTaskStatus(id: number, status: TaskStatus, user: UserEntity, ip: string, city: string): Promise<TaskEntity> {

        const task = await this.taskRepository.getByIdOrFail(id, user.id)
        const taskStatuses = {
            old: task.status,
            new: status
        }
        task.status = status
        await task.save()
        const getCity = await this.apiService.getDataFromApi(ip)

        await this.loggerService.writeLog(TaskLogActionTypes.changeStatus, user, task, ip, getCity, {taskStatuses})
        return task
    }

    async assignUser(
        taskId: number, 
        ownerUser: UserEntity, 
        assignedUserId: number, 
        ip: string, 
        city: string
    ): Promise<TaskEntity> {

        const task = await this.taskRepository.getByIdOrFail(taskId, ownerUser.id)
        task.assignedUser = await this.userRepository.findOne(assignedUserId)

        const getCity = await this.apiService.getDataFromApi(ip)
    
        await this.loggerService.writeLog(
            TaskLogActionTypes.assignUser, 
            ownerUser, 
            task, 
            ip, 
            getCity, 
            {assignedUserId}
        )

        return await task.save()
    }
}
