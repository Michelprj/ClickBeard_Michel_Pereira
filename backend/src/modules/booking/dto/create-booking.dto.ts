import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDate, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    example: '2024-07-31T21:00:00.000Z',
    description: 'The date and time of the booking.',
  })
  @IsDate()
  time: Date;

  @ApiProperty({
    example: ['hair', 'beard', 'eyebrow'],
    description: 'Types of specialties for the booking.',
    type: [String],
  })
  @IsArray()
  specialtyType: string[];

  @ApiProperty({
    example: true,
    description:
      'Indicates if the booking is confirmed. This field is optional.',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isConfirmed: boolean;
}
