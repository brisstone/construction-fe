import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type workStageData = {
  name: string;
};

const CreateWorkStage = (data: workStageData): Promise<ResponseType> => {
  return axiosInstance.post(`/workstage`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreateWorkStage = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, workStageData>({
    mutationFn: (data: workStageData) => CreateWorkStage(data),
  });
};

export default useCreateWorkStage;
