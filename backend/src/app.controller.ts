// import { Controller, Post } from '@nestjs/common';
// import { IsPublic } from './modules/auth/decorators/public.decorator';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './modules/user/entities/user.entity';
// import { Repository } from 'typeorm';
// import { UserService } from './modules/user/user.service';

// @Controller()
// export class AppController {
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//     private readonly userService: UserService,
//   ) {}

//   @IsPublic()
//   @Post()
//   async create() {
//     const admin = await this.userRepository.findOne({
//       where: { email: 'admin@example.com' },
//     });

//     if (!admin) {
//       await this.userService.create({
//         name: 'Admin User',
//         email: 'admin@example.com',
//         password: 'adminpassword',
//         isAdmin: true,
//       });
//     }
//   }
// }
