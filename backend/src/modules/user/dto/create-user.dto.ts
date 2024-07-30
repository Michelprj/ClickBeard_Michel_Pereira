import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user.',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password for the user account.',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: false,
    description: 'Indicates if the user has admin privileges.',
    required: false,
  })
  @IsOptional()
  isAdmin: boolean;
}
