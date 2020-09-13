import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TasksModule } from "../tasks/tasks.module";

import { LogsRepository } from "./logger.repository";

import { LoggerService } from "./logger.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([LogsRepository]),
        TasksModule
    ],
    providers:[LoggerService]
})

export class LoggerModule {}
    