import { Controller, Post, Body, ValidationPipe, UseGuards, Req, ParseIntPipe, Get, Param } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { AuthCredentialDto } from './dto/auth-credentials.dto'

import { AuthService } from './auth.service'

import { GetUser } from './get-user.decorator'

import { UserEntity } from './user.entity'
import { UserResponseDto } from './dto/user-response.dto'

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}
    
    @Post('/signup')
    signUp(@Body(ValidationPipe) authcredentialDto: AuthCredentialDto ): Promise<void> {
        return this.authService.signUp(authcredentialDto)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authcredentialDto: AuthCredentialDto ): Promise<{accessToken: string}>{
        return this.authService.signIn(authcredentialDto)
    }

    @UseGuards(AuthGuard())
    @Get('/getUser/:id')
    async getUserById(
        @Param('id', ParseIntPipe) id: number, 
        @GetUser() user: UserEntity
    ): Promise<UserResponseDto>{
        const userById = await this.authService.getUserById(id, user)
    return new UserResponseDto(userById)
    }

}
