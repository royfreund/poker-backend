import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { saveEntity } from '../utils/save-entity';
import { Location } from '../locations/entities/location.entity';
import { LocationsService } from '../locations/locations.service';
import { DeepPartial } from "typeorm/common/DeepPartial";

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    private locationsService: LocationsService,
  ) {}

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const location: Location = await this.locationsService.getLocationById(createGameDto.locationId);
    const game: Game = this.gameRepository.create({ ...createGameDto, location } as DeepPartial<Game>);
    return await saveEntity(this.gameRepository, game);
  }

  async getGames(): Promise<Game[]> {
    return await this.gameRepository.find();
  }

  async getGameById(id: string): Promise<Game> {
    const game: Game = await this.gameRepository.findOneBy({ id });

    if (!game) {
      throw new NotFoundException(`Game with id: ${id} was not found`);
    }

    return game;
  }

  async updateGame(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    const game: Game = await this.getGameById(id);
    const updatedGame: Game = this.gameRepository.merge(game, updateGameDto);
    return await this.gameRepository.save(updatedGame);
  }

  async removeGame(id: string) {
    const game: Game = await this.getGameById(id);
    await this.gameRepository.remove(game);
  }
}
