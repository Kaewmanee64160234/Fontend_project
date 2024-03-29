import type DetailProduct from "./detailProducr";
import type detailProduct from "./detailProducr";

export default interface Product {
    files: any;
    id?: number;
    name: string;
    type?: string;
    size?: string;
    price: number;
    category: string | number;
    catagoryId: number;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }
  