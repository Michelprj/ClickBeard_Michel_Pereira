import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../../../../src/modules/user/user.service';
import { Users } from '../../../../src/modules/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../../../../src/modules/user/dto/update-user.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('deve criar um usuário', async () => {
    const createUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      isAdmin: false,
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(repository, 'save').mockResolvedValue(createUserDto as any);

    const result = await service.create(createUserDto);

    expect(result).toEqual({
      ...createUserDto,
      password: expect.any(String),
    });
  });

  it('deve atualizar um usuário', async () => {
    const id = 1;
    const updateUserDto: UpdateUserDto = {
      name: 'Updated User',
      email: 'updated@example.com',
      password: 'newpassword123',
    };

    const existingUser = {
      id,
      name: 'Old User',
      email: 'old@example.com',
      password: 'oldpassword',
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(existingUser as any);
    jest.spyOn(repository, 'update').mockResolvedValue({
      email: 'updated@example.com',
      name: 'Updated User',
      password: 'hashed_newpassword123',
    } as never);

    const hashedPassword: string = 'hashed_newpassword123';
    jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);

    const result = await service.update(id, updateUserDto);

    expect(result).toEqual({
      ...updateUserDto,
      password: hashedPassword,
    });

    expect(repository.update).toHaveBeenCalledWith(id, {
      ...updateUserDto,
      password: hashedPassword,
    });
  });

  it('deve remover um usuário se o usuário logado for o mesmo', async () => {
    const id = 1;
    const userLoggedId = 1;
    const userToDelete = { id, name: 'Test User', email: 'test@example.com' };
    const userLogged = {
      id: userLoggedId,
      name: 'Logged User',
      email: 'logged@example.com',
    };

    jest.spyOn(repository, 'findOne').mockImplementation((query) => {
      if ((query.where as { id: number }).id === id) {
        return Promise.resolve(userToDelete as any);
      } else if ((query.where as { id: number }).id === userLoggedId) {
        return Promise.resolve(userLogged as any);
      }
      return Promise.resolve(null);
    });

    jest
      .spyOn(repository, 'delete')
      .mockResolvedValue({ affected: 1, raw: {} } as any);

    const req = { userId: userLoggedId };

    await service.remove(id, req);

    expect(repository.delete).toHaveBeenCalledWith(id);
  });

  it('deve lançar uma exceção se o usuário logado não for o mesmo', async () => {
    const id = 1;
    const userLoggedId = 2;
    const userToDelete = { id, name: 'Test User', email: 'test@example.com' };
    const userLogged = {
      id: userLoggedId,
      name: 'Logged User',
      email: 'logged@example.com',
    };

    jest.spyOn(repository, 'findOne').mockImplementation((query) => {
      if ((query.where as { id: number }).id === id) {
        return Promise.resolve(userToDelete as any);
      } else if ((query.where as { id: number }).id === userLoggedId) {
        return Promise.resolve(userLogged as any);
      }
      return Promise.resolve(null);
    });

    const req = { userId: userLoggedId };

    await expect(service.remove(id, req)).rejects.toThrow(BadRequestException);
  });

  it('deve encontrar um usuário pelo ID', async () => {
    const id = 1;
    const user = { id, name: 'Test User', email: 'test@example.com' };

    jest.spyOn(repository, 'findOne').mockResolvedValue(user as any);

    const result = await service.findOne(id);

    expect(result).toEqual(user);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
  });

  it('deve todos os usuários', async () => {
    const user = [
      { id: 1, name: 'Test User', email: 'test@example.com' },
      { id: 2, name: 'Test User 2', email: 'test2@example.com' },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(user as any);

    const result = await service.findAll();

    expect(result).toEqual(user);
  });

  it('deve lançar uma exceção se o usuário não for encontrado', async () => {
    const id = 1;

    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
  });
});
