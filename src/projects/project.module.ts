import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectController } from './project.controller';

import { ProjectService } from './project.service';

import { TaskRepository } from '../tasks/task.repository';
import { UserRepository } from '../auth/user.repository';
import { ProjectRepository } from './project.repository';

import { AuthModule } from '../auth/auth.module';
import { TasksModule } from '../tasks/tasks.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([TaskRepository, UserRepository, ProjectRepository]),
        AuthModule,
        TasksModule
      ],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {};