import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type UnitsData = {
  name: string;
};

const CreateUnit = (data: UnitsData): Promise<ResponseType> => {
  return axiosInstance.post(`/units`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreateUnit = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, UnitsData>({
    mutationFn: (data: UnitsData) => CreateUnit(data),
  });
};

export default useCreateUnit;
