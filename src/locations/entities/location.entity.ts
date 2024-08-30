import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from '../../games/entities/game.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  address: string;

  @OneToMany(() => Game, (game: Game) => game.location, { eager: true })
  games: Game[];
}
