import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingService } from '../../../../src/modules/booking/booking.service';
import { Booking } from '../../../../src/modules/booking/entities/booking.entity';
import { UserService } from '../../../../src/modules/user/user.service';
import { BarberService } from '../../../../src/modules/barber/barber.service';
import { CreateBookingDto } from '../../../../src/modules/booking/dto/create-booking.dto';
import { UpdateBookingDto } from '../../../../src/modules/booking/dto/update-booking.dto';
import { BadRequestException } from '@nestjs/common';

describe('BookingService', () => {
  let service: BookingService;
  let repository: Repository<Booking>;
  let userService: UserService;
  let barberService: BarberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        UserService,
        BarberService,
        {
          provide: getRepositoryToken(Booking),
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
        {
          provide: BarberService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
    repository = module.get<Repository<Booking>>(getRepositoryToken(Booking));
    userService = module.get<UserService>(UserService);
    barberService = module.get<BarberService>(BarberService);
  });

  it('deve criar um agendamento', async () => {
    const createBookingDto: CreateBookingDto = {
      time: new Date('2024-08-01T10:00:00'),
      specialtyType: ['hair', 'beard'],
      isConfirmed: true,
    };

    const req = { userId: 1 };
    const barberId = '1';
    const user = { id: 1, name: 'Test User' };
    const barber = { id: 1, name: 'Test Barber' };
    const barberServices = [];

    jest.spyOn(userService, 'findOne').mockResolvedValue(user as any);
    jest.spyOn(barberService, 'findOne').mockResolvedValue(barber as any);
    jest
      .spyOn(service, 'findAllByBarber')
      .mockResolvedValue(barberServices as any);
    jest.spyOn(repository, 'save').mockResolvedValue(createBookingDto as any);

    const result = await service.create(createBookingDto, barberId, req);

    expect(result).toEqual(createBookingDto);
    expect(repository.save).toHaveBeenCalledWith({
      ...createBookingDto,
      specialtyType: createBookingDto.specialtyType,
      users: user,
      barber,
    });
  });

  it('deve lançar exceção se o horário de agendamento for fora do expediente', async () => {
    const createBookingDto: CreateBookingDto = {
      time: new Date('2024-08-01T07:00:00'),
      specialtyType: ['hair', 'beard'],
      isConfirmed: true,
    };

    const req = { userId: 1 };
    const barberId = '1';
    const user = { id: 1, name: 'Test User' };
    const barber = { id: 1, name: 'Test Barber' };

    jest.spyOn(userService, 'findOne').mockResolvedValue(user as any);
    jest.spyOn(barberService, 'findOne').mockResolvedValue(barber as any);

    await expect(
      service.create(createBookingDto, barberId, req),
    ).rejects.toThrow(BadRequestException);
  });

  it('deve encontrar todos os agendamentos', async () => {
    const bookings = [
      {
        id: 1,
        time: new Date('2024-08-01T10:00:00'),
        specialtyType: ['hair', 'beard'],
        isConfirmed: true,
      },
      {
        id: 2,
        time: new Date('2024-08-01T11:00:00'),
        specialtyType: ['hair', 'beard'],
        isConfirmed: true,
      },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(bookings as any);

    const result = await service.findAll();

    expect(result).toEqual(bookings);
  });

  it('deve encontrar um agendamento pelo ID', async () => {
    const id = 1;
    const booking = {
      id,
      time: new Date('2024-08-01T10:00:00'),
      specialtyType: ['hair', 'beard'],
      isConfirmed: true,
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(booking as any);

    const result = await service.findOne(id);

    expect(result).toEqual(booking);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id },
      relations: ['users', 'barber'],
    });
  });

  it('deve lançar exceção se agendamento não for encontrado', async () => {
    const id = 1;

    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne(id)).rejects.toThrow(BadRequestException);
  });

  it('deve atualizar um agendamento', async () => {
    const id = 1;
    const updateBookingDto: UpdateBookingDto = {
      time: new Date('2024-08-01T10:00:00'),
      specialtyType: ['hair', 'beard'],
      isConfirmed: true,
    };

    jest.spyOn(repository, 'update').mockResolvedValue(updateBookingDto as any);

    await service.update(id, updateBookingDto);

    expect(repository.update).toHaveBeenCalledWith(id, updateBookingDto);
  });

  it('deve remover um agendamento', async () => {
    const id = 1;

    jest
      .spyOn(repository, 'delete')
      .mockResolvedValue({ affected: 1, raw: {} } as any);

    await service.remove(id);

    expect(repository.delete).toHaveBeenCalledWith(id);
  });

  it('deve cancelar um agendamento', async () => {
    const id = 1;
    const booking = {
      isConfirmed: false,
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(booking as any);
    jest
      .spyOn(repository, 'update')
      .mockResolvedValue({ ...booking, isConfirmed: false } as any);

    const result = await service.cancelBooking(id);

    expect(result).toEqual({ ...booking, isConfirmed: false });
    expect(repository.update).toHaveBeenCalledWith(id, {
      isConfirmed: false,
    });
  });
});
