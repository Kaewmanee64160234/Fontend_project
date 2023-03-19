import type BILL_DETAIL from "./billdetail";

export default interface BILL{
    id?: number;
    name: string;
    date: Date;
    time: Date;
    total: number;
    buy: number;
    change: number;
    employeeId?: number;
    bill_detail?: BILL_DETAIL[];
    createdDate?: Date;
    updatedDate?: Date; 
    deletedDate?: Date;

}