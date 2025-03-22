import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type ProjData = {
  name: string;
  id: string;
};

const UpdateProject = ({ id, ...data }: ProjData): Promise<ResponseType> => {
  return axiosInstance.put(`/projects/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useUpdateProject = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, ProjData>({
    mutationFn: (data: ProjData) => UpdateProject(data),
  });
};

export default useUpdateProject;
