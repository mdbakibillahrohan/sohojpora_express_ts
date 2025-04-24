import { container } from 'tsyringe';
import { CategoryRepository } from '../modules/category/repositories/CategoryRepository';
import { CategoryService } from '../modules/category/services/CategoryService';
import { UserRepositories } from '../modules/user/repositories/UserRepositories';


export const registerDependencies = (): void => {
  container.registerSingleton(CategoryRepository);
  container.registerSingleton(CategoryService);

  container.registerSingleton(UserRepositories);
};