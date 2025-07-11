import { IsString, IsOptional, IsNotEmpty, IsUUID} from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsUUID()
  @IsOptional() 
  id?: string;
}

