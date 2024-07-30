import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from '../../../../src/modules/booking/booking.controller';
import { BookingService } from '../../../../src/modules/booking/booking.service';
import { CreateBookingDto } from '../../../../src/modules/booking/dto/create-booking.dto';
import { UpdateBookingDto } from '../../../../src/modules/booking/dto/update-booking.dto';
import { Booking } from 'src/modules/booking/entities/booking.entity';

describe('BookingController', () => {
  let controller: BookingController;
  let service: BookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        {
          provide: BookingService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            cancelBooking: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BookingController>(BookingController);
    service = module.get<BookingService>(BookingService);
  });

  it('deve criar uma reserva', async () => {
    const createBookingDto: CreateBookingDto = {
      time: new Date('2024-08-01T10:00:00'),
      specialtyType: ['hair', 'beard'],
      isConfirmed: true,
    };
    const barberId = '1';
    const req = { userId: 1 };

    jest
      .spyOn(service, 'create')
      .mockResolvedValue(createBookingDto as Booking);

    expect(await controller.create(createBookingDto, barberId, req)).toBe(
      createBookingDto,
    );
    expect(service.create).toHaveBeenCalledWith(
      createBookingDto,
      barberId,
      req,
    );
  });

  it('deve encontrar todas as reservas', async () => {
    const result = [
      {
        id: 1,
        time: new Date('2024-08-01T10:00:00'),
        specialtyType: ['hair', 'beard'],
        isConfirmed: true,
        barber: {},
        users: {},
      },
      {
        id: 2,
        time: new Date('2024-08-01T10:00:00'),
        specialtyType: ['hair', 'beard'],
        isConfirmed: true,
        barber: {},
        users: {},
      },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(result as Booking[]);

    expect(await controller.findAll()).toBe(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('deve encontrar uma reserva pelo ID', async () => {
    const id = '1';
    const result = {
      id: 1,
      time: new Date('2024-08-01T10:00:00'),
      specialtyType: ['hair', 'beard'],
      isConfirmed: true,
      barber: {},
      users: {},
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(result as Booking);

    expect(await controller.findOne(id)).toBe(result);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('deve atualizar uma reserva', async () => {
    const id = '1';
    const updateBookingDto: UpdateBookingDto = {
      time: new Date('2024-08-01T10:00:00'),
      specialtyType: ['hair', 'beard'],
      isConfirmed: true,
    };

    jest.spyOn(service, 'update').mockResolvedValue(undefined);

    expect(await controller.update(id, updateBookingDto)).toBeUndefined();
    expect(service.update).toHaveBeenCalledWith(+id, updateBookingDto);
  });

  it('deve remover uma reserva', async () => {
    const id = '1';

    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove(id)).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(+id);
  });

  it('deve cancelar uma reserva', async () => {
    const id = '1';

    jest.spyOn(service, 'cancelBooking').mockResolvedValue(undefined);

    expect(await controller.confirmBooking(id)).toBeUndefined();
    expect(service.cancelBooking).toHaveBeenCalledWith(+id);
  });
});
