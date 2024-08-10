import { ProductType } from "./product-type.enum";

export interface Product{
  id: number;
  title: String;
  type: ProductType;
  amount: number;
  code: number;
}
