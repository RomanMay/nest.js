import { TaskStatus } from '../task-status.enum'

import { IsOptional, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetTasksFilterDto {

    @IsOptional()
    @IsEnum(TaskStatus)
    @ApiProperty()
    status: TaskStatus
    
    @IsOptional()
    @ApiProperty()
    authorId: number

    @IsOptional()
    @ApiProperty()
    assignedUserId: number
}