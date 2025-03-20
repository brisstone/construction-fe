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

const deleteCompany = (data: DelData): Promise<ResponseType> => {
  return axiosInstance.delete(`/company/${data.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useDeleteCompany = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, DelData>({
    mutationFn: (data: DelData) => deleteCompany(data),
  });
};

export default useDeleteCompany;
