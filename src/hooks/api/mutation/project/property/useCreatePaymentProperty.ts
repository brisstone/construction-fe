import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type PaymentPropertyData = {
  name: string;
};

const PaymentProperty = (data: PaymentPropertyData): Promise<ResponseType> => {
  return axiosInstance.post(`/payments`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreatePaymentProperty = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, PaymentPropertyData>({
    mutationFn: (data: PaymentPropertyData) => PaymentProperty(data),
  });
};

export default useCreatePaymentProperty;
