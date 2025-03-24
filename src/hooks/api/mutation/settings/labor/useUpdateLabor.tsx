import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type MatData = {
  name: string;
  id: string;
};

const UpdateLabor = ( data: MatData): Promise<ResponseType> => {
  const { id, ...restData } = data;
  return axiosInstance.put(`/labor/${id}`, restData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useUpdateLabor = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, MatData>({
    mutationFn: (data: MatData) => UpdateLabor(data),
  });
};

export default useUpdateLabor;
