export interface  Material{
    id?: number;
    name: string;
    min_quantity: number;
    quantity: number;
    unit: number;
    price_per_unit: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}