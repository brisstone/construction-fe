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

const DeleteProjectActivity = (data: DelData): Promise<ResponseType> => {
  return axiosInstance.delete(`/project-activities/${data.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useDeleteProjectActivity = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, DelData>({
    mutationFn: (data: DelData) => DeleteProjectActivity(data),
  });
};

export default useDeleteProjectActivity;
