import { Module } from '@nestjs/common';
import { PlayersModule } from './player/players.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'poker',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PlayersModule,
  ],
})
export class AppModule {}
