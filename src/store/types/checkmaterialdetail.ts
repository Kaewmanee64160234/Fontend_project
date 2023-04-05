export default interface CheckMaterialDetail {
  id?: number;
  name: string;
  qty_last: number;
  qty_remain: number;
  qty_expire: number;
  materialId: number;
  checkmaterialID: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}