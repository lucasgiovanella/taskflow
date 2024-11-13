import { DatabaseModule } from '../../../../infra/database/database.module';
import { CreateComputerUseCase } from '../../../../modules/computer/useCases/createComputerUseCase/createComputerUseCase';
import { DeleteComputerUseCase } from '../../../../modules/computer/useCases/deleteComputerUseCase/deleteComputerUseCase';
import { EditComputerUseCase } from '../../../../modules/computer/useCases/editComputerUseCase/editComputerUseCase';
import { GetComputerUseCase } from '../../../../modules/computer/useCases/getComputerUseCase/getComputerUseCase';
import { Module } from '@nestjs/common';
import { ComputerController } from './computer.controller';
import { FindComputerToNotifyUseCase } from '../../../../modules/computer/useCases/findComputerToNotifyUseCase/findComputerToNotifyUseCase';
import { SocketService } from 'src/infra/gateway/socket.service';
import { SocketModule } from 'src/infra/gateway/socket.module';

@Module({
  imports: [DatabaseModule, SocketModule],
  controllers: [ComputerController],
  providers: [
    CreateComputerUseCase,
    EditComputerUseCase,
    DeleteComputerUseCase,
    GetComputerUseCase,
    FindComputerToNotifyUseCase,
    SocketService,
  ],
  exports: [FindComputerToNotifyUseCase],
})
export class ComputerModule {}
