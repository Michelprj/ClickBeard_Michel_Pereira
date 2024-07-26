import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { UserService } from '../user/user.service';
import { BarberService } from '../barber/barber.service';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private readonly userService: UserService,
    private readonly barberService: BarberService,
  ) {}

  async create(createBookingDto: CreateBookingDto, barberId: string, req: any) {
    const user = await this.userService.findOne(req.userId);
    const barber = await this.barberService.findOne(+barberId);
    const barberServices = await this.findAllByBarber(+barberId);

    if (!barber) {
      throw new BadRequestException('Barber not found');
    }

    const busyBarber = barberServices.some((service) => {
      const serviceDate = moment(service.time).format('DD-MM-YYYY');
      const createDate = moment(createBookingDto.time).format('DD-MM-YYYY');
      const serviceTime = moment(service.time, 'HH:mm').format('HH:mm');
      const createTime = moment(createBookingDto.time, 'HH:mm').format('HH:mm');

      return serviceDate === createDate && serviceTime === createTime;
    });

    if (busyBarber) {
      throw new BadRequestException('This time is already booked');
    }

    const bookingCreated = {
      ...createBookingDto,
      specialty_type: createBookingDto.specialty_type.join(', '),
      user,
      barber,
    };

    return await this.bookingRepository.save(bookingCreated);
  }

  async findAll() {
    return await this.bookingRepository.find({ relations: ['user', 'barber'] });
  }

  async findOne(id: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['user', 'barber'],
    });

    if (!booking) {
      throw new BadRequestException('Booking not found');
    }

    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const bookingFormatted = {
      ...updateBookingDto,
      specialty_type:
        updateBookingDto.specialty_type &&
        updateBookingDto.specialty_type.join(', '),
    };

    await this.bookingRepository.update(id, bookingFormatted);
  }

  async remove(id: number) {
    await this.bookingRepository.delete(id);
  }

  async findAllByBarber(barberId: number) {
    const barberServices = await this.bookingRepository.find({
      where: { barber: { id: barberId } },
      relations: ['user', 'barber'],
    });

    if (barberServices) {
      return barberServices;
    }
  }

  async cancelBooking(id: number) {
    const booking = await this.findOne(id);

    if (!booking) {
      throw new BadRequestException('Booking not found');
    }

    const bookingTime = momentTimezone(booking.time);
    const currentTime = momentTimezone.tz('America/Sao_Paulo');

    const hoursDifference = bookingTime.diff(currentTime, 'hours') + 3;

    if (hoursDifference <= 2) {
      throw new BadRequestException(
        'Cancellations are only allowed at least two hours in advance',
      );
    }

    const bookingUpdated = {
      ...booking,
      is_confirmed: false,
    };

    return await this.bookingRepository.update(id, bookingUpdated);
  }
}
