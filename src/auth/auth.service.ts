import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'

import { JwtPayload } from './jwt-payload.interface'

import { UserRepository } from './user.repository'

import { AuthCredentialDto } from './dto/auth-credentials.dto'

import { UserEntity } from './user.entity'

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.signUp(authCredentialDto)
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(authCredentialDto)
        if (!username) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload: JwtPayload = { username }
        const accessToken = await this.jwtService.sign(payload)

        return { accessToken }
    }

    async getUserById(id: number, user: UserEntity): Promise<UserEntity> {
        const foundUser = await this.userRepository.findOne({ where: { id: user.id } })
        return foundUser
    }

}
