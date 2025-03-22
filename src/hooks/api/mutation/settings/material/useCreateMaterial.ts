import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type materialsData = {
  name: string;
};

const Creatematerials = (data: materialsData): Promise<ResponseType> => {
  return axiosInstance.post(`/materials`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreatematerials = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, materialsData>({
    mutationFn: (data: materialsData) => Creatematerials(data),
  });
};

export default useCreatematerials;
