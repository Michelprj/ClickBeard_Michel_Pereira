import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBarberDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsDate()
  @IsOptional()
  hiringDate: Date;

  @IsArray()
  specialty: string[];
}
