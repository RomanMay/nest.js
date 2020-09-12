import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "../auth/user.repository";
import { ProjectRepository } from "../projects/project.repository";
import { TaskRepository } from "../tasks/task.repository";
import { TasksModule } from "../tasks/tasks.module";
import { LoggerService } from "./logger.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([TaskRepository, UserRepository, ProjectRepository]),
        TasksModule
    ],
    providers:[LoggerService]
})

export class LoggerModule {}
    