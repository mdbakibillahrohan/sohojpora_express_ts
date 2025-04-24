import { Category } from "../entities/Category";

export interface CreateCategoryDTO {
  name: string;
  description?: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
}

export class CategoryResponseDTO {
  category:Category;
  constructor(category: Category) {
    this.category = category;
  }
}