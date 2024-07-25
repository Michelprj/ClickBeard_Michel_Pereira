import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto) {
      throw new BadRequestException('Missing required fields');
    }

    await this.checkEmailUnique(createUserDto.email);

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const user = {
      ...createUserDto,
      password: hashedPassword,
    };

    await this.userRepository.save(user);

    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} use. ${updateUserDto}`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private async checkEmailUnique(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      throw new ConflictException('Email already in use');
    }
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
