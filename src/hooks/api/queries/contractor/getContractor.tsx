import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";


export interface ResponseType {
  data: ContractorType[];
}

export interface ContractorType {
  _id: string;
  contractorId: string;
  companyId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
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

export const QUERY_KEY_CONTRACTOR = "getContractor";

const getContractor = async (
  companyId: string,
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(`/contractor/company/${companyId}`, {
    params,
  });

  return response.data;
};

const useGetContractor = (companyId: string, params?: Record<string, any>) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_CONTRACTOR, params, companyId],
    queryFn: () => getContractor(companyId, params),
    staleTime: 10,
  });
};

export default useGetContractor;
