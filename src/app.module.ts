import { Module } from '@nestjs/common';
import { PlayersModule } from './player/players.module';

@Module({
  imports: [PlayersModule],
})
export class AppModule {}
