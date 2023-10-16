export interface ShoppingCartItem {
  id?: number; // Backend ID, used for update
  productId: number;
  url: string;
  name: string;
  price: number;
  primary_image: string;
  quantity: number;
}

export interface ShoppingCartObject {
  products: ShoppingCartItem[];
  totalBruto: number;
  IVA: number;
  totalNeto: number;
  totalProducts: number;
}
