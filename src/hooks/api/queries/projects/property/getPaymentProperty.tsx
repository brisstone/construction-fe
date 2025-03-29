import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";

export interface ResponseType {
  data: PaymentPropertyData[];
  totalAmountPaid: number;
  balanceRemaining: number;
  property: {
    amount: number;
    paymentCompleted: boolean
  }
}

export interface PaymentPropertyData {
  _id: string;
  name: string;
  projectId: ProjectID;
  propertyId: PropertyID;
  companyId: CompanyID;
  clientId: ClientID;
  amount: number;
  paymentType: string;
  paymentFLow: string;
  datePaid: string;
  paymentProof: string;
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
  __v: number;
}

export interface ClientID {
  geometry: Geometry;
  _id: string;
  clientId: string;
  companyId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  occupation: string;
  type: string;
  dob: Date;
  role: string;
  emailVerified: string;
  kycVerified: string;
  permissionIds: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Geometry {
  type: string;
  coordinates: number[];
  address: string;
  lat: number;
  long: number;
}

export interface CompanyID {
  _id: string;
  name: string;
  ownerId: string;
  address?: string;
  checkOutTime?: Date;
  logo?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ProjectID {
  _id: string;
  name: string;
  description: string;
  companyId: string;
  managerId: string;
  ownerId: string;
  photos: any[];
  location: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  budgetId: string;
}

export interface PropertyID {
  _id: string;
  name: string;
  description: string;
  companyId: string;
  projectId: string;
  amount: number;
  photos: string[];
  status: string;
  kycVerified: string;
  agentType: string;
  paymentFrequency: string;
  dwellingType: string;
  modeOfPayment: string;
  amenities: Amenity[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  clientId: string;
}

export interface Amenity {
  amenityId: string;
  quantity: number;
  _id: string;
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
