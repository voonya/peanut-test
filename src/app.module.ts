import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { ExchangesService } from './services/exchanges.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [ExchangesService],
})
export class AppModule {}
