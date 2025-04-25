import { container } from 'tsyringe';
import { CategoryRepository } from '../modules/category/repositories/CategoryRepository';
import { CategoryService } from '../modules/category/services/CategoryService';
import { UserRepositories } from '../modules/user/repositories/user.repository';
import { JwtService } from '../modules/auth/services/jwt.service';
import { BcryptService } from '../modules/auth/services/becrypt.service';
import { AuthService } from '../modules/auth/services/auth.service';


export const registerDependencies = (): void => {

  container.registerSingleton(CategoryRepository);
  container.registerSingleton(CategoryService);

  //User
  container.registerSingleton(UserRepositories);

  //Auth
  container.registerSingleton(JwtService);
  container.registerSingleton(BcryptService);
  container.registerSingleton(AuthService);
};