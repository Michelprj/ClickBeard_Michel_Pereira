import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBarberDto } from './create-barber.dto';

export class UpdateBarberDto extends PartialType(CreateBarberDto) {
  @ApiProperty({
    example: 'John Smith',
    description: 'The updated name of the barber. This field is optional.',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 35,
    description: 'The updated age of the barber. This field is optional.',
    required: false,
  })
  age?: number;

  @ApiProperty({
    example: '2023-05-01T00:00:00Z',
    description:
      'The updated hiring date of the barber. This field is optional.',
    type: String,
    required: false,
  })
  hiringDate?: Date;

  @ApiProperty({
    example: ['hair', 'beard', 'eyebrow'],
    description:
      'The updated specialties of the barber. This field is optional.',
    type: [String],
    required: false,
  })
  specialty?: string[];
}
