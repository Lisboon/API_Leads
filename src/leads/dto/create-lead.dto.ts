import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLeadDto {
  @ApiProperty({ 
    example: 'Wendel Lisboa', 
    description: 'Nome Completo do Lead',
    required: true
   })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    example: 'emailteste@hotmail.com.br',
    description: 'Email do Lead',
    required: true 
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ 
    example: '11999999999',
    description: 'Telefone com DDD',
    required: true
   })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ 
    example: 'Anotação',
    description: 'Descrição da Mensagem',
    required: false
  })
  @IsString()
  @IsOptional()
  message?: string;
}

