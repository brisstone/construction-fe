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

const DeleteProject = (data: DelData): Promise<ResponseType> => {
  return axiosInstance.delete(`/projects/${data.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useDeleteProject = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, DelData>({
    mutationFn: (data: DelData) => DeleteProject(data),
  });
};

export default useDeleteProject;
