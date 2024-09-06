
import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Logger } from '@nestjs/common';
  import { Socket, Server } from 'socket.io';
import { AxiosService } from 'src/axios/axios.service';
  
  @WebSocketGateway({ cors: true }) 
  export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(private readonly axiosService:AxiosService){}

    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('ChatGateway');
     
    afterInit(server: Server) {
      this.logger.log('WebSocket Initialized');
    }
  
    handleConnection(client: Socket) {
      this.logger.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      this.logger.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('sendMessage')
    async handleSend(client: Socket, payload: any ):Promise<void> {
      this.logger.log(payload);
      const response =await this.axiosService.postData('',payload)
      if(!response?.error){
        const answer = response?.candidates[0]?.content?.parts[0]?.text ;
        client.emit('response',answer);
      }else{
        client.emit('response','error');
      }
        

    
    }
  }
  