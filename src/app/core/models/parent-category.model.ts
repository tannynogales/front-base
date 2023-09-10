export interface ParentCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ParentCategoryObject {
  data: ParentCategory[];
  loading: boolean;
}
