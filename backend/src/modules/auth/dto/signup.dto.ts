import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password of the user',
  })
  @IsString()
  password: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indicates if the user has admin privileges',
  })
  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;
}
