import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";
import { WorkStageType } from "./getWorkStage";

// export interface ResponseType {
//   data: WorkStageType[];
// }

export const QUERY_KEY_WORKSTAGEBYID = "getWorkStagebyId";

const getWorkStageById = async (
  workStageId: string,
  params: Record<string, any> = {}
): Promise<WorkStageType> => {
  const response = await axiosInstance.get(`/workstage/${workStageId}`, {
    params,
  });

  return response.data;
};

const useGetWorkStageById = (
  workStageId: string,
  params?: Record<string, any>
) => {
  return useQuery<WorkStageType>({
    queryKey: [QUERY_KEY_WORKSTAGEBYID, params, workStageId],
    queryFn: () => getWorkStageById(workStageId, params),
    staleTime: 10,
  });
};

export default useGetWorkStageById;
