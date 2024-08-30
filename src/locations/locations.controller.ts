import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async createLocation(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
    return this.locationsService.createLocation(createLocationDto);
  }

  @Get()
  async getLocations(): Promise<Location[]> {
    return this.locationsService.getLocations();
  }

  @Get(':id')
  async getLocationById(@Param('id') id: string): Promise<Location> {
    return this.locationsService.getLocationById(id);
  }

  @Patch(':id')
  async updateLocation(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto): Promise<Location> {
    return this.locationsService.updateLocation(id, updateLocationDto);
  }

  @Delete(':id')
  removeLocation(@Param('id') id: string) {
    return this.locationsService.removeLocation(id);
  }
}
