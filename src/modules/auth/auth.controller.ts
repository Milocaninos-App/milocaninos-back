import { Body, Controller, Request, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoginResponse } from 'src/interfaces/login-response';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @Post('/register')
  @UsePipes(new ValidationPipe())
  register(@Body() registerDto: RegisterUserDto) {
    return this.authService.register(registerDto)
  }

  @UseGuards(AuthGuard)
  @Get('check-token')
  checkToken(@Request() req: Request): LoginResponse {
    const user = req['user'] as User;

    return {
      user,
      token: this.authService.getJwtToken({ id: user._id })
    };
  }
}
