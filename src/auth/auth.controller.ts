import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('v1/users/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@Post()
@HttpCode(HttpStatus.OK)
async login(@Body() authUserDto: AuthUserDto) {
  const user = await this.authService.validateUser(
    authUserDto.email,
    authUserDto.password,
  );
  
  if (!user) {
    throw new UnauthorizedException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Usuário/Senha incorretos',
      error: 'Unauthorized'
    });
  }

  return this.authService.login(user);
}

}


