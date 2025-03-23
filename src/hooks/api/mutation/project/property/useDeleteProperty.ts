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

const DeleteProperty = (data: DelData): Promise<ResponseType> => {
  return axiosInstance.delete(`/property/${data.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useDeleteProperty = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, DelData>({
    mutationFn: (data: DelData) => DeleteProperty(data),
  });
};

export default useDeleteProperty;
