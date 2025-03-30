import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

export interface BudgetMetrics {
  data: {
    totalBudgetCost: number;
    totalUnits: number;
  };
}

export const QUERY_KEY_BUDGET = "getBudgetMetrics";

const getBudgetMetrics = async (
  projectId: string,
  params: Record<string, any> = {}
): Promise<BudgetMetrics> => {
  const response = await axiosInstance.get(
    `/budget/${projectId}/budget-metrics`,
    {
      params,
    }
  );

  return response.data;
};

const usegetBudgetMetrics = (
  projectId: string,
  params?: Record<string, any>
) => {
  return useQuery<BudgetMetrics>({
    queryKey: [QUERY_KEY_BUDGET, params, projectId],
    queryFn: () => getBudgetMetrics(projectId, params),
    staleTime: 10,
  });
};

export default usegetBudgetMetrics;
