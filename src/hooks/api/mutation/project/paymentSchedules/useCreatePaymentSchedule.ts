import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type PaymentScheduleData = {
  amount: number;
};

const PaymentSchedule  = (data: PaymentScheduleData): Promise<ResponseType> => {
  return axiosInstance.post(`/payments-schedules`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreatePaymentSchedule = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, PaymentScheduleData>({
    mutationFn: (data: PaymentScheduleData) => PaymentSchedule (data),
  });
};

export default useCreatePaymentSchedule;
