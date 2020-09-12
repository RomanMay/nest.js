import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskRepository } from './task.repository'
import { AuthModule } from 'src/auth/auth.module'
import { UserRepository } from 'src/auth/user.repository'
import { ProjectRepository } from 'src/projects/project.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository, UserRepository, ProjectRepository]),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
