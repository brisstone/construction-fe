import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";
import { ContractorID } from "./getPaymentSchedule";

// export interface ResponseType {
//   data: PaymentSingleScheduleType;
// }

export interface PaymentSingleScheduleType {
  _id: string;
  projectId: string;
  contractorId: ContractorID;
  companyId: string;
  amount: number;
  paymentType: string;
  paymentMethod: string;
  expenseType: string;
  datePaid: string;
  paymentProof: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export const QUERY_KEY_SINGLEPAYMENTSCHEDULE = "getSinglePaymentSchedule";

const getSinglePaymentSchedule = async (
  paymentId: string,
  params: Record<string, any> = {}
): Promise<PaymentSingleScheduleType> => {
  const response = await axiosInstance.get(`/payments-schedules/${paymentId}`, {
    params,
  });

  return response.data;
};

const useGetSinglePaymentSchedule = (
  paymentId: string,
  params?: Record<string, any>
) => {
  return useQuery<PaymentSingleScheduleType>({
    queryKey: [QUERY_KEY_SINGLEPAYMENTSCHEDULE, params, paymentId],
    queryFn: () => getSinglePaymentSchedule(paymentId, params),
    staleTime: 10,
  });
};

export default useGetSinglePaymentSchedule;
