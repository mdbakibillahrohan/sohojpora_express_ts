import { DataSource } from 'typeorm';
import { config } from '../config/config';
import { UserType } from '../entities/user-type.entity';
import { Gender } from '../entities/gender.entity';
import { User } from '../entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  entities: [UserType, Gender, User],
  migrations: ['dist/migrations/*.js'],
  synchronize: true, // Use migrations instead
  logging: false, // Enable logging for development
});

