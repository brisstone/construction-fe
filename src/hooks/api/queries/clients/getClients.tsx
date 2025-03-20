import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";


export interface ResponseType {
  data: ClientType[];
}

export interface ClientType {
  _id: string;
  clientId: string;
  companyId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  occupation: string;
  dob: string;
  password: string;
  type: string;
  email: string;
  geometry: GeometryType;
  role: string;
  emailVerified: string;
  kycVerified: string;
  permissionIds: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GeometryType {
  address: string;
  lat: string;
  long: string;
  _id: string;
  type: string;
  coordinates: string[];
  createdAt: string;
  updatedAt: string;
}

export const QUERY_KEY_CLIENTS = "getClients";

const getClients = async (
  companyId: string,
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(`/clients/company/${companyId}`, {
    params,
  });

  return response.data;
};

const useGetClients = (companyId: string, params?: Record<string, any>) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_CLIENTS, params, companyId],
    queryFn: () => getClients(companyId, params),
    staleTime: 10,
  });
};

export default useGetClients;
