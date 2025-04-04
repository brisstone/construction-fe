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

const UpdatePaymentProperty = ({
  id,
  ...data
}: PropData): Promise<ResponseType> => {
  return axiosInstance.put(`/payments/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useUpdatePaymentProperty = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, PropData>({
    mutationFn: (data: PropData) => UpdatePaymentProperty(data),
  });
};

export default useUpdatePaymentProperty;
