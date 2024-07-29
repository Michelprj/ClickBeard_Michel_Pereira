import { Booking } from '../../booking/entities/booking.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'is_admin', default: false })
  isadmin: boolean;

  @OneToMany(() => Booking, (booking) => booking.users)
  bookings: Booking[];
}
