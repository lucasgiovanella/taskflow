import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '../../modules/user/repositories/UserRepository';
import { PrismaUserRepository } from './prisma/repositories/PrismaUserRepository';
import { DepositRepository } from '../../modules/deposit/repositories/depositRepository';
import { PrismaDepositRepository } from './prisma/repositories/PrismaDepositRepository';
import { ComputerRepository } from '../../modules/computer/repositories/computerRepository';
import { PrismaComputerRepository } from './prisma/repositories/PrismaComputerRepository';
import { ExceptionRepository } from '../../modules/exception/repositories/exceptionRepository';
import { PrismaExceptionRepository } from './prisma/repositories/PrismaExceptionRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ComputerRepository,
      useClass: PrismaComputerRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: DepositRepository,
      useClass: PrismaDepositRepository,
    },
    {
      provide: ExceptionRepository,
      useClass: PrismaExceptionRepository,
    }
  ],
  exports: [
    PrismaService,
    UserRepository,
    DepositRepository,
    ComputerRepository,
    ExceptionRepository,
  ],
})
export class DatabaseModule {}
