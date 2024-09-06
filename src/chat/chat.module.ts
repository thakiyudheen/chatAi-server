import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AxiosModule } from 'src/axios/axios.module';

@Module({
    imports: [AxiosModule],
    providers: [ChatGateway],
})
export class ChatModule {}
