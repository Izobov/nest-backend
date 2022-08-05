import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}


    @Post("/login")
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto)
    }
    
    @Post("/registration")
    registration(@Body() dto: CreateUserDto) {
       return this.authService.registarte(dto)
    }
}
