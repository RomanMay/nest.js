import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProjectRepository } from "../projects/project.repository";
import { LogsRepository } from "./logger.repository";

import { TasksModule } from "../tasks/tasks.module";

import { LoggerService } from "./logger.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([LogsRepository, ProjectRepository]),
        TasksModule
    ],
    providers:[LoggerService]
})

export class LoggerModule {}
    