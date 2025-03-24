import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type laborData = {
  name: string;
};

const CreateLabor = (data: laborData): Promise<ResponseType> => {
  return axiosInstance.post(`/labor`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreateLabor = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, laborData>({
    mutationFn: (data: laborData) => CreateLabor(data),
  });
};

export default useCreateLabor;
