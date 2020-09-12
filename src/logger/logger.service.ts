import { Injectable } from "@nestjs/common";
import { TasksModule } from "src/tasks/tasks.module";

import { UserRepository } from "../auth/user.repository";
import { TaskRepository } from "../tasks/task.repository";

import {TaskActionsLogsEnum} from "./task-logs.enum"

@Injectable()
export class LoggerService{
    constructor(
        private userRepository: UserRepository,
        private taskRepository: TaskRepository
    ){}

    async writeLog(logMessage: TaskActionsLogsEnum) {
        
    }


}