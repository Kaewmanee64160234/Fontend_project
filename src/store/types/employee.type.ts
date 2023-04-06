import type { CheckInOut } from "./CheckInOut";

export default interface  Employee{
    id?:number;
    name:string;
    address:string;
    tel:string;
    email: string;
    position: string;
    hourly:number;
    image?:string;
    fullTime?:boolean;
    salary:number;
    check_in_outs:CheckInOut[];
    createdAt?:Date;
    updateAt?:Date;
    deleteAt?:Date;
 }
 
