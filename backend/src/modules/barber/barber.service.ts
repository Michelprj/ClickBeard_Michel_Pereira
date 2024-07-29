import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBarberDto } from './dto/create-barber.dto';
import { UpdateBarberDto } from './dto/update-barber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Barber } from './entities/barber.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class BarberService {
  constructor(
    @InjectRepository(Barber)
    private readonly barberRepository: Repository<Barber>,
    private readonly userService: UserService,
  ) {}

  async create(createBarberDto: CreateBarberDto, req: any) {
    this.haveCredentials(createBarberDto);
    await this.isAdminLogged(req, 'register');
    return await this.barberRepository.save(createBarberDto);
  }

  async findAll() {
    return await this.barberRepository.find();
  }

  async findOne(id: number) {
    const barber = await this.barberRepository.findOne({ where: { id } });

    if (!barber) {
      throw new BadRequestException('Barber not found');
    }

    return barber;
  }

  async update(id: number, updateBarberDto: UpdateBarberDto, req: any) {
    this.haveCredentials(updateBarberDto);
    await this.isAdminLogged(req, 'update');
    await this.barberFound(id);
    await this.barberRepository.update(id, updateBarberDto);
  }

  async remove(id: number, req: any) {
    await this.isAdminLogged(req, 'remove');
    await this.barberFound(id);
    await this.barberRepository.delete(id);
  }

  private async isAdminLogged(req: any, method: string) {
    const userLogged = await this.userService.findOne(req.userId);

    if (!userLogged.isAdmin) {
      throw new UnauthorizedException(
        `Only the administrator can ${method} new barbers`,
      );
    }
  }

  private haveCredentials(credentialsDto: CreateBarberDto | UpdateBarberDto) {
    if (!credentialsDto) {
      throw new BadRequestException('Missing required fields');
    }
  }

  private async barberFound(id: number) {
    const barber = await this.findOne(id);

    if (!barber) {
      throw new BadRequestException('Barber not found');
    }
  }
}
