import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  players: Player[] = [
    { id: 0, firstName: 'Roy', lastName: 'Freund', gamesLost: 0, gamesPlayed: 1, gamesWon: 1, money: 100 },
  ];

  create(createPlayerDto: CreatePlayerDto): Player {
    const newPlayer: Player = {
      ...createPlayerDto,
      id: this.players[this.players.length].id + 1,
    } as Player;
    this.players.push(newPlayer);
    return newPlayer;
  }

  findAll(): Player[] {
    return this.players;
  }

  findOne(id: number): Player {
    const player: Player = this.players.find((player: Player) => player.id === id);
    if (!player) {
      throw new NotFoundException(`Player with id '${id}' was not found`);
    }

    return player;
  }

  // update(id: number, updatePlayerDto: UpdatePlayerDto) {
  //   return `This action updates a #${id} player`;
  // }

  remove(id: number) {
    const removePlayer: Player = this.players.find((player: Player) => player.id === id);
    this.players = this.players.filter((player: Player) => player.id !== id);
    return removePlayer;
  }
}
