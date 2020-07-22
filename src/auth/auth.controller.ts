import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';


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

}
