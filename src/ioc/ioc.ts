import { container } from 'tsyringe';
import { CategoryRepository } from '../modules/category/repositories/CategoryRepository';
import { CategoryService } from '../modules/category/services/CategoryService';
import { UserRepositories } from '../modules/user/repositories/user.repository';
import { JwtService } from '../modules/auth/services/jwt.service';
import { BcryptService } from '../modules/auth/services/becrypt.service';
import { AuthService } from '../modules/auth/services/auth.service';
import { UserTypeRepository } from '../modules/user/repositories/user-type.repository';
import { UserTypeService } from '../modules/user/services/user-type/user-type.service';
import { UserLoginHistoryRepository } from '../modules/user/repositories/user-login-history.repository';


export const registerDependencies = (): void => {

  container.registerSingleton(CategoryRepository);
  container.registerSingleton(CategoryService);

  //User
  container.registerSingleton(UserRepositories);
  
  container.registerSingleton(UserTypeRepository);
  container.registerSingleton(UserTypeService);

  container.registerSingleton(UserLoginHistoryRepository);

  //Auth
  container.registerSingleton(JwtService);
  container.registerSingleton(BcryptService);
  container.registerSingleton(AuthService);
};