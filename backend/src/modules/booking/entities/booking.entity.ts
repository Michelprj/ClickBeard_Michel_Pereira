import { Barber } from '../..//barber/entities/barber.entity';
import { Users } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'booking' })
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: Date;

  @Column('text', { name: 'specialty_type', array: true, nullable: true })
  specialtyType: string[];

  @ManyToOne(() => Users, (users) => users.bookings)
  @JoinColumn({ name: 'user_id' })
  users: Users;

  @ManyToOne(() => Barber, (barber) => barber.bookings)
  @JoinColumn({ name: 'barber_id' })
  barber: Barber;

  @Column({ name: 'is_confirmed', default: true })
  isConfirmed: boolean;
}
