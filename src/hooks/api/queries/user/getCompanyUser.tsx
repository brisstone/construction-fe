import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

export interface ResponseType {
  data: CompanyUserType[];
}
export interface CompanyUserType {
  _id: string;
  staffId: string;
  companyId: CompanyID;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  email: string;
  address: string;
  role: string;
  emailVerified: string;
  kycVerified: string;
  permissionIds: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface CompanyID {
  _id: string;
  name: string;
  ownerId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}


export const QUERY_KEY_COMPUSER = "getCompanyUser";

const getCompanyUser = async (
  companyId: string,
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(`/user/company/${companyId}`, {
    params,
  });

  return response.data;
};

const useGetCompanyUser = (companyId: string, params?: Record<string, any>) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_COMPUSER, params, companyId],
    queryFn: () => getCompanyUser(companyId, params),
    staleTime: 10,
  });
};

export default useGetCompanyUser;
