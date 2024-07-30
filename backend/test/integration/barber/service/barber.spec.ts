import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BarberService } from '../../../../src/modules/barber/barber.service';
import { Barber } from '../../../../src/modules/barber/entities/barber.entity';
import { UserService } from '../../../../src/modules/user/user.service';
import { CreateBarberDto } from '../../../../src/modules/barber/dto/create-barber.dto';
import { UpdateBarberDto } from '../../../../src/modules/barber/dto/update-barber.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('BarberService', () => {
  let service: BarberService;
  let repository: Repository<Barber>;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BarberService,
        UserService,
        {
          provide: getRepositoryToken(Barber),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BarberService>(BarberService);
    repository = module.get<Repository<Barber>>(getRepositoryToken(Barber));
    userService = module.get<UserService>(UserService);
  });

  it('deve criar um barbeiro', async () => {
    const createBarberDto: CreateBarberDto = {
      name: 'Test Barber',
      age: 30,
      hiringDate: new Date(),
      specialty: ['hair', 'beard'],
    };

    const req = { userId: 1 };
    jest
      .spyOn(userService, 'findOne')
      .mockResolvedValue({ id: 1, isAdmin: true } as any);
    jest.spyOn(repository, 'save').mockResolvedValue(createBarberDto as Barber);

    const result = await service.create(createBarberDto, req);

    expect(result).toEqual(createBarberDto);
    expect(repository.save).toHaveBeenCalledWith(createBarberDto);
  });

  it('deve lançar exceção se não for admin ao criar', async () => {
    const createBarberDto: CreateBarberDto = {
      name: 'Test Barber',
      age: 30,
      hiringDate: new Date(),
      specialty: ['hair', 'beard'],
    };

    const req = { userId: 1 };
    jest
      .spyOn(userService, 'findOne')
      .mockResolvedValue({ id: 1, isAdmin: false } as any);

    await expect(service.create(createBarberDto, req)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('deve encontrar todos os barbeiros', async () => {
    const barbers = [
      {
        id: 1,
        name: 'Barber 1',
        age: 30,
        hiringDate: new Date(),
        specialty: ['hair', 'beard'],
      },
      {
        id: 2,
        name: 'Barber 2',
        age: 25,
        hiringDate: new Date(),
        specialty: ['hair', 'beard'],
      },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(barbers as Barber[]);

    const result = await service.findAll();

    expect(result).toEqual(barbers);
  });

  it('deve encontrar um barbeiro pelo ID', async () => {
    const id = 1;
    const barber = {
      id,
      name: 'Test Barber',
      age: 30,
      hiringDate: new Date(),
      specialty: ['hair', 'beard'],
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(barber as Barber);

    const result = await service.findOne(id);

    expect(result).toEqual(barber);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
  });

  it('deve lançar exceção se barbeiro não for encontrado', async () => {
    const id = 1;

    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne(id)).rejects.toThrow(BadRequestException);
  });

  it('deve atualizar um barbeiro', async () => {
    const id = 1;
    const updateBarberDto: UpdateBarberDto = {
      name: 'Updated Barber',
      age: 35,
      hiringDate: new Date(),
      specialty: ['hair', 'beard'],
    };

    const req = { userId: 1 };
    const existingBarber = {
      id,
      name: 'Old Barber',
      age: 30,
      hiringDate: new Date(),
      specialty: ['hair', 'beard'],
    };

    jest
      .spyOn(userService, 'findOne')
      .mockResolvedValue({ id: 1, isAdmin: true } as any);
    jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(existingBarber as Barber);
    jest.spyOn(repository, 'update').mockResolvedValue(existingBarber as any);

    await service.update(id, updateBarberDto, req);

    expect(repository.update).toHaveBeenCalledWith(id, updateBarberDto);
  });

  it('deve lançar exceção se não for admin ao atualizar', async () => {
    const id = 1;
    const updateBarberDto: UpdateBarberDto = {
      name: 'Updated Barber',
      age: 35,
      hiringDate: new Date(),
      specialty: ['hair', 'beard'],
    };

    const req = { userId: 1 };

    jest
      .spyOn(userService, 'findOne')
      .mockResolvedValue({ id: 1, isAdmin: false } as any);

    await expect(service.update(id, updateBarberDto, req)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('deve remover um barbeiro', async () => {
    const id = 1;
    const req = { userId: 1 };

    jest
      .spyOn(userService, 'findOne')
      .mockResolvedValue({ id: 1, isAdmin: true } as any);
    jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue({ id, name: 'Test Barber' } as any);
    jest
      .spyOn(repository, 'delete')
      .mockResolvedValue({ affected: 1, raw: {} } as any);

    await service.remove(id, req);

    expect(repository.delete).toHaveBeenCalledWith(id);
  });

  it('deve lançar exceção se não for admin ao remover', async () => {
    const id = 1;
    const req = { userId: 1 };

    jest
      .spyOn(userService, 'findOne')
      .mockResolvedValue({ id: 1, isAdmin: false } as any);

    await expect(service.remove(id, req)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
