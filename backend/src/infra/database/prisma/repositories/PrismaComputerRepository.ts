import { ComputerRepository } from '../../../../modules/computer/repositories/computerRepository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Computer } from '../../../../modules/computer/entities/Computer';
import { PrismaComputerMapper } from '../mappers/PrismaComputerMapper';
import { ComputerType } from '@prisma/client';
import { Logger } from 'winston';

@Injectable()
export class PrismaComputerRepository implements ComputerRepository {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger();

  async create(computer: Computer): Promise<void> {
    const computerRaw = PrismaComputerMapper.toPrisma(computer);
    try {
      await this.prisma.computer.create({
        data: computerRaw,
      });
      // this.logger.info(`Computer created with ID: ${computerRaw.id}`);
    } catch (error) {
      // this.logger.error(`Failed to create computer: ${error.message}`);
      throw error;
    }
  }

  async findById(id: string): Promise<Computer | null> {
    try {
      const computer = await this.prisma.computer.findUnique({
        where: { id },
      });

      if (!computer) {
        // this.logger.warn(`Computer not found with ID: ${id}`);
        return null;
      }

      // this.logger.info(`Computer found with ID: ${id}`);
      return PrismaComputerMapper.toDomain(computer);
    } catch (error) {
      // this.logger.error(`Failed to find computer by ID: ${error.message}`);
      throw error;
    }
  }

  async findMany(checked: boolean, type: ComputerType): Promise<Computer[]> {
    try {
      const computers = await this.prisma.computer.findMany({
        where: checked
          ? { checked }
          : {
              type,
              checked,
            },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // this.logger.info(`Found ${computers.length} computers`);
      return computers.map(PrismaComputerMapper.toDomain);
    } catch (error) {
      // this.logger.error(`Failed to find computers: ${error.message}`);
      throw error;
    }
  }

  async findComputerToNotify(): Promise<Computer[]> {
    try {
      const computers = await this.prisma.computer.findMany({
        where: {
          type: ComputerType.ADD,
          checked: false,
          status: false,
        },
      });
      
      return computers.map(PrismaComputerMapper.toDomain);
    } catch (error) {
      throw error;
    }
  }

  async save(computer: Computer): Promise<void> {
    const computerRaw = PrismaComputerMapper.toPrisma(computer);
    try {
      await this.prisma.computer.update({
        data: computerRaw,
        where: { id: computerRaw.id },
      });
      // this.logger.info(`Computer updated with ID: ${computerRaw.id}`);
    } catch (error) {
      // this.logger.error(`Failed to update computer: ${error.message}`);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.computer.delete({
        where: { id },
      });
      // this.logger.info(`Computer deleted with ID: ${id}`);
    } catch (error) {
      // this.logger.error(`Failed to delete computer: ${error.message}`);
      throw error;
    }
  }
}
