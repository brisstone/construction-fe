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

const DeleteLabor = (data: DelData): Promise<ResponseType> => {
  return axiosInstance.delete(`/labor/${data.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useDeleteLabor = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, DelData>({
    mutationFn: (data: DelData) => DeleteLabor(data),
  });
};

export default useDeleteLabor;
