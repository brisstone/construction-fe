import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };



const updateCompany = (id: string, formData: FormData): Promise<ResponseType> => {
  return axiosInstance.put(`/company/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const useUpdateCompany = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, { id: string; formData: FormData }>({
    mutationFn: ({ id, formData }) => updateCompany(id, formData),
  });
};

export default useUpdateCompany;
