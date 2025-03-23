import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

export interface ResponseType {
  data: ProjectType[];
}

export interface ProjectType {
  _id: string;
  name: string;
  description: string;
  companyId: CompanyID;
  managerId: string;
  ownerId: string;
  photos: string[];
  location: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  budgetId?: BudgetID;
}

export interface BudgetID {
  _id: string;
  name: string;
  description: string;
  companyId: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface CompanyID {
  _id: string;
  name: string;
  ownerId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export const QUERY_KEY_PROJECT = "getProject";

const getProject = async (
  companyId: string,
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(`/projects/company/${companyId}`, {
    params,
  });

  return response.data;
};

const usegetProject = (companyId: string, params?: Record<string, any>) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_PROJECT, params, companyId],
    queryFn: () => getProject(companyId, params),
    staleTime: 10,
  });
};

export default usegetProject;
