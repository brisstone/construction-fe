import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

export interface ResponseType {
  data: any[];
}

export const QUERY_KEY_PROJACTIVITY = "getProjectActivity";

const getProjectActivity = async (
  workStageId: string,
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(
    `/project-activities/workstage/${workStageId}`,
    {
      params,
    }
  );

  return response.data;
};

const useGetProjectActivity = (
  workStageId: string,
  params?: Record<string, any>
) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_PROJACTIVITY, params, workStageId],
    queryFn: () => getProjectActivity(workStageId, params),
    staleTime: 10,
  });
};

export default useGetProjectActivity;
