import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateGameDto {
  @IsUUID()
  @IsNotEmpty()
  locationId: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;
}
