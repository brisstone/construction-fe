import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";
import { CompanyID } from "../getProject";
import { ClientType } from "../../clients/getClients";

export interface ResponseType {
  data: PropertyType[];
}

export interface PropertyType {
  _id: string;
  name: string;
  description: string;
  companyId: CompanyID;
  projectId: {
    name: string;
  };
  amount: number | string;
  photos: string[];
  status: string;
  kycVerified: string;
  agentType: string;
  clientId?: ClientType;
  paymentFrequency: string;
  dwellingType: "Single" | "Multi_Story";
  modeOfPayment: string;
  amenities: Amenity[];
  createdAt: Date;
  updatedAt: Date;
  paymentCompleted: boolean;
  __v: number;
}

export interface Amenity {
  amenityId: amenityData;
  quantity: number;
  _id: string;
}

export interface amenityData {
  companyId: string;
  createdAt: string;
  image: string;
  name: string;
  updatedAt: string;
  __v: 0;
  _id: string;
}

export const QUERY_KEY_PROPERTY = "getProperty";

const getProperty = async (
  projectId: string,
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(`/property/project/${projectId}`, {
    params,
  });

  return response.data;
};

const useGetProperty = (projectId: string, params?: Record<string, any>) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_PROPERTY, params, projectId],
    queryFn: () => getProperty(projectId, params),
    staleTime: 10,
  });
};

export default useGetProperty;
