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
    this.haveCredentials(createUserDto);
    this.validatePassword(createUserDto.password);
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
    await this.userFound(id);
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    this.haveCredentials(updateUserDto);
    const user = await this.userFound(id);
    updateUserDto.password && this.validatePassword(updateUserDto.password);
    const saltOrRounds = 10;

    const userUpdate = {
      ...updateUserDto,
      password: updateUserDto.password
        ? await bcrypt.hash(updateUserDto.password, saltOrRounds)
        : user.password,
    };
    return await this.userRepository.update(id, userUpdate);
  }

  async remove(id: number, req: any) {
    const user = await this.userFound(id);
    const userLogged = await this.userRepository.findOne({
      where: { id: req.userId },
    });

    if (user.id !== userLogged.id) {
      throw new BadRequestException('You can only delete your own account');
    }

    return await this.userRepository.delete(id);
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

  private async userFound(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private haveCredentials(credentialsDto: CreateUserDto | UpdateUserDto) {
    if (!credentialsDto) {
      throw new BadRequestException('Missing required fields');
    }
  }

  private validatePassword(password: string) {
    if (password.length < 8) {
      throw new BadRequestException('Password must have at least 8 characters');
    }
  }
}
