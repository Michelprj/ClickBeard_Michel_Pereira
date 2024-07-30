import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../../src/modules/user/user.controller';
import { UserService } from '../../../../src/modules/user/user.service';
import { UpdateUserDto } from '../../../../src/modules/user/dto/update-user.dto';
import { Users } from 'src/modules/user/entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('deve encontrar todos os usuários', async () => {
    const result = [
      { id: 1, name: 'User One', email: 'user1@example.com' },
      { id: 2, name: 'User Two', email: 'user2@example.com' },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(result as Users[]);

    expect(await controller.findAll()).toBe(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('deve encontrar um usuário pelo ID', async () => {
    const id = '1';
    const result = { id: 1, name: 'User One', email: 'user1@example.com' };

    jest.spyOn(service, 'findOne').mockResolvedValue(result as Users);

    expect(await controller.findOne(id)).toBe(result);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('deve atualizar um usuário', async () => {
    const id = '1';
    const updateUserDto: UpdateUserDto = {
      name: 'Updated User',
      email: 'updated@example.com',
      password: 'newpassword123',
    };

    jest.spyOn(service, 'update').mockResolvedValue(undefined);

    expect(await controller.update(id, updateUserDto)).toBeUndefined();
    expect(service.update).toHaveBeenCalledWith(+id, updateUserDto);
  });

  it('deve remover um usuário', async () => {
    const id = '1';
    const req = { userId: 1 };

    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove(id, req)).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(+id, req);
  });
});
