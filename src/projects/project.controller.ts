import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProjectService } from './project.service';

import { CreateProjectDto } from './dto/create-project.dto';

import { GetUser } from 'src/auth/get-user.decorator';

import { UserEntity } from 'src/auth/user.entity';
import { ProjectEntity } from './project.entity';

@Controller('projects')
@UseGuards(AuthGuard())
export class ProjectController {
    constructor(private projectService: ProjectService){}

    @Post()
    @UsePipes(ValidationPipe)
    creteProject(
        @Body() CreateProjectDto: CreateProjectDto, 
        @GetUser() user: UserEntity
    ): Promise<ProjectEntity>{
        return this.projectService.createProject(CreateProjectDto, user)
    }

    @Get('/:id')
    getProjectByid(@Param('id', ParseIntPipe) id: number, @GetUser() user: UserEntity): Promise<ProjectEntity> {
        return this.projectService.getProjectById(id,user)
    }

    @Patch('/:id/assign')
    assignUser(
        @Param('id', ParseIntPipe) id: number, 
        @Body('assignedUser') userId: number, 
        @GetUser() user: UserEntity): Promise<ProjectEntity>{
        return this.projectService.addUserToProject(id, user, userId)
    }
}