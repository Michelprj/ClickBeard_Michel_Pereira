import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDataBarbers1722298029767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO barber (name, age, hiring_date, specialty) VALUES
        ('Barber 1', 25, '2024-07-31T21:00:00.339Z', '{hair, beard}'),
        ('Barber 2', 30, '2024-07-31T21:00:00.339Z', '{hair, beard, eyebrow}'),
        ('Barber 3', 35, '2024-07-31T21:00:00.339Z', '{hair, eyebrow}'),
        ('Barber 4', 40, '2024-07-31T21:00:00.339Z', '{hair}');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM barber WHERE name = 'Barber 1';
        DELETE FROM barber WHERE name = 'Barber 2';
        DELETE FROM barber WHERE name = 'Barber 3';
        DELETE FROM barber WHERE name = 'Barber 4';
    `);
  }
}
