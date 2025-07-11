import { 
  Body, 
  Controller, 
  Post, 
  HttpCode, 
  HttpStatus, 
  ConflictException, 
  InternalServerErrorException, 
  BadRequestException 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

@Post()
@HttpCode(HttpStatus.CREATED)
async create(@Body() createUserDto: CreateUserDto) {
  try {
    await this.usersService.create(createUserDto);
    return { message: 'Usuário criado com sucesso!' };
  } catch (error) {
    if (error.code === 'P2002') { 
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        message: 'O e-mail informado já está em uso',
        error: 'Conflict'
      });
    }
    if (error instanceof BadRequestException) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro na validação do conteúdo do body',
        error: 'Bad Request'
      });
    }
    throw new InternalServerErrorException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Algum erro desconhecido do servidor',
      error: 'Internal Server Error'
    });
  }
}
}