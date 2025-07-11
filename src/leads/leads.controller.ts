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
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Leads')
@ApiBearerAuth()
@Controller('v1/leads')
@UseGuards(AuthGuard('jwt'))
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo lead' })
  @ApiResponse({
    status: 201,
    description: 'Lead criado com Sucesso',
    type: CreateLeadDto,
  })
  @ApiResponse({ status: 401, description: 'Não Autorizado' })
  @ApiResponse({ status: 422, description: 'Dados Inválidos'})
  @ApiBody({ type: CreateLeadDto })
  @HttpCode(HttpStatus.CREATED)
  create(@Req() req: Request, @Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(req.user.userId, createLeadDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req: Request) {
    return this.leadsService.findAll(req.user.userId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateLeadDto: UpdateLeadDto,
  ) {
    await this.leadsService.update(req.user.userId, id, updateLeadDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Req() req: Request, @Param('id') id: string) {
    await this.leadsService.remove(req.user.userId, id);
  }
}