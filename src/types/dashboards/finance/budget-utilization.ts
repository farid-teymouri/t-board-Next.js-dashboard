export interface BudgetUtilizationItem {
  id: number;
  name: string;
  spent: number;
  budget: number;
  progress: number;
}

export interface BudgetUtilizationAlert {
  message: string;
  percentage: number;
}

export interface BudgetUtilizationResponse {
  items: BudgetUtilizationItem[];
  alert: BudgetUtilizationAlert;
}
