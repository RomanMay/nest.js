import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TasksModule } from './tasks/tasks.module'
import { AuthModule } from './auth/auth.module'
import { ProjectModule } from './projects/project.module'

import { typeOrmConfig } from '../typeorm.config'
import { ConfigModule } from '@nestjs/config'


@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot(),
    AuthModule,
    ProjectModule
  ],

})
export class AppModule {}
