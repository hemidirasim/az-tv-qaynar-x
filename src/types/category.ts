
export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CategoryResponse {
  success: boolean;
  data: {
    categories: Category[];
  };
}
