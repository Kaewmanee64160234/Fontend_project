export default interface BILL_DETAIL{
    id?: number;
    name: string;
    amount: number;
    price: number;
    total: number;
    materialId?: number;
    billId?: number;
    createdDate?: Date;
    updatedDate?: Date; 
    deletedDate?: Date;

}