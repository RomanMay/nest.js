import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards, Param, ParseIntPipe, Patch, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProjectService } from './project.service';

import { CreateProjectDto } from './dto/create-project.dto';
import { LogResponseDto } from 'src/logger/dto/log-response.dto';

import { GetUser } from 'src/auth/get-user.decorator';

import { UserEntity } from 'src/auth/user.entity';
import { ProjectEntity } from './project.entity';

@Controller('projects')
@UseGuards(AuthGuard())
export class ProjectController {

    constructor(private projectService: ProjectService) { }

    @Post()
    @UsePipes(ValidationPipe)
    creteProject(
        @Body() CreateProjectDto: CreateProjectDto,
        @GetUser() user: UserEntity
    ): Promise<ProjectEntity> {
        return this.projectService.createProject(CreateProjectDto, user)
    }

    @Get('/:id')
    async getLogs(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: UserEntity,
        @Req() req

    ): Promise<LogResponseDto[]> {
        console.log(req.ip)
        const logs = await this.projectService.getLogs(id, user)
        return logs.map(proj => { return new LogResponseDto(proj) })
    }

    @Patch('/:id/assign')
    assignUser(
        @Param('id', ParseIntPipe) id: number,
        @Body('assignedUser') userId: number,
        @GetUser() user: UserEntity): Promise<ProjectEntity> {
        return this.projectService.addUserToProject(id, user, userId)
    }
}