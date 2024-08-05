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

    const bookingTime = moment(createBookingDto.time, 'YYYY-MM-DDTHH:mm:ss');
    const openingTime = moment(bookingTime).set({
      hour: 8,
      minute: 0,
      second: 0,
    });
    const closingTime = moment(bookingTime).set({
      hour: 17,
      minute: 30,
      second: 0,
    });

    if (bookingTime.isBefore(openingTime) || bookingTime.isAfter(closingTime)) {
      throw new BadRequestException(
        'Booking time must be between 08:00 and 17:30',
      );
    }

    if (
      (bookingTime.isAfter(openingTime) || bookingTime.isBefore(closingTime)) &&
      bookingTime.isBefore(moment())
    ) {
      throw new BadRequestException('Booking time cannot be in the past');
    }

    const busyBarber = barberServices.some((service) => {
      const serviceDate = moment(service.time).format('DD-MM-YYYY');
      const createDate = moment(createBookingDto.time).format('DD-MM-YYYY');
      const serviceTime = moment(service.time, 'HH:mm').format('HH:mm');
      const createTime = moment(createBookingDto.time, 'HH:mm').format('HH:mm');

      return (
        serviceDate === createDate &&
        serviceTime === createTime &&
        service.barber.id === barber.id
      );
    });

    if (busyBarber) {
      throw new BadRequestException('This time is already booked');
    }

    const bookingCreated = {
      ...createBookingDto,
      specialtyType: createBookingDto.specialtyType,
      users: user,
      barber,
    };

    return await this.bookingRepository.save(bookingCreated);
  }

  async findAll() {
    return await this.bookingRepository.find({
      relations: ['users', 'barber'],
    });
  }

  async findOne(id: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['users', 'barber'],
    });

    if (!booking) {
      throw new BadRequestException('Booking not found');
    }

    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const bookingFormatted = {
      ...updateBookingDto,
      specialtyType:
        updateBookingDto.specialtyType && updateBookingDto.specialtyType,
    };

    await this.bookingRepository.update(id, bookingFormatted);
  }

  async remove(id: number) {
    await this.bookingRepository.delete(id);
  }

  async findAllByBarber(barberId: number) {
    const barberServices = await this.bookingRepository.find({
      where: { barber: { id: barberId }, isConfirmed: true },
      relations: ['users', 'barber'],
    });

    if (barberServices) {
      return barberServices;
    }
  }

  async cancelBooking(id: number) {
    const booking = await this.findOne(id);

    const bookingTime = momentTimezone.tz(booking.time, 'America/Sao_Paulo');
    const currentTime = momentTimezone.tz('America/Sao_Paulo');

    const hoursDifference = bookingTime.diff(currentTime, 'hours') + 3;

    if (hoursDifference <= 2) {
      throw new BadRequestException(
        'Cancellations are only allowed at least two hours in advance',
      );
    }

    const bookingUpdated = {
      ...booking,
      isConfirmed: false,
    };

    return await this.bookingRepository.update(id, bookingUpdated);
  }
}
