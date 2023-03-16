export default interface User {
    id?: number;
    username: string;
    login: string;
    password: string;
    role: string;
    image?:string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }