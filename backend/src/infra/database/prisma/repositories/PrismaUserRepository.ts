import { User } from '../../../../modules/user/entities/User';
import { UserRepository } from '../../../../modules/user/repositories/UserRepository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/PrismaUserMapper';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger();

  async create(user: User): Promise<void> {
    try {
      const userRaw = PrismaUserMapper.toPrisma(user);

      await this.prisma.user.create({
        data: userRaw,
      });

      // this.logger.log(`User created successfully - ${user.email}`);
    } catch (error) {
      // this.logger.error('Unable to create user', error.message);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) return null;

      // this.logger.log(`User found by email`);
      return PrismaUserMapper.toDomain(user);
    } catch (error) {
      // this.logger.error('Unable to find user by email', error.message);
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) return null;

      // this.logger.log(`User found by id - ${id}`);
      return PrismaUserMapper.toDomain(user);
    } catch (error) {
      // this.logger.error('Unable to find user by id', error.message);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany();

      const usersMapped = users.map(PrismaUserMapper.toDomain);

      return usersMapped;
    } catch (error) {
      // this.logger.error('Unable to retrieve all users', error.message);
      throw error;
    }
  }

  async update(user: User): Promise<void> {
    try {
      const userRaw = PrismaUserMapper.toPrisma(user);

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: userRaw,
      });

      // this.logger.log(`User updated successfully`);
    } catch (error) {
      // this.logger.error('Unable to update user', error.message);
      throw error;
    }
  }

  async updateAvatar(id: string, imageId: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          imageId,
        },
      });

      // this.logger.log(`User avatar updated successfully`);
    } catch (error) {
      // this.logger.error('Unable to update user avatar', error.message);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
      });

      // this.logger.log(`User deleted successfully`);
    } catch (error) {
      // this.logger.error('Unable to delete user', error.message);
      throw error;
    }
  }
}
