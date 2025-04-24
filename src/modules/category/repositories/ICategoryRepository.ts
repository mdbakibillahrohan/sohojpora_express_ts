export abstract class ICategoryRepository {
  abstract createCategory(data: Partial<any>): Promise<any>;
  abstract getAllCategories(): Promise<any[]>;
  abstract getCategoryById(id: number): Promise<any | null>;
  abstract updateCategory(id: number, data: Partial<any>): Promise<any | null>;
  abstract deleteCategory(id: number): Promise<boolean>;
}