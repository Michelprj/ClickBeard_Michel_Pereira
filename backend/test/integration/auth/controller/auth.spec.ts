import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../../src/modules/auth/auth.controller';
import { AuthService } from '../../../../src/modules/auth/auth.service';
import { SigninDto } from '../../../../src/modules/auth/dto/signin.dto';
import { SignUpDto } from '../../../../src/modules/auth/dto/signup.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signin: jest.fn(),
            signUp: jest.fn(),
            getProfile: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signin', () => {
    it('deve retornar um access token quando as credenciais são válidas', async () => {
      const signinDto: SigninDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const result = {
        user: { id: 1, email: 'test@example.com' },
        accessToken: 'access-token',
      };

      jest.spyOn(authService, 'signin').mockResolvedValue(result as any);

      expect(await authController.signin(signinDto)).toEqual(result);
      expect(authService.signin).toHaveBeenCalledWith(signinDto);
    });

    it('deve lançar uma exceção se as credenciais forem inválidas', async () => {
      const signinDto: SigninDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      jest
        .spyOn(authService, 'signin')
        .mockRejectedValue(new UnauthorizedException());

      await expect(authController.signin(signinDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(authService.signin).toHaveBeenCalledWith(signinDto);
    });
  });

  describe('signup', () => {
    it('deve criar um novo usuário', async () => {
      const signUpDto: SignUpDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        isAdmin: false,
      };
      const createdUser = { id: 1, email: 'test@example.com' };

      jest.spyOn(authService, 'signUp').mockResolvedValue(createdUser as any);

      expect(await authController.signup(signUpDto)).toEqual(createdUser);
      expect(authService.signUp).toHaveBeenCalledWith(signUpDto);
    });
  });

  describe('getProfile', () => {
    it('deve retornar o perfil do usuário', async () => {
      const userId = 1;
      const userProfile = { id: 1, email: 'test@example.com' };

      jest
        .spyOn(authService, 'getProfile')
        .mockResolvedValue(userProfile as any);

      expect(await authController.getProfile(userId)).toEqual(userProfile);
      expect(authService.getProfile).toHaveBeenCalledWith(userId);
    });
  });
});
