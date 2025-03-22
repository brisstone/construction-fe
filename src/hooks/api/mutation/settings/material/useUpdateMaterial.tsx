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

const UpdateMaterial = ( data: MatData): Promise<ResponseType> => {
  const { id, ...restData } = data;
  return axiosInstance.patch(`/materials/${id}`, restData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useUpdateMaterial = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, MatData>({
    mutationFn: (data: MatData) => UpdateMaterial(data),
  });
};

export default useUpdateMaterial;
