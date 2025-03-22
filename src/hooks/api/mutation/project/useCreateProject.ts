import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type projectData = {
  name: string;
};

const CreateProject = (data: projectData): Promise<ResponseType> => {
  return axiosInstance.post(`/projects`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreateProject = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, projectData>({
    mutationFn: (data: projectData) => CreateProject(data),
  });
};

export default useCreateProject;
