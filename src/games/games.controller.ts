import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async createGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.createGame(createGameDto);
  }

  @Get()
  async getGames(): Promise<Game[]> {
    return this.gamesService.getGames();
  }

  @Get(':id')
  async getGameById(@Param('id') id: string): Promise<Game> {
    return this.gamesService.getGameById(id);
  }

  @Patch(':id')
  async updateGame(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto): Promise<Game> {
    return this.gamesService.updateGame(id, updateGameDto);
  }

  @Delete(':id')
  async removeGame(@Param('id') id: string) {
    return this.gamesService.removeGame(id);
  }
}
