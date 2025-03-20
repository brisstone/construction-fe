import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type ClientData = {
  firstName: string;
  id: string;
};

const updateClient = ({ id, ...data }: ClientData): Promise<ResponseType> => {
  return axiosInstance.put(`/clients/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useUpdateClient = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, ClientData>({
    mutationFn: (data: ClientData) => updateClient(data),
  });
};

export default useUpdateClient;
