import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class CreateData1722294231322 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const saltRounds = 10;
    const adminPassword = await bcrypt.hash('adminpass', saltRounds);
    const userPassword = await bcrypt.hash('userpass', saltRounds);

    await queryRunner.query(`
      INSERT INTO users (name, email, password, is_admin) VALUES 
      ('Admin', 'admin@example.com', '${adminPassword}', true),
      ('User Test', 'user@example.com', '${userPassword}', false);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM users WHERE email = 'admin@example.com';
      DELETE FROM users WHERE email = 'user@example.com';
    `);
  }
}
