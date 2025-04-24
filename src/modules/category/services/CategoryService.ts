import { injectable } from 'tsyringe';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { Category } from '../entities/Category';
import { CategoryResponseDTO, UpdateCategoryDTO } from '../dtos/CategoryDTOs';
import { BadRequestException, NotFoundException } from '../../../core/AppError';


@injectable()
export class CategoryService {
  constructor(private repository: CategoryRepository) { }

  async createCategory(data: Category): Promise<CategoryResponseDTO> {
    if (!data.name) {
      throw new BadRequestException('Category name is required');
    }
    const category = await this.repository.createCategory(data);
    return new CategoryResponseDTO(category);
  }

  async getAllCategories(): Promise<CategoryResponseDTO[]> {
    const categories = await this.repository.getAllCategories();
    return categories.map(category => new CategoryResponseDTO(category));
  }

  async getCategoryById(id: number): Promise<CategoryResponseDTO> {
    const category = await this.repository.getCategoryById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return new CategoryResponseDTO(category);
  }

  async updateCategory(id: number, data: UpdateCategoryDTO): Promise<CategoryResponseDTO> {
    const category = await this.repository.updateCategory(id, data);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return new CategoryResponseDTO(category);
  }

  async deleteCategory(id: number): Promise<void> {
    const success = await this.repository.deleteCategory(id);
    if (!success) {
      throw new NotFoundException('Category not found');
    }
  }
}