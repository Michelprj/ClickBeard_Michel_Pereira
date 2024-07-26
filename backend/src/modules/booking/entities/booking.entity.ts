import { Barber } from '../..//barber/entities/barber.entity';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: Date;

  @Column()
  specialty_type: string;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @ManyToOne(() => Barber, (barber) => barber.bookings)
  barber: Barber;

  @Column({ default: true })
  is_confirmed: boolean;
}
