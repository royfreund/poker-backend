import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerService.createPlayer(createPlayerDto);
  }

  @Get()
  async getPlayers(): Promise<Player[]> {
    return this.playerService.getPlayers();
  }

  @Get(':id')
  async getPlayerById(@Param('id') id: string): Promise<Player> {
    return this.playerService.getPlayerById(id);
  }

  @Patch(':id')
  async updatePlayer(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    return this.playerService.updatePlayer(id, updatePlayerDto);
  }

  @Delete(':id')
  deletePlayer(@Param('id') id: string) {
    return this.playerService.deletePlayer(id);
  }
}
