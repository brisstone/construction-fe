import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type CompanyData = {
  name: string;
  email?: string;
};

const CreateCompany = (data: CompanyData): Promise<ResponseType> => {
  return axiosInstance.post(`/company`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreateCompany = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, CompanyData>({
    mutationFn: (data: CompanyData) => CreateCompany(data),
  });
};

export default useCreateCompany;
