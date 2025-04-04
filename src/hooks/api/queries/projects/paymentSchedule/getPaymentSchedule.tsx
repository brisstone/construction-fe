import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";
import { CompanyID, ProjectID } from "../property/getPaymentProperty";

export interface ResponseType {
  data: PaymentScheduleType[];
}

export interface PaymentScheduleType {
  _id: string;
  description: string;
  projectId: ProjectID;
  contractorId: ContractorID;
  companyId: CompanyID;
  amount: number;
  paymentType: string;
  paymentMethod: string;
  expenseType: string;
  datePaid: string;
  paymentProof: string;
  createdAt: string;
  updatedAt: string;
  paymentCompleted: boolean;
  __v: number;
}

export interface ContractorID {
  _id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  occupation: string;
  type: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}





export const QUERY_KEY_PAYMENTSCHEDULE = "getPaymentSchedule";

const getPaymentSchedule = async (
  projectId: string,
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(
    `/payments-schedules/project/${projectId}`,
    {
      params,
    }
  );

  return response.data;
};

const useGetPaymentSchedule = (
  projectId: string,
  params?: Record<string, any>
) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_PAYMENTSCHEDULE, params, projectId],
    queryFn: () => getPaymentSchedule(projectId, params),
    staleTime: 10,
  });
};

export default useGetPaymentSchedule;
