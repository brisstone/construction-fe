import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

const resetPassword = (formData: FormData): Promise<ResponseType> => {
  return axiosInstance.post(`/auth/reset-password`, formData);
};

const useResetPassword = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, FormData>({
    mutationFn: (formData: FormData) => resetPassword(formData),
  });
};

export default useResetPassword;
