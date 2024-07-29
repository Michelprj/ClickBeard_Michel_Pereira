import { Booking } from '../../booking/entities/booking.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'barber' })
export class Barber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({ name: 'hiring_date' })
  hiringDate: Date;

  @Column('text', { array: true })
  specialty: string[];

  @OneToMany(() => Booking, (booking) => booking.barber)
  bookings: Booking[];
}
