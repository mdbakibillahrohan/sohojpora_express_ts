import { DataSource } from 'typeorm';
import { config } from '../config/config';
import { UserType } from '../entities/user-type.entity';
import { Gender } from '../entities/gender.entity';
import { User } from '../entities/user.entity';
import { Country } from '../entities/country.entity';
import { District } from '../entities/district.entity';
import { InstituteType } from '../entities/institute-type.entity';
import { Institute } from '../entities/institute.entity';
import { Upazilla } from '../entities/upazilla.entity';
import { UserDevice } from '../entities/user-device.entity';
import { UserInstituteInfo } from '../entities/user-institute-info.entity';
import { UserLoginHistory } from '../entities/user-login-history.entity';
import { UserOtpHistory } from '../entities/user-otp-history.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  entities: [UserType, Gender, User, Country, District, InstituteType, Institute, Upazilla, UserDevice, UserInstituteInfo, UserLoginHistory, UserOtpHistory],
  migrations: ['dist/migrations/*.js'],
  synchronize: true, // Use migrations instead
  logging: false, // Enable logging for development
});

