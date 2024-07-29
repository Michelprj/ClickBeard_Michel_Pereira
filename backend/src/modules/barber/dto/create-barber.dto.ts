import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';

export class CreateBarberDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsDate()
  hiringDate: Date;

  @IsArray()
  specialty: string[];
}
