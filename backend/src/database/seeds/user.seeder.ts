import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Users } from 'src/modules/user/entities/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const repository = dataSource.getRepository(Users);
    const userCreated = await repository.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: await bcrypt.hash('adminpassword', 10),
      isadmin: true,
    });

    await repository.save(userCreated);

    const userFactory = factoryManager.get(Users);
    await userFactory.save();
    await userFactory.saveMany(5);
  }
}
