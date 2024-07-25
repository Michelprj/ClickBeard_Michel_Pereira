import { ConfigService } from '@nestjs/config';

export const getJwtConstants = (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET'),
  expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
});
