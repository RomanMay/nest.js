import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { TaskRepository } from './task.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './task.entity'
import { TaskStatus } from './task-status.enum'
import { User } from 'src/auth/user.entity'
import { UserRepository } from 'src/auth/user.repository'
import { getRepository } from 'typeorm'

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
        private userRepository: UserRepository
    ) {
        
    }

    async getTasks(filterDto: GetTasksFilterDto, user: User){
        return this.taskRepository.getTasks(filterDto, user)

    }
    
    async getAllTasks(filterDto: GetTasksFilterDto) {
        return this.taskRepository.getAllTasks(filterDto)
    }
    
    async getTaskById(id:number, user: User): Promise<Task> {
        const task = await getRepository(Task).createQueryBuilder("task")
            .where('task.id = :id' , {id})
            .andWhere('(task.assignedUser = :userId OR task.userId = :userId)', {userId: user.id})
            .getOne()

        if(!task) {
            throw new NotFoundException(`Task with id ${id} is not found`)
        }

        return task

    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user)
    }

    async deleteTask(id: number, user: User): Promise<void> {
        const result = await this.taskRepository.delete({id, userId: user.id})

        if(result.affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }
        
    }
    
    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id,user)
        task.status = status
        await task.save()
        return task
    }

    async assignUser(taskId: number, ownerUser: User, assignedUserId: number): Promise<Task> {
        const task = await this.getTaskById(taskId, ownerUser)
        task.assignedUser = await this.userRepository.findOne(assignedUserId)
        const savedTask =  await task.save()
        return savedTask
    }

}
