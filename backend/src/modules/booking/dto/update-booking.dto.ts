import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @ApiProperty({
    example: '2024-07-31T21:00:00.339Z',
    description: 'The updated time for the booking. This field is optional.',
    type: String,
    required: false,
  })
  time?: Date;

  @ApiProperty({
    example: ['hair', 'beard', 'eyebrow'],
    description:
      'The updated specialties for the booking. This field is optional.',
    type: [String],
    required: false,
  })
  specialtyType?: string[];

  @ApiProperty({
    example: true,
    description:
      'Indicates if the booking is confirmed. This field is optional.',
    required: false,
  })
  isConfirmed?: boolean;
}
