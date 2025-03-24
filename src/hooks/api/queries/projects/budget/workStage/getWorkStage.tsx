import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

export interface WorkStageType {
  _id: string;
  name: string;
}

// export interface ResponseType {
//   data: Budget;
// }

export const QUERY_KEY_WORKSTAGE = "getWorkStage";

const getWorkStage = async (
  projectId: string,
  params: Record<string, any> = {}
): Promise<WorkStageType> => {
  const response = await axiosInstance.get(`/workstage/${projectId}`, {
    params,
  });

  return response.data;
};

const useGetWorkStage = (projectId: string, params?: Record<string, any>) => {
  return useQuery<WorkStageType>({
    queryKey: [QUERY_KEY_WORKSTAGE, params, projectId],
    queryFn: () => getWorkStage(projectId, params),
    staleTime: 10,
  });
};

export default useGetWorkStage;
