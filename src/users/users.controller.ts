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
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags, 
  ApiBody, 
  ApiConflictResponse, 
  ApiBadRequestResponse, 
  ApiInternalServerErrorResponse 
} from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Cria um novo usuário', 
  })
  @ApiBody({ 
    type: CreateUserDto,
    description: 'Dados necessários para criação do usuário',
    examples: {
      exemplo_valido: {
        value: {
          name: "Polina Lisboa",
          email: "Lisbobo@gmail.com",
          password: "Senha@187"
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuário criado com sucesso',
    schema: {
      example: { 
        message: 'Criado com sucesso!' 
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos na requisição',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'Erro na validação do conteúdo do body'
        ],
        error: 'Requisição Inválida'
      }
    }
  })
  @ApiConflictResponse({
    description: 'E-mail já cadastrado',
    schema: {
      example: {
        statusCode: 409,
        message: 'O e-mail informado já está em uso',
        error: 'Conflito'
      }
    }
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno no servidor',
    schema: {
      example: {
        statusCode: 500,
        message: 'Algum erro desconhecido do servidor',
        error: 'Erro Interno do Servidor'
      }
    }
  })
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