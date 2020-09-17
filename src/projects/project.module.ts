import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectController } from './project.controller';

import { ProjectService } from './project.service';
import { LoggerModule } from '../logger/logger.module';

import { TaskRepository } from '../tasks/task.repository';
import { UserRepository } from '../auth/user.repository';
import { ProjectRepository } from './project.repository';

import { AuthModule } from '../auth/auth.module';
import { TasksModule } from '../tasks/tasks.module';
import { LogsRepository } from 'src/logger/logger.repository';


@Module({
    imports: [
        TypeOrmModule.forFeature([TaskRepository, UserRepository, ProjectRepository, LogsRepository]),
        AuthModule,
        TasksModule
    ],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {};