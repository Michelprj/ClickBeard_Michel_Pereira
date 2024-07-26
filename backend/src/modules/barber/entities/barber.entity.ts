import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('barber')
export class Barber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({ default: new Date() })
  hiringDate: Date;

  @Column('text', { array: true })
  specialty: string[];
}
