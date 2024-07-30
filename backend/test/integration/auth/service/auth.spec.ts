import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../../src/modules/auth/auth.service';
import { UserService } from '../../../../src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SigninDto } from '../../../../src/modules/auth/dto/signin.dto';
import { SignUpDto } from '../../../../src/modules/auth/dto/signup.dto';
import { UnauthorizedException } from '@nestjs/common';
import { Users } from 'src/modules/user/entities/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signin', () => {
    it('deve lançar uma exceção se o email for inválido', async () => {
      const signinDto: SigninDto = {
        email: 'invalid@example.com',
        password: 'password',
      };

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

      await expect(authService.signin(signinDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('deve lançar uma exceção se a senha for inválida', async () => {
      const signinDto: SigninDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      const user = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
      };

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user as Users);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(authService.signin(signinDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('deve retornar um access token se as credenciais forem válidas', async () => {
      const signinDto: SigninDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const user = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
      };
      const accessToken = 'access-token';

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user as Users);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(accessToken);

      const result = await authService.signin(signinDto);

      expect(result).toEqual({ user, accessToken });
    });
  });

  describe('signUp', () => {
    it('deve criar um novo usuário', async () => {
      const signUpDto: SignUpDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        isAdmin: false,
      };
      const createdUser = { id: 1, email: 'test@example.com' };

      jest.spyOn(userService, 'create').mockResolvedValue(createdUser as Users);

      const result = await authService.signUp(signUpDto);

      expect(result).toEqual(createdUser);
      expect(userService.create).toHaveBeenCalledWith(signUpDto);
    });
  });

  describe('getProfile', () => {
    it('deve retornar o perfil do usuário', async () => {
      const userId = 1;
      const userProfile = { id: 1, email: 'test@example.com' };

      jest
        .spyOn(userService, 'findOne')
        .mockResolvedValue(userProfile as Users);

      const result = await authService.getProfile(userId);

      expect(result).toEqual(userProfile);
      expect(userService.findOne).toHaveBeenCalledWith(userId);
    });
  });
});
