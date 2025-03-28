import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  status: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type RegData = {
  firstName: string;
  email?: string;
  address?: string;
};

const RegisterUser = ( data: RegData): Promise<any> => {
  return axiosInstance.post(`/auth/register`, data);
};

const useRegister = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, RegData>({
    mutationFn: (data: RegData) => RegisterUser(data),
  });
};

export default useRegister;
