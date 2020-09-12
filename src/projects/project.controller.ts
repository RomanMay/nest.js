import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Project } from './project.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
@UseGuards(AuthGuard())
export class ProjectController {
    constructor(private projectService: ProjectService){}

    @Post()
    @UsePipes(ValidationPipe)
    creteProject(
        @Body() CreateProjectDto: CreateProjectDto, 
        @GetUser() user: User
    ): Promise<Project>{
        return this.projectService.createProject(CreateProjectDto, user)
    }

    @Get('/:id')
    getProjectByid(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Project> {
        return this.projectService.getProjectById(id,user)
    }

    @Patch('/:id/assign')
    assignUser(
        @Param('id', ParseIntPipe) id: number, 
        @Body('assignedUser') userId: number, 
        @GetUser() user: User): Promise<Project>{
        return this.projectService.addUserToProject(id, user, userId)
    }
}