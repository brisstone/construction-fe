import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type ProjectMaterialData = {
  workStageId?: string;
};

const CreateProjectMaterial = (data: ProjectMaterialData): Promise<ResponseType> => {
  return axiosInstance.post(`/project-materials`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreateProjectMaterial = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, ProjectMaterialData>({
    mutationFn: (data: ProjectMaterialData) => CreateProjectMaterial(data),
  });
};

export default useCreateProjectMaterial;
