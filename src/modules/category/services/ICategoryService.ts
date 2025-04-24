export abstract class ICategoryService {
  abstract createCategory(data: any): Promise<any>;
  abstract getAllCategories(): Promise<any[]>;
  abstract getCategoryById(id: number): Promise<any | null>;
  abstract updateCategory(id: number, data: any): Promise<any | null>;
  abstract deleteCategory(id: number): Promise<boolean>;
}