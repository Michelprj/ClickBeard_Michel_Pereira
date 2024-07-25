import { IsString, IsEmail } from 'class-validator';

export class SignUpDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
