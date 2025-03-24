import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

export interface ResponseType {
  data: WorkStageType[];
}

export interface WorkStageType {
  _id: string;
  name: string;
  description: string;
  companyId: string;
  projectId: string;
  stageType: string;
  projectLabors: ProjectLaborType[];
  projectMaterials: ProjectMaterialType[];
  projectActivities: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProjectLaborType {
  _id: string;
  description: string;
  companyId: string;
  workStageId: string;
  projectId: string;
  budgetId: string;
  laborId: LaborIdType;
  unitId: UnitIdType;
  quantity: number;
  rate: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMaterialType {
  _id: string;
  description: string;
  materialType: string;
  companyId: string;
  workStageId: string;
  materialId: MaterialIdType;
  projectId: string;
  budgetId: string;
  unitId: UnitIdType;
  quantity: number;
  rate: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface LaborIdType {
  _id: string;
  name: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UnitIdType {
  _id: string;
  name: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface MaterialIdType {
  _id: string;
  name: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const QUERY_KEY_WORKSTAGE = "getWorkStage";

const getWorkStage = async (
  projectId: string,
  stageType: string,
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(
    `/workstage/${projectId}/${stageType}`,
    {
      params,
    }
  );

  return response.data;
};

const useGetWorkStage = (
  projectId: string,
  stageType: string,
  params?: Record<string, any>
) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_WORKSTAGE, params, projectId, stageType],
    queryFn: () => getWorkStage(projectId, stageType, params),
    staleTime: 10,
  });
};

export default useGetWorkStage;
