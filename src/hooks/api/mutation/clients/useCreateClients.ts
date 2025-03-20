import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type clientData = {
  firstName: string;
  email?: string;
};

const CreateClient = (data: clientData): Promise<ResponseType> => {
  return axiosInstance.post(`/clients`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreateClients = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, clientData>({
    mutationFn: (data: clientData) => CreateClient(data),
  });
};

export default useCreateClients;
