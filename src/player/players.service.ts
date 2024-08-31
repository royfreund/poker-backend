import { Injectable } from '@nestjs/common';
import { Player } from './entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { saveEntity } from '../utils/save-entity';
import { findOneOrThrow } from '../utils/find-one-or-throw';

@Injectable()
export class PlayersService {
  constructor(@InjectRepository(Player) private playersRepository: Repository<Player>) {}

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player: Player = this.playersRepository.create(createPlayerDto);
    return saveEntity(this.playersRepository, player);
  }

  async getPlayers(): Promise<Player[]> {
    return await this.playersRepository.find();
  }

  async getPlayerById(id: string): Promise<Player> {
    return findOneOrThrow(this.playersRepository, { id }, `Player with id: ${id} was not found`);
  }

  async updatePlayer(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const player: Player = await this.getPlayerById(id);
    const updatedPlayer: Player = this.playersRepository.merge(player, updatePlayerDto);
    return this.playersRepository.save(updatedPlayer);
  }

  async removePlayer(id: string) {
    const player: Player = await this.getPlayerById(id);
    await this.playersRepository.remove(player);
  }
}
