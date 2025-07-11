import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { InternalServerErrorException } from '@nestjs/common';

@Controller('v1/leads')
@UseGuards(AuthGuard('jwt'))
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: Request, @Body() createLeadDto: CreateLeadDto) {
    try {
      const lead = await this.leadsService.create(req.user.userId, createLeadDto);
      return lead;
    } catch (error) {
      if (error.code === 'P2003') { 
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Usuário não encontrado',
          error: 'Not Found'
        });
      }
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Algum erro desconhecido do servidor',
        error: 'Internal Server Error'
      });
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: Request) {
    try {
      return await this.leadsService.findAll(req.user.userId);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Algum erro desconhecido do servidor',
        error: 'Internal Server Error'
      });
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateLeadDto: UpdateLeadDto,
  ) {
    try {
      const result = await this.leadsService.update(req.user.userId, id, updateLeadDto);
      
      if (result.count === 0) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Lead não encontrado ou não pertence ao usuário',
          error: 'Not Found'
        });
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Algum erro desconhecido do servidor',
        error: 'Internal Server Error'
      });
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Req() req: Request, @Param('id') id: string) {
    try {
      const result = await this.leadsService.remove(req.user.userId, id);
      
      if (result.count === 0) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Lead não encontrado ou não pertence ao usuário',
          error: 'Not Found'
        });
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Algum erro desconhecido do servidor',
        error: 'Internal Server Error'
      });
    }
  }
}