import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TasksController } from './tasks.controller'

import { TasksService } from './tasks.service'
import { LoggerService } from '../logger/logger.service'
import { ApiService } from 'src/shared/ApiService'

import { TaskRepository } from './task.repository'
import { UserRepository } from '../auth/user.repository'
import { ProjectRepository } from '../projects/project.repository'
import { LogsRepository } from 'src/logger/logger.repository'

import { AuthModule } from '../auth/auth.module'
import { TrackerRepository } from 'src/tracker/tracker.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskRepository,
      UserRepository,
      ProjectRepository,
      LogsRepository,
      TrackerRepository]),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [TasksService, LoggerService, ApiService]
})
export class TasksModule { }
