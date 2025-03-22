import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

export interface ResponseType {
  data: UnitType[];
}

export interface UnitType {
  _id: string;
  name: string;
  companyId: number;
  unitId: string;
  __v: number;
}

export const QUERY_KEY_UNIT = "getUnit";

const getUnit = async (
  companyId: string,
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(`/units/company/${companyId}`, {
    params,
  });

  return response.data;
};

const useGetUnit = (companyId: string, params?: Record<string, any>) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_UNIT, params, companyId],
    queryFn: () => getUnit(companyId, params),
    staleTime: 10,
  });
};

export default useGetUnit;
