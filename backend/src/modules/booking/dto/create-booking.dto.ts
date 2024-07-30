import { IsArray, IsBoolean, IsDate, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsDate()
  time: Date;

  @IsArray()
  specialtyType: string[];

  @IsBoolean()
  @IsOptional()
  isConfirmed: boolean;
}
