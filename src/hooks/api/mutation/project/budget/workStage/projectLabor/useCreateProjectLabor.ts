import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type ProjectLaborData = {
  workStageId?: string;
};

const CreateProjectLabor = (data: ProjectLaborData): Promise<ResponseType> => {
  return axiosInstance.post(`/project-labors`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreateProjectLabor = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, ProjectLaborData>({
    mutationFn: (data: ProjectLaborData) => CreateProjectLabor(data),
  });
};

export default useCreateProjectLabor;
