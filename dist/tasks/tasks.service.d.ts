import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.rapositiry';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: TaskRepository);
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    deleteTask(id: number): Promise<void>;
    updateTaskStatus(id: number, status: TaskStatus): Promise<Task>;
}
