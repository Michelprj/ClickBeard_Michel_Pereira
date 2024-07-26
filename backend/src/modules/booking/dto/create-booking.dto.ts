import { IsArray, IsBoolean, IsDate, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsDate()
  time: Date;

  @IsArray()
  specialty_type: string[];

  @IsBoolean()
  @IsOptional()
  is_confirmed: boolean;
}
