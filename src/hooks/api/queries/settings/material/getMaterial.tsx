import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

export interface ResponseType {
  data: MaterialType[];
}

export interface MaterialType {
  _id: string;
  name: string;
  companyId: number;
  unitId: string;
  __v: number;
}

export const QUERY_KEY_MATERIAL = "getMaterial";

const getMaterial = async (
  companyId: string,
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(`/materials/company/${companyId}`, {
    params,
  });

  return response.data;
};

const useGetMaterial = (companyId: string, params?: Record<string, any>) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_MATERIAL, params, companyId],
    queryFn: () => getMaterial(companyId, params),
    staleTime: 10,
  });
};

export default useGetMaterial;
