import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type PropData = {
  name?: string;
  id: string;
};

const UpdatePaymentSchedule = ({
  id,
  ...data
}: PropData): Promise<ResponseType> => {
  return axiosInstance.put(`/payments-schedules/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useUpdatePaymentSchedule = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, PropData>({
    mutationFn: (data: PropData) => UpdatePaymentSchedule(data),
  });
};

export default useUpdatePaymentSchedule;
