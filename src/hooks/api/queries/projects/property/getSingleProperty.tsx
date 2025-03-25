import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";
import { PropertyType } from "./getProperty";

// export interface ResponseType {
//   data: PropertyType;
// }

export const QUERY_KEY_SINGLEPROPERTY = "getSingleProperty";

const getSingleProperty = async (
  propId: string,
  params: Record<string, any> = {}
): Promise<PropertyType> => {
  const response = await axiosInstance.get(`/property/${propId}`, {
    params,
  });

  return response.data;
};

const useGetSingleProperty = (
  propId: string,
  params?: Record<string, any>
) => {
  return useQuery<PropertyType>({
    queryKey: [QUERY_KEY_SINGLEPROPERTY, params, propId],
    queryFn: () => getSingleProperty(propId, params),
    staleTime: 10,
  });
};

export default useGetSingleProperty;
