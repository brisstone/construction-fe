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

const DeletePaymentProperty = (data: DelData): Promise<ResponseType> => {
  return axiosInstance.delete(`/payments/${data.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useDeletePaymentProperty = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, DelData>({
    mutationFn: (data: DelData) => DeletePaymentProperty(data),
  });
};

export default useDeletePaymentProperty;
