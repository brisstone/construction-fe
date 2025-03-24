import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";


export interface Budget {
  _id: string;
  name: string;
  description: string;
  companyId: string;
  projectId: {
    _id: string;
    name: string;
    description: string;
    companyId: string;
    managerId: string;
    ownerId: string;
    photos: any[];
    location: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    budgetId: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// export interface ResponseType {
//   data: Budget;
// }

export const QUERY_KEY_BUDGET = "getBudget";

const getBudget = async (
  projectId: string,
  params: Record<string, any> = {}
): Promise<Budget> => {
  const response = await axiosInstance.get(`/budget/project/${projectId}`, {
    params,
  });

  return response.data;
};

const usegetBudget = (projectId: string, params?: Record<string, any>) => {
  return useQuery<Budget>({
    queryKey: [QUERY_KEY_BUDGET, params, projectId],
    queryFn: () => getBudget(projectId, params),
    staleTime: 10,
  });
};

export default usegetBudget;
