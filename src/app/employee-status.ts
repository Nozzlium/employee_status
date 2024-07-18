export interface EmployeeStatus {
  createdAt: number;
  createdBy: string | null;
  duration: number | null;
  employeeStatusName: string;
  employeeStatusType: string;
  id: string;
  isPKWTCompensation: boolean | null;
  isProbation: boolean | null;
  isUsed: boolean;
  updatedAt: number | null;
  updatedBy: string | null;
}
