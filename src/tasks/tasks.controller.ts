import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { AuthGuard } from '@nestjs/passport'

import { TasksService } from './tasks.service'
import { TaskEntity } from './task.entity'
import { UserEntity } from 'src/auth/user.entity'

import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'

import { TaskStatus } from './task-status.enum'

import { GetUser } from 'src/auth/get-user.decorator'


@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    constructor(private tasksService: TasksService) {}    
    
    @Get('/all')
    getAllTasks(filterDto: GetTasksFilterDto){
        return this.tasksService.getAllTasks(filterDto)
    }

    @Get('/usertasks')
    getTasks( @Query(ValidationPipe) filterDto: GetTasksFilterDto, @GetUser() user: UserEntity) {
        return this.tasksService.getFilteredByUser(filterDto, user)
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: UserEntity):
        Promise<TaskEntity>{
        return this.tasksService.getTaskById(id, user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask( 
        @Body() createTaskDto: CreateTaskDto,
        @Body('projectId') project: number,
        @GetUser() user: UserEntity):
      Promise<TaskEntity> {
        return this.tasksService.createTask(createTaskDto, user, project)
    }
     
    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: UserEntity): Promise<void>{
        return this.tasksService.deleteTask(id, user)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: UserEntity):
        Promise<TaskEntity> {
        return this.tasksService.updateTaskStatus(id, status, user)
    }

    @Patch('/:id/assign')
    assignUser(
        @Param('id', ParseIntPipe) id: number, 
        @Body('assignedUser') userId: number,
        @GetUser() user: UserEntity): Promise<TaskEntity>{
        return this.tasksService.assignUser(id, user, userId)
    }
       
}
