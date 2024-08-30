import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationsService {
  constructor(@InjectRepository(Location) private locationRepository: Repository<Location>) {}

  async createLocation(createLocationDto: CreateLocationDto): Promise<Location> {
    const location: Location = this.locationRepository.create(createLocationDto);
    return await this.locationRepository.save(location);
  }

  async getLocations(): Promise<Location[]> {
    return await this.locationRepository.find();
  }

  async getLocationById(id: string): Promise<Location> {
    const location: Location = await this.locationRepository.findOneBy({ id });

    if (!location) {
      throw new NotFoundException(`Location with id: ${id} was not found`);
    }

    return location;
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
