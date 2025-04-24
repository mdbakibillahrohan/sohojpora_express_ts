import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { Category } from '../entities/Category';
import { AppDataSource } from '../../../infrastructure/data-source';

@injectable()
export class CategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async createCategory(data: Partial<Category>): Promise<Category> {
    const category = this.repository.create(data);
    return await this.repository.save(category);
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.repository.find();
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return await this.repository.findOneBy({ id });
  }

  async updateCategory(id: number, data: Partial<Category>): Promise<Category | null> {
    const category = await this.getCategoryById(id);
    if (!category) return null;
    Object.assign(category, data);
    return await this.repository.save(category);
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}