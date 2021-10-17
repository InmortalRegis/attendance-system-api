import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Log } from './entities/log.entity';

@WebSocketGateway({ cors: true, namespace: 'logs' })
export class LogGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('logCreated')
  async handleMessage(client: any, payload: any) {
    console.log(
      '🚀 ~ file: log.gateway.ts ~ line 14 ~ LogGateway ~ handleMessage ~ payload',
      payload,
    );
    console.log(
      '🚀 ~ file: log.gateway.ts ~ line 14 ~ LogGateway ~ handleMessage ~ client',
      client,
    );
    // this.server.emit('logCreated', payload);
  }

  async logCreated(log: Log) {
    try {
      this.server.emit('logCreated', log);
    } catch (error) {
      console.log(
        '🚀 ~ file: log.gateway.ts ~ line 30 ~ LogGateway ~ logCreated ~ error',
        error,
      );
    }
  }
}
