import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createLeadDto: CreateLeadDto) {
    return this.prisma.lead.create({
      data: {
        ...createLeadDto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.lead.findMany({ 
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async update(userId: string, id: string, updateLeadDto: UpdateLeadDto) {
    return this.prisma.lead.updateMany({
      where: { 
        id, 
        userId 
      },
      data: updateLeadDto,
    });
  }

  async remove(userId: string, id: string) {
    return this.prisma.lead.deleteMany({
      where: { 
        id, 
        userId
      },
    });
  }

  async findOne(userId: string, id: string) {
    const lead = await this.prisma.lead.findFirst({
      where: { id, userId },
    });

    if (!lead) {
      throw new NotFoundException('Lead não encontrado');
    }

    return lead;
  }
}