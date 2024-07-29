import { MigrationInterface, QueryRunner } from 'typeorm';

export class Database1722278669529 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE
      );

      CREATE TABLE barber (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age integer NOT NULL,
        hiring_date DATE NOT NULL,
        specialty TEXT[] NOT NULL
      );

      CREATE TABLE booking (
        id SERIAL PRIMARY KEY,
        time TIMESTAMP NOT NULL,
        specialty_type TEXT[] NOT NULL,
        user_id integer,
        barber_id integer,
        is_confirmed BOOLEAN DEFAULT TRUE,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (barber_id) REFERENCES barber(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE booking;
      DROP TABLE barber;
      DROP TABLE users;
    `);
  }
}
