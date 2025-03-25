import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";
import { CompanyID } from "../getProject";
import { ClientType } from "../../clients/getClients";

export interface ResponseType {
  data: any[];
}

export const QUERY_KEY_PAYMENTPROPERTY = "getPaymentProperty";

const getPaymentProperty = async (
  projectId: string,
  propertyId: string,
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(
    `/payments/project/${projectId}/${propertyId}`,
    {
      params,
    }
  );

  return response.data;
};

const useGetPaymentProperty = (
  projectId: string,
  propertyId: string,
  params?: Record<string, any>
) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_PAYMENTPROPERTY, params, projectId, propertyId],
    queryFn: () => getPaymentProperty(projectId, propertyId, params),
    staleTime: 10,
  });
};

export default useGetPaymentProperty;
