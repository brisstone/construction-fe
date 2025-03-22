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

const DeleteClient = (data: DelData): Promise<ResponseType> => {
  return axiosInstance.delete(`/clients/${data.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useDeleteClient = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, DelData>({
    mutationFn: (data: DelData) => DeleteClient(data),
  });
};

export default useDeleteClient;
