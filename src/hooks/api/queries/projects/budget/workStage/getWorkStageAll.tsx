import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";
import { WorkStageType } from "./getWorkStage";

export interface ResponseType {
  data: WorkStageType[];
}

export const QUERY_KEY_WORKSTAGEALL = "getWorkStageAll";

const getWorkStageAll = async (
  projectId: string,
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(
    `/workstage/project/${projectId}`,
    {
      params,
    }
  );

  return response.data;
};

const useGetWorkStageAll = (
  projectId: string,
  params?: Record<string, any>
) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_WORKSTAGEALL, params, projectId],
    queryFn: () => getWorkStageAll(projectId, params),
    staleTime: 10,
  });
};

export default useGetWorkStageAll;
