import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { IsPublic } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @IsPublic()
  @Post('signup')
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Get('profile')
  getProfile(@Param() id: number) {
    return this.authService.getProfile(id);
  }
}
