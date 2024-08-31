import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../../locations/entities/location.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => Location, (location: Location) => location.games, { eager: false, nullable: false })
  location: Location;

  @Column()
  startDate: string;

  @Column()
  endDate: string;
}
