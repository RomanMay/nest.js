import { Injectable, NotFoundException } from '@nestjs/common'
import * as moment from 'moment'

import { TaskRepository } from './task.repository'
import { UserRepository } from 'src/auth/user.repository'
import { ProjectRepository } from 'src/projects/project.repository'
import { TrackerRepository } from 'src/tracker/tracker.repository'

import { TaskEntity } from './task.entity'
import { UserEntity } from 'src/auth/user.entity'
import { TrackerEntity } from 'src/tracker/tracker.entity'

import { LoggerService } from '../logger/logger.service'

import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'

import { TaskStatus } from './task-status.enum'
import { TaskLogActionTypes } from 'src/logger/task-logs.enum'


@Injectable()
export class TasksService {

    constructor(
        private loggerService: LoggerService,
        private taskRepository: TaskRepository,
        private userRepository: UserRepository,
        private projectRepository: ProjectRepository,
        private trackerRepository: TrackerRepository,
    ) { }

    async getAllTasks(filterDto: GetTasksFilterDto) {
        return this.taskRepository.find()
    }

    async getFilteredByUser(filterDto: GetTasksFilterDto, user: UserEntity): Promise<TaskEntity[]> {
        return this.taskRepository.getFilteredByUser(filterDto, user)
    }

    async getTaskById(id: number, user: UserEntity): Promise<TaskEntity> {

        const task = await this.taskRepository.getFullInformationById(id, user.id)

        if (!task) {
            throw new NotFoundException(`Task with id ${id} is not found`)
        }

        return task
    }



    async createTask(
        createTaskDto: CreateTaskDto,
        user: UserEntity,
        projectId: number,
        ip: string,
    ): Promise<TaskEntity> {

        const project = await this.projectRepository.getById(projectId, user.id)

        if (!project) {
            throw new NotFoundException(`Project with id ${projectId} is not found`)
        }


        const newTask = this.taskRepository.createTask(createTaskDto, user, project)
        const savedTask = await this.taskRepository.save(newTask)

        const newTracker = this.trackerRepository.create({ task: newTask })
        await this.trackerRepository.save(newTracker)

        this.loggerService.writeLog(TaskLogActionTypes.create, user.id, savedTask.id, ip)

        return savedTask
    }

    async startTracker(taskId: number, userId: number, ip: string): Promise<TrackerEntity> {

        const tracker = await this.trackerRepository.getTrackerByTaskId(taskId, userId)

        if (tracker.isActive) {
            throw new Error('task is active')
        }

        tracker.startDate = moment().toDate()
        tracker.isActive = true

        this.loggerService.writeLog(
            TaskLogActionTypes.startTracked,
            userId,
            taskId,
            ip,
            { startTrackingDate: tracker.startDate })

        return this.trackerRepository.save(tracker)
    }

    async stopTracker(taskId: number, userId: number, ip: string): Promise<TrackerEntity> {

        const tracker = await this.trackerRepository.getTrackerByTaskId(taskId, userId)

        if (!tracker.isActive) {
            throw new Error('task is no active')
        }

        const currentTimeMoment = moment()
        const startTimeMoment = moment(tracker.startDate)
        const difference = currentTimeMoment.diff(startTimeMoment)
        const tracked = tracker.tracked + difference

        tracker.tracked = tracked
        tracker.isActive = false

        console.log('tracked out', tracker.tracked)
        this.loggerService.writeLog(
            TaskLogActionTypes.stopTracked,
            userId,
            taskId,
            ip,
            { trackedTime: tracker.tracked })

        return this.trackerRepository.save(tracker)
    }


    async deleteTask(
        id: number,
        userId: number,
        ip: string
    ): Promise<void> {

        const task = await this.taskRepository.getByIdOrFail(id, userId)
        const result = await this.taskRepository.softDelete({ id, authorId: userId })

        if (result.affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }

        this.loggerService.writeLog(TaskLogActionTypes.delete, userId, task.id, ip)
    }


    async updateTaskStatus(
        id: number,
        status: TaskStatus,
        userId: number,
        ip: string
    ): Promise<TaskEntity> {

        const task = await this.taskRepository.getByIdOrFail(id, userId)
        const taskStatuses = {
            old: task.status,
            new: status
        }

        task.status = status
        await task.save()

        this.loggerService.writeLog(
            TaskLogActionTypes.changeStatus,
            userId,
            task.id,
            ip,
            { taskStatuses })

        return task
    }

    async assignUser(
        taskId: number,
        ownerUserId: number,
        assignedUserId: number,
        ip: string,
    ): Promise<TaskEntity> {

        const task = await this.taskRepository.getByIdOrFail(taskId, ownerUserId)
        task.assignedUser = await this.userRepository.findOne(assignedUserId)

        await this.loggerService.writeLog(
            TaskLogActionTypes.assignUser,
            ownerUserId,
            task.id,
            ip,
            { assignedUserId }
        )

        return await task.save()
    }
}
