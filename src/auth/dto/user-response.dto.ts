import { UserEntity } from "../user.entity"

export class UserResponseDto {
    
    id: number

    username: string

    avatar: string

    constructor(user: UserEntity){
        this.id = user.id
        this.username = user.username
        this.avatar = user.avatar
    }
}