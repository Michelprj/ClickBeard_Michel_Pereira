import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBookingTable1722291208121 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE booking
          ALTER COLUMN specialty_type TYPE text[] USING specialty_type::text[];
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE booking
        ALTER COLUMN specialty_type TYPE varchar(255)[];
    `);
  }
}
