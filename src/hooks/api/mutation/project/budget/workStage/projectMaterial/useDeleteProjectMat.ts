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

const DeleteProjectMaterial = (data: DelData): Promise<ResponseType> => {
  return axiosInstance.delete(`/project-materials/${data.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useDeleteProjectMaterial = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, DelData>({
    mutationFn: (data: DelData) => DeleteProjectMaterial(data),
  });
};

export default useDeleteProjectMaterial;
