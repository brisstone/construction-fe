import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

export interface ResponseType {
  data: LaborType[];
}

export interface LaborType {
  _id: string;
  name: string;
  companyId: number;
  unitId: string;
  __v: number;
}

export const QUERY_KEY_LABOR = "getLabor";

const getLabor = async (
  companyId: string,
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(`/labor/company/${companyId}`, {
    params,
  });

  return response.data;
};

const useGetLabor = (companyId: string, params?: Record<string, any>) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_LABOR, params, companyId],
    queryFn: () => getLabor(companyId, params),
    staleTime: 10,
  });
};

export default useGetLabor;
