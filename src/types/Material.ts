export default interface Material {
    id?:number;
    name:string;
    minquantity: number;
    quantity: number;
    unit: number;
    price_per_unit: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}