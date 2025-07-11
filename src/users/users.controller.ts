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
          error: 'Conflito'
        });
      }
      if (error.response?.message) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'teste',
          error: 'Requisição Inválida'
        });
      }
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Ocorreu um erro inesperado no servidor',
        error: 'Erro Interno do Servidor'
      });
    }
  }

}