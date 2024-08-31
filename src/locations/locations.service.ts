import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { saveEntity } from '../utils/save-entity';
import { findOneOrThrow } from '../utils/find-one-or-throw';

@Injectable()
export class LocationsService {
  constructor(@InjectRepository(Location) private locationRepository: Repository<Location>) {}

  async createLocation(createLocationDto: CreateLocationDto): Promise<Location> {
    const location: Location = this.locationRepository.create(createLocationDto);
    return await saveEntity(this.locationRepository, location);
  }

  async getLocations(): Promise<Location[]> {
    return await this.locationRepository.find();
  }

  async getLocationById(id: string): Promise<Location> {
    return findOneOrThrow(this.locationRepository, { id }, `Location with id: ${id} was not found`);
  }

  async updateLocation(id: string, updateLocationDto: UpdateLocationDto): Promise<Location> {
    const location: Location = await this.getLocationById(id);
    const updatedLocation: Location = this.locationRepository.merge(location, updateLocationDto);
    return await this.locationRepository.save(updatedLocation);
  }

  async removeLocation(id: string) {
    const location: Location = await this.getLocationById(id);
    return await this.locationRepository.remove(location);
  }
}
