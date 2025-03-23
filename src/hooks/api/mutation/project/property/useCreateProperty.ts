import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type PropertyData = {
  name: string;
};

const CreateProperty = (data: PropertyData): Promise<ResponseType> => {
  return axiosInstance.post(`/property`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreateProperty = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, PropertyData>({
    mutationFn: (data: PropertyData) => CreateProperty(data),
  });
};

export default useCreateProperty;
