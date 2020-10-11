export interface LabourStats {
  providers?: ProviderLabourStats[];
  directContractors?: ProviderLabourStats[];
  total?: ProviderLabourStats[];
}

export interface ProviderLabourStats {
  providerId: number;
  name: string;
  rebatesTotal: number;
  grossPayTotal: number;
  workerCount: number;
  complianceStats?: {
    OpsEmpStatusChecked: number;
    Total: number;
    TaxStatus: number;
    Identification: number;
    RightToWork: number;
    OpsChecked: number;
    Contract: number;
    EmpStatusReview: number;
  };
  payrollAdminTotal: number| null;
  labourCostTotal: number;
}


