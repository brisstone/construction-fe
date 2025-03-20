import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";
import { LocationType } from "./getCompanyById";

export interface ResponseType {
  data: CompanyType[];
}

export interface CompanyType {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  ownerId: Owner;
  locationId: LocationType;
  absentTime: string;
  closingTime: string;
  latenessTime: string;
  logo: string;
  openingTime: string;
}

export interface Owner {
  _id: string;
  companyId: string;
  password: string;
  email: string;
  role: string;
  emailVerified: string;
  kycVerified: string;
  permissionIds: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const QUERY_KEY_COMPANY = "getCompany";

const getCompany = async (
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(`/company`, {
    params,
  });

  return response.data;
};

const useGetCompany = (params?: Record<string, any>) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_COMPANY, params],
    queryFn: () => getCompany(params),
    staleTime: 10,
  });
};

export default useGetCompany;
