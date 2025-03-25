import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type ProjectActivityData = {
  workStageId?: string;
};

const CreateProjectActivity = (data: ProjectActivityData): Promise<ResponseType> => {
  return axiosInstance.post(`/project-activities`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreateProjectActivity = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, ProjectActivityData>({
    mutationFn: (data: ProjectActivityData) => CreateProjectActivity (data),
  });
};

export default useCreateProjectActivity;
