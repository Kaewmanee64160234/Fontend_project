import type Catagory from "./catagory";

export interface Topping{
    id?:number;
    name:string;
    price:number;
    category:Catagory;

} 