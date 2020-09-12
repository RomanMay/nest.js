import { Module } from '@nestjs/common'
import { TasksModule } from './tasks/tasks.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from '../typeorm.config'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { ProjectModule } from './projects/project.module'


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
