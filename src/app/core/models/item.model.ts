export interface Item {
  //[key: string]: string | number;
  id: number;
  code: string;
  name: string;
  price: number;
  primary_image: string;
  tag: string;
  category: Array<string>;
  images: Array<string>;
  attributes: Array<string>;
  description?: string;
}

export interface ItemObject {
  data: Item[];
  loading: boolean;
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}
