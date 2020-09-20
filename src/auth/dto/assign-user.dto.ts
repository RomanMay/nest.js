import { IsNotEmpty } from 'class-validator'

export class AssignUserDto {

    @IsNotEmpty()
    id: number
}