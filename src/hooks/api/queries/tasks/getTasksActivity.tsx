import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

export interface ResponseType {
  data: TasksActType[];
}

export interface TasksActType {
  _id: string;
  name: string;
  description: string;
  companyId: {
    _id: string;
    name: string;
    ownerId: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  projectId: string;
  workStageId: string;
  budgetId: string;
  photos: any[];
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const QUERY_KEY_TASKACTIVITY = "getTasksActivity";

const getTasksActivity = async (
  projectId: string,
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(
    `/project-activities/project/${projectId}`,
    {
      params,
    }
  );

  return response.data;
};

const useGetTasksActivity = (
  projectId: string,
  params?: Record<string, any>
) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_TASKACTIVITY, params, projectId],
    queryFn: () => getTasksActivity(projectId, params),
    staleTime: 10,
  });
};

export default useGetTasksActivity;
