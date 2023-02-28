export default interface Product {
    id?: number;
    name: string;
    type: string;
    size: string;
    price: number;
    img: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }
  