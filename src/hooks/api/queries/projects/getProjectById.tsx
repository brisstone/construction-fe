import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";


export interface ProjectType {
  _id: string;
  name: string;
  description: string;
  // projectId: CompanyID;
  managerId: string;
  ownerId: string;
  photos: string[];
  location: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  // budgetId?: BudgetID;
}


export const QUERY_KEY_PROJECT = "getProjectById";

const getProjectById = async (
  projectId: string,
  params: Record<string, any> = {}
): Promise<ProjectType> => {
  const response = await axiosInstance.get(`/projects/${projectId}`, {
    params,
  });

  return response.data;
};

const usegetProjectById = (projectId: string, params?: Record<string, any>) => {
  return useQuery<ProjectType>({
    queryKey: [QUERY_KEY_PROJECT, params, projectId],
    queryFn: () => getProjectById(projectId, params),
    staleTime: 10,
  });
};

export default usegetProjectById;
