import type Employee from "./employee.type";

export interface CheckInOut {
      id?: number;
      date: Date;
      time_in: Date;
      time_out: Date;
      employeeId: number;
      total_hour: number;
      employee?: Employee;
    //   summary_salary?: SummarySalary;
      createdDate?: Date;
      updatedDate?: Date;
      deletedDate?: Date;
    


}