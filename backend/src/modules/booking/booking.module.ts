import { BarberModule } from './../barber/barber.module';
import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), UserModule, BarberModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
