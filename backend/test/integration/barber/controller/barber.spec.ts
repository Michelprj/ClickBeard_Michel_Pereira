import { Test, TestingModule } from '@nestjs/testing';
import { BarberController } from '../../../../src/modules/barber/barber.controller';
import { BarberService } from '../../../../src/modules/barber/barber.service';
import { CreateBarberDto } from '../../../../src/modules/barber/dto/create-barber.dto';
import { UpdateBarberDto } from '../../../../src/modules/barber/dto/update-barber.dto';
import { Barber } from '../../../../src/modules/barber/entities/barber.entity';

describe('BarberController', () => {
  let controller: BarberController;
  let service: BarberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BarberController],
      providers: [
        {
          provide: BarberService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BarberController>(BarberController);
    service = module.get<BarberService>(BarberService);
  });

  it('deve criar um barbeiro', async () => {
    const createBarberDto: CreateBarberDto = {
      name: 'Test Barber',
      age: 30,
      hiringDate: new Date(),
      specialty: ['hair', 'beard'],
    };
    const req = { userId: 1 };

    jest.spyOn(service, 'create').mockResolvedValue(createBarberDto as Barber);

    expect(await controller.create(createBarberDto, req)).toBe(createBarberDto);
    expect(service.create).toHaveBeenCalledWith(createBarberDto, req);
  });

  it('deve encontrar todos os barbeiros', async () => {
    const result = [
      {
        id: 1,
        name: 'Test Barber',
        age: 30,
        hiringDate: new Date(),
        specialty: ['hair', 'beard'],
      },
      {
        id: 2,
        name: 'Test Barber 2',
        age: 40,
        hiringDate: new Date(),
        specialty: ['hair', 'beard'],
      },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(result as Barber[]);

    expect(await controller.findAll()).toBe(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('deve encontrar um barbeiro pelo ID', async () => {
    const id = '1';
    const result = {
      id: 1,
      name: 'Test Barber',
      age: 30,
      hiringDate: new Date(),
      specialty: ['hair', 'beard'],
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(result as Barber);

    expect(await controller.findOne(id)).toBe(result);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('deve atualizar um barbeiro', async () => {
    const id = '1';
    const updateBarberDto: UpdateBarberDto = {
      name: 'Test Barber',
      age: 30,
      hiringDate: new Date(),
      specialty: ['hair', 'beard'],
    };
    const req = { userId: 1 };

    jest.spyOn(service, 'update').mockResolvedValue(undefined);

    expect(await controller.update(id, updateBarberDto, req)).toBeUndefined();
    expect(service.update).toHaveBeenCalledWith(+id, updateBarberDto, req);
  });

  it('deve remover um barbeiro', async () => {
    const id = '1';
    const req = { userId: 1 };

    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove(id, req)).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(+id, req);
  });
});
