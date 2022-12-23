import { Product } from '../common/product';

export interface Category {
  id: number;
  categoryName: string;
  products: Product[];
}
