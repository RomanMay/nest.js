import { Controller, Post, Body, ValidationPipe, UseGuards, Req, ParseIntPipe, Get, Param } from '@nestjs/common'
import { AuthCredentialDto } from './dto/auth-credentials.dto'
import { AuthService } from './auth.service'
import { GetUser } from './get-user.decorator'
import { User } from './user.entity'
import { AuthGuard } from '@nestjs/passport'

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
    getUserById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<User>{
    return this.authService.getUserById(id, user)
    }

}
