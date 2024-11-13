import { ExceptionRepository } from '../../../../modules/exception/repositories/exceptionRepository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Exception } from '../../../../modules/exception/entities/Exception';
import { PrismaExceptionMapper } from '../mappers/PrismaExceptionMapper';
import { Logger } from 'winston';

@Injectable()
export class PrismaExceptionRepository implements ExceptionRepository {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger();

  async create(exception: Exception): Promise<void> {
    try {
      const exceptionRaw = PrismaExceptionMapper.toPrisma(exception);
      await this.prisma.exception.create({
        data: exceptionRaw,
      });
      this.logger.info('Exception created successfully', { exception });
    } catch (error) {
      // this.logger.error('Error creating exception', { error });
      throw error;
    }
  }

  async findById(id: string): Promise<Exception | null> {
    try {
      const exception = await this.prisma.exception.findUnique({
        where: { id },
      });

      if (!exception) {
        this.logger.info(`No exception found with id: ${id}`);
        return null;
      }

      this.logger.info(`Exception found with id: ${id}`, { exception });
      return PrismaExceptionMapper.toDomain(exception);
    } catch (error) {
      // this.logger.error(`Error finding exception by id: ${id}`, { error });
      throw error;
    }
  }

  async findAll(): Promise<Exception[]> {
    try {
      const exceptions = await this.prisma.exception.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

      this.logger.info('All exceptions found', { exceptions });
      return exceptions.map(PrismaExceptionMapper.toDomain);
    } catch (error) {
      // this.logger.error('Error finding all exceptions', { error });
      throw error;
    }
  }

  async save(exception: Exception): Promise<void> {
    try {
      const exceptionRaw = PrismaExceptionMapper.toPrisma(exception);
      await this.prisma.exception.update({
        data: exceptionRaw,
        where: { id: exceptionRaw.id },
      });
      this.logger.info(
        `Exception saved successfully with id: ${exception.id}`,
        { exception },
      );
    } catch (error) {
      // this.logger.error(`Error saving exception with id: ${exception.id}`, {
      //   error,
      // });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.exception.delete({
        where: { id },
      });
      this.logger.info(`Exception deleted successfully with id: ${id}`);
    } catch (error) {
      // this.logger.error(`Error deleting exception with id: ${id}`, { error });
      throw error;
    }
  }

  async findByName(computerName: string): Promise<Exception | null> {
    try {
      const exception = await this.prisma.exception.findUnique({
        where: { computerName },
      });

      if (!exception) {
        this.logger.info(
          `No exception found with computer name: ${computerName}`,
        );
        return null;
      }

      this.logger.info(`Exception found with computer name: ${computerName}`, {
        exception,
      });
      return PrismaExceptionMapper.toDomain(exception);
    } catch (error) {
      // this.logger.error(
      //   `Error finding exception by computer name: ${computerName}`,
      //   { error },
      // );
      throw error;
    }
  }
}
