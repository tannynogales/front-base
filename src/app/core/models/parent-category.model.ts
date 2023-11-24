import { Seo } from './seo.model';

export interface ParentCategory {
  id: number;
  name: string;
  slug: string;
  seo?: Seo; // TODO: debería ser obligatorio?
}

export interface ParentCategoryObject {
  data: ParentCategory[];
  loading: boolean;
}
