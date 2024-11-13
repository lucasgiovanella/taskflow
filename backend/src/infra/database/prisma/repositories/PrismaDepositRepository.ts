import { Deposit } from '../../../../modules/deposit/entities/deposit';
import { PrismaService } from '../prisma.service';
import { PrismaDepositMapper } from '../mappers/PrismaDepositMapper';
import { Injectable } from '@nestjs/common';
import { DepositRepository } from '../../../../modules/deposit/repositories/depositRepository';
import { Logger } from 'winston';

@Injectable()
export class PrismaDepositRepository implements DepositRepository {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger();

  async create(deposit: Deposit): Promise<void> {
    try {
      const depositRaw = PrismaDepositMapper.toPrisma(deposit);
      await this.prisma.deposit.create({
        data: depositRaw,
      });
      // this.logger.info(`Deposit created with id: ${depositRaw.name}`);
    } catch (error) {
      // this.logger.error(`Error creating deposit: ${error.message}`);
      throw error;
    }
  }

  async findById(id: string): Promise<Deposit | null> {
    try {
      const deposit = await this.prisma.deposit.findUnique({
        where: { id },
      });

      if (!deposit) {
        // this.logger.warn(`Deposit not found with id: ${id}`);
        return null;
      }

      // this.logger.info(`Deposit found with id: ${id}`);
      return PrismaDepositMapper.toDomain(deposit);
    } catch (error) {
      // this.logger.error(`Error finding deposit by id: ${error.message}`);
      throw error;
    }
  }

  async findByName(name: string): Promise<Deposit | null> {
    try {
      const deposit = await this.prisma.deposit.findFirst({
        where: { name },
      });

      if (!deposit) {
        // this.logger.warn(`Deposit not found with name: ${name}`);
        return null;
      }

      // this.logger.info(`Deposit found with name: ${name}`);
      return PrismaDepositMapper.toDomain(deposit);
    } catch (error) {
      // this.logger.error(`Error finding deposit by name: ${error.message}`);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.deposit.delete({
        where: { id },
      });
      // this.logger.info(`Deposit deleted with id: ${id}`);
    } catch (error) {
      // this.logger.error(`Error deleting deposit: ${error.message}`);
      throw error;
    }
  }

  async save(deposit: Deposit): Promise<void> {
    try {
      const depositRaw = PrismaDepositMapper.toPrisma(deposit);
      await this.prisma.deposit.update({
        data: depositRaw,
        where: { id: depositRaw.id },
      });
      // this.logger.info(`Deposit updated with id: ${depositRaw.name}`);
    } catch (error) {
      // this.logger.error(`Error updating deposit: ${error.message}`);
      throw error;
    }
  }

  async findMany(inUse: boolean): Promise<Deposit[]> {
    try {
      const deposits = await this.prisma.deposit.findMany({
        where: { inUse },
        orderBy: { createdAt: 'desc' },
      });
      // this.logger.info(`Found ${deposits.length} deposits`);
      return deposits.map(PrismaDepositMapper.toDomain);
    } catch (error) {
      // this.logger.error(`Error finding deposits: ${error.message}`);
      throw error;
    }
  }
}
