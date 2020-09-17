import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TasksController } from './tasks.controller'

import { TasksService } from './tasks.service'
import { LoggerService } from '../logger/logger.service'

import { TaskRepository } from './task.repository'
import { UserRepository } from '../auth/user.repository'
import { ProjectRepository } from '../projects/project.repository'
import { LogsRepository } from 'src/logger/logger.repository'

import { AuthModule } from '../auth/auth.module'
import { ApiService } from 'src/shared/ApiService'

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository, UserRepository, ProjectRepository, LogsRepository]),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [TasksService, LoggerService, ApiService]
})
export class TasksModule {}
