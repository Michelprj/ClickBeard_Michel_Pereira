import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto) {
    console.log('signinDto', signinDto.email);

    const user = await this.userService.findByEmail(signinDto.email);

    console.log('user', user);

    if (!user) {
      throw new UnauthorizedException('Invalid email entered.');
    }

    const isPasswordValid = await bcrypt.compare(
      signinDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password entered.');
    }

    const accessToken = await this.jwtService.signAsync({ sub: user.id });
    return { user, accessToken };
  }

  async signUp(signUpDto: SignUpDto) {
    return await this.userService.create(signUpDto);
  }

  async getProfile(id: number) {
    return await this.userService.findOne(id);
  }
}
