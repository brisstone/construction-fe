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

const DeleteMaterial = (data: DelData): Promise<ResponseType> => {
  return axiosInstance.delete(`/materials/${data.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useDeleteMaterial = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, DelData>({
    mutationFn: (data: DelData) => DeleteMaterial(data),
  });
};

export default useDeleteMaterial;
