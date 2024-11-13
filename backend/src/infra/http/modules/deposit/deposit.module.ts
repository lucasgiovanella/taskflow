import { Module } from '@nestjs/common';
import { DepositController } from './deposit.controller';
import { DatabaseModule } from '../../../../infra/database/database.module';
import { CreateDepositUseCase } from '../../../../modules/deposit/useCases/createDepositUseCase/createDepositUseCase';
import { DeleteDepositUseCase } from '../../../../modules/deposit/useCases/deleteDepositUseCase/deleteDepositUseCase';
import { EditDepositUseCase } from '../../../../modules/deposit/useCases/editDepositUseCase/editDepositUseCase';
import { GetManyDepositUseCase } from '../../../../modules/deposit/useCases/getManyUseCase/getManyUseCase';
import { SocketModule } from 'src/infra/gateway/socket.module';
import { SocketService } from 'src/infra/gateway/socket.service';

@Module({
  imports: [DatabaseModule, SocketModule],
  controllers: [DepositController],
  providers: [
    CreateDepositUseCase,
    DeleteDepositUseCase,
    EditDepositUseCase,
    GetManyDepositUseCase,
    SocketService,
  ],
})
export class DepositModule {}
