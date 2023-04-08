import type CheckMaterialDetail from "./checkmaterialdetail";

export default interface CheckMaterial {
    id?: number;
    date?: Date;
    time?: Date;
    employeeId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    checkMaterialDetails?: CheckMaterialDetail[];
}