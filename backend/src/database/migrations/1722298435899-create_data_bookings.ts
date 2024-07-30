import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDataBookings1722298435899 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO booking (time, specialty_type, user_id, barber_id ) VALUES 
      ('2024-07-31T09:00:00.339Z', '{hair}', 1, 1),
      ('2024-07-31T10:00:00.339Z', '{hair, beard}', 2, 2),
      ('2024-07-31T11:00:00.339Z', '{hair, eyebrow}', 2, 3),
      ('2024-07-31T12:00:00.339Z', '{hair}', 2, 4);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM booking WHERE time = '2024-07-31T09:00:00.339Z';
      DELETE FROM booking WHERE time = '2024-07-31T10:00:00.339Z';
      DELETE FROM booking WHERE time = '2024-07-31T11:00:00.339Z';
      DELETE FROM booking WHERE time = '2024-07-31T12:00:00.339Z';
    `);
  }
}
