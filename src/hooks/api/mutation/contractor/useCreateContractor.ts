import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type contractorData = {
  firstName: string;
  email?: string;
};

const CreateContractor = (data: contractorData): Promise<ResponseType> => {
  return axiosInstance.post(`/contractor`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreateContractor = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, contractorData>({
    mutationFn: (data: contractorData) => CreateContractor(data),
  });
};

export default useCreateContractor;
