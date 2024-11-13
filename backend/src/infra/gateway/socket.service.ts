import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Injectable()
export class SocketService {
  constructor(private socketGateway: SocketGateway) {}

  emitComputerUpdate() {
    this.socketGateway.server.emit('computerUpdate');
  }

  emitComputerCreate() {
    this.socketGateway.server.emit('computerCreate');
  }

  emitComputerDelete() {
    this.socketGateway.server.emit('computerDelete');
  }

  emitDepositUpdate() {
    this.socketGateway.server.emit('depositUpdate');
  }

  emitDepositCreate() {
    this.socketGateway.server.emit('depositCreate');
  }

  emitDepositDelete() {
    this.socketGateway.server.emit('depositDelete');
  }
}
