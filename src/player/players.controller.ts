import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('player')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @Get()
  findAll() {
    return this.playerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.playerService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id', ParseIntPipe) id: number, @Body() updatePlayerDto: UpdatePlayerDto) {
  //   return this.playerService.update(id, updatePlayerDto);
  // }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.playerService.remove(id);
  }
}
