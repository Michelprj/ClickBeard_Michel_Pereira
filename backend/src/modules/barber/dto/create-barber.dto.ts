import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBarberDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the barber',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 30,
    description: 'Age of the barber',
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    example: '2024-07-29T21:00:00.000Z',
    description: 'Hiring date of the barber',
  })
  @IsDate()
  @Type(() => Date)
  hiringDate: Date;

  @ApiProperty({
    example: ['hair', 'beard', 'eyebrow'],
    description: 'Specialties of the barber',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  specialty: string[];
}
