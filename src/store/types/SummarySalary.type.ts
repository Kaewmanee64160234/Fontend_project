import type { CheckInOut } from "./CheckInOut";

export interface SummarySalary {
  id?: number;
  ss_date?: Date;
  hour?: number;
  salary?: number;
  checkInOut?: CheckInOut[];

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;
}
