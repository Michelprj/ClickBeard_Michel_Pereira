import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'Jane Doe',
    description: 'The updated name of the user. This field is optional.',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 'jane.doe@example.com',
    description:
      'The updated email address of the user. This field is optional.',
    required: false,
  })
  email?: string;

  @ApiProperty({
    example: 'newpassword456',
    description:
      'The updated password for the user account. This field is optional.',
    required: false,
  })
  password?: string;

  @ApiProperty({
    example: true,
    description:
      'Indicates if the user has admin privileges. This field is optional.',
    required: false,
  })
  isAdmin?: boolean;
}
