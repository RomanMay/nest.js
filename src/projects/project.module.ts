import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from '../tasks/task.repository';
import { UserRepository } from '../auth/user.repository';
import { AuthModule } from '../auth/auth.module';
import { TasksModule } from '../tasks/tasks.module';
import { ProjectRepository } from './project.repository';


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