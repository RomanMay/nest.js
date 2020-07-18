import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
export declare class TaskRepository extends Repository<Task> {
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
    createTast(createTaskDto: CreateTaskDto): Promise<Task>;
}
