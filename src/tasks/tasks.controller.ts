import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger, All, Ip } from '@nestjs/common'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { AuthGuard } from '@nestjs/passport'

import { TasksService } from './tasks.service'
import {ApiService} from '../shared/ApiService'

import { TaskEntity } from './task.entity'
import { UserEntity } from '../auth/user.entity'

import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { TaskResponseDto } from './dto/task-response.dto'
import { AllTasksResponseDto } from './dto/all-tasks-response.dto'

import { TaskStatus } from './task-status.enum'

import { GetUser } from '../auth/get-user.decorator'
import { TrackerEntity } from 'src/tracker/tracker.entity'
import { TrackerResponseDto } from 'src/tracker/dto/tracker-response.dto'
import { TrackerRepository } from 'src/tracker/tracker.repository'


@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    constructor(private tasksService: TasksService, private apiService: ApiService) {}    
    
    @Get('/all')
    getAllTasks(filterDto: GetTasksFilterDto){

        return this.tasksService.getAllTasks(filterDto)
    }

    @Get('/usertasks')
    async getTasks( 
        @Query(ValidationPipe) filterDto: GetTasksFilterDto,
        @GetUser() user: UserEntity,
        @Ip() ipAddress: string
    ):Promise<AllTasksResponseDto[]> {
        
        const allTasks = await this.tasksService.getFilteredByUser(filterDto, user)

        return allTasks.map(task => {return new AllTasksResponseDto(task)})
    }

    @Get('/:id')
    async getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: UserEntity
    ):Promise<TaskResponseDto>{
            
            const task = await this.tasksService.getTaskById(id,user)
        
            return new TaskResponseDto(task)
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask( 
        @Body() createTaskDto: CreateTaskDto,
        @Body('projectId') project: number,
        @Ip() ipAddress: string,
        @GetUser() user: UserEntity,
    ):Promise<TaskEntity> {
        console.time('task')

        const task =  await this.tasksService.createTask(createTaskDto, user, project, ipAddress)

        console.timeEnd('task')
        return task
    }

    @Post('/start-tracker/:id')
    @UsePipes(ValidationPipe)
    async startTracker(
        @GetUser() user: UserEntity, 
        @Param('id', ParseIntPipe) taskId: number,
        @Ip() ipAddress: string
    ): Promise<TrackerResponseDto> {

        const start = await this.tasksService.startTracker(taskId, user.id, ipAddress)

        return new TrackerResponseDto(start)
    }

    @Post('/stop-tracker/:id')
    @UsePipes(ValidationPipe)
    async stopTracker(
        @GetUser() user: UserEntity, 
        @Param('id', ParseIntPipe) taskId: number,
        @Ip() ipAddress: string
    ): Promise<TrackerResponseDto> {

        const start = await this.tasksService.stopTracker(taskId, user.id, ipAddress)

        return new TrackerResponseDto(start)
    }

    @Delete('/:id')
    async deleteTask(
        @Param('id', ParseIntPipe) id: number, 
        @GetUser() user: UserEntity,
        @Ip() ipAddress: string
    ): Promise<void>{
       
        return await this.tasksService.deleteTask(id, user.id, ipAddress)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @Ip() ipAddress: string,
        @GetUser() user: UserEntity
    ):
        Promise<TaskEntity> {
        return this.tasksService.updateTaskStatus(id, status, user.id, ipAddress)
    }

    @Patch('/:id/assign')
    async assignUser(
        @Param('id', ParseIntPipe) id: number, 
        @Body('assignedUser') userId: number,
        @Ip() ipAddress: string,
        @GetUser() user: UserEntity, 
    ): Promise<TaskEntity>{

        return this.tasksService.assignUser(id, user.id, userId, ipAddress)
    }
       
}
