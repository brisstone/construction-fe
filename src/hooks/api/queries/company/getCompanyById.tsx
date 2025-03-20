import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

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
  latenessFee: string;
  phoneNumber: string;
}

export interface Owner {
  _id: string;
  companyId: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  emailVerified: string;
  kycVerified: string;
  permissionIds: string[];
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

export interface LocationType {
  geometry: GeometryType;
  _id: string;
  name: string;
  type: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export const QUERY_KEY_COMPANYBYID = "getCompanyById";

const getCompanyById = async (
  id: string,
  params: Record<string, any> = {}
): Promise<CompanyType> => {
  const response = await axiosInstance.get(`/company/${id}`, {
    params,
  });

  return response.data;
};

const useGetCompanyById = ( id: string, params?: Record<string, any>) => {
  return useQuery<CompanyType>({
    queryKey: [QUERY_KEY_COMPANYBYID, id, params],
    queryFn: () => getCompanyById(id, params),
    staleTime: 10,
  });
};

export default useGetCompanyById;
