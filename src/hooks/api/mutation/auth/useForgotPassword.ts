import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

const forgotPassword = (formData: FormData): Promise<ResponseType> => {
  return axiosInstance.post(`/auth/forgot-password`, formData);
};

const useForgotPassword = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, FormData>({
    mutationFn: (formData: FormData) => forgotPassword(formData),
  });
};

export default useForgotPassword;
