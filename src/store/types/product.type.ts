export default interface Product {
    files: any;
    id?: number;
    name: string;
    type?: string;
    size?: string;
    price: number;
    catagoryId: number;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }
  