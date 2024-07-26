import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post(':barberId')
  create(
    @Body() createBookingDto: CreateBookingDto,
    @Param('barberId') barberId: string,
    @Req() req,
  ) {
    return this.bookingService.create(createBookingDto, barberId, req);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(204)
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }

  @Patch(':id/confirm')
  @HttpCode(204)
  confirmBooking(@Param('id') id: string) {
    return this.bookingService.cancelBooking(+id);
  }
}
