export default interface Store {
    id?: number;
    name: string;
    address: string;
    tel: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }