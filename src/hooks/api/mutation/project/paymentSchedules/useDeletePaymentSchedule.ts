import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type DelData = {
  id: string;
};

const DeletePaymentSchedule = (data: DelData): Promise<ResponseType> => {
  return axiosInstance.delete(`/payments-schedules/${data.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useDeletePaymentSchedule = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, DelData>({
    mutationFn: (data: DelData) => DeletePaymentSchedule(data),
  });
};

export default useDeletePaymentSchedule;
