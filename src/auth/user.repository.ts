import { EntityRepository, Repository } from "typeorm"
import { ConflictException, InternalServerErrorException } from "@nestjs/common"
import * as bcrypt from 'bcrypt'

import { UserEntity } from "./user.entity"

import { AuthCredentialDto } from "./dto/auth-credentials.dto"

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    async signUp(authCredentialDto: AuthCredentialDto) {
        const { username, password} = authCredentialDto

        const user = new UserEntity()
        user.username = username
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, user.salt)
    
        try {
            await user.save()
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Username already exists')
            }else {
                throw new InternalServerErrorException()
            }
        }  
    }


    async validateUserPassword(authCredentialDto: AuthCredentialDto): Promise<string> {
        const { username, password} = authCredentialDto
        const user = await this.findOne({username})

        if(user && await user.validatePassword(password)) {
            return user.username
        } else {
            return null
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }
}