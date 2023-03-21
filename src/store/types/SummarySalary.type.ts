import type { CheckInOut } from "./CheckInOut";
import type Employee from "./employee.type";

export interface SummarySalary {
  id?: number;
  ss_date?: Date;
  hour?: number;
  salary?: number;
  checkInOut?: CheckInOut[];

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;
  employee?: Employee
}
