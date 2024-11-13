import { Module } from '@nestjs/common';
import { UserModule } from './infra/http/modules/user/user.module';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard';
import { DepositModule } from './infra/http/modules/deposit/deposit.module';
import { ComputerModule } from './infra/http/modules/computer/computer.module';
import { ExceptionModule } from './infra/http/modules/exception/exception.module';
import { Logger } from 'winston';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './infra/crons/cron.service';
import { SocketModule } from './infra/gateway/socket.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    DepositModule,
    ComputerModule,
    ExceptionModule,
    ScheduleModule.forRoot(),
    SocketModule,
  ],
  controllers: [],
  providers: [
    CronService,
    Logger,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
