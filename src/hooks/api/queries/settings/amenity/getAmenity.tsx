import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

export interface ResponseType {
  data: AmenityType[];
}

export interface AmenityType {
  _id: string;
  name: string;
  companyId: number;
  image: string;
  __v: number;
}

export const QUERY_KEY_AMENITY = "getAmenity";

const getAmenity = async (
  companyId: string,
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(`/amenities/company/${companyId}`, {
    params,
  });

  return response.data;
};

const useGetAmenity = (companyId: string, params?: Record<string, any>) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_AMENITY, params, companyId],
    queryFn: () => getAmenity(companyId, params),
    staleTime: 10,
  });
};

export default useGetAmenity;
