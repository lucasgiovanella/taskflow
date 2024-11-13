// backend/src/socket/socket.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(8001, {
  namespace: '/socket.io',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(SocketGateway.name);

  @WebSocketServer()
  server: Server;
  afterInit(server: Server) {
    this.logger.log('Socket Gateway Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    // Envia um evento de teste para confirmar a conexão
    client.emit('test', { message: 'Connected to server' });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  private broadcastEvent(eventName: string, payload: any) {
    this.logger.log(`Broadcasting ${eventName} event`);
    this.server.emit(eventName, payload);
  }

  @SubscribeMessage('computerUpdate')
  handleComputerUpdate(client: Socket, payload: any) {
    this.logger.log(`Received computerUpdate event from ${client.id}`);
    this.broadcastEvent('computerUpdate', payload);
  }

  @SubscribeMessage('computerCreate')
  handleComputerCreate(client: Socket, payload: any) {
    this.logger.log(`Received computerCreate event from ${client.id}`);
    this.broadcastEvent('computerCreate', payload);
  }

  @SubscribeMessage('computerDelete')
  handleComputerDelete(client: Socket, payload: any) {
    this.logger.log(`Received computerDelete event from ${client.id}`);
    this.broadcastEvent('computerDelete', payload);
  }

  @SubscribeMessage('depositUpdate')
  handleDepositUpdate(client: Socket, payload: any) {
    this.logger.log(`Received depositUpdate event from ${client.id}`);
    this.broadcastEvent('depositUpdate', payload);
  }

  @SubscribeMessage('depositCreate')
  handleDepositCreate(client: Socket, payload: any) {
    this.logger.log(`Received depositCreate event from ${client.id}`);
    this.broadcastEvent('depositCreate', payload);
  }

  @SubscribeMessage('depositDelete')
  handleDepositDelete(client: Socket, payload: any) {
    this.logger.log(`Received depositDelete event from ${client.id}`);
    this.broadcastEvent('depositDelete', payload);
  }
}
