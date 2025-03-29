import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";
export interface ResponseType {
  data: {
    totalProperties: number;
    soldProperties: number;
    availableProperties: number;
    totalExpectedAmount: number;
    totalAmountPaid: number;
    totalExpectedBalance: number;
  };
}

export const QUERY_KEY_PROPERTY = "getPropertyMetrics";

const getPropertyMetrics = async (
  projectId: string,
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(`/projects/${projectId}/metrics`, {
    params,
  });

  return response.data;
};

const useGetPropertyMetrics = (
  projectId: string,
  params?: Record<string, any>
) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_PROPERTY, params, projectId],
    queryFn: () => getPropertyMetrics(projectId, params),
    staleTime: 10,
  });
};

export default useGetPropertyMetrics;
