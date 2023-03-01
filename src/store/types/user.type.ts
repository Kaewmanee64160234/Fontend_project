export default interface User {
    id?: number;
    username: string;
    login: string;
    password: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }