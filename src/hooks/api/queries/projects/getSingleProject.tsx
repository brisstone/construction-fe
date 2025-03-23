import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

// export interface ResponseType {
//   data: ProjectType;
// }

export interface SingleProjectType {
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
}

export const QUERY_KEY_SINGLEPROJECT = "getSingleProject";

const getSingleProject = async (
  projectId: string,
  params: Record<string, any> = {}
): Promise<SingleProjectType> => {
  const response = await axiosInstance.get(`/projects/${projectId}`, {
    params,
  });

  return response.data;
};

const useGetSingleProject = (
  projectId: string,
  params?: Record<string, any>
) => {
  return useQuery<SingleProjectType>({
    queryKey: [QUERY_KEY_SINGLEPROJECT, params, projectId],
    queryFn: () => getSingleProject(projectId, params),
    staleTime: 10,
    enabled: !!projectId,
  });
};

export default useGetSingleProject;
