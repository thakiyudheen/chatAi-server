import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { AxiosModule } from './axios/axios.module';

@Module({
  imports: [ChatModule,AxiosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
