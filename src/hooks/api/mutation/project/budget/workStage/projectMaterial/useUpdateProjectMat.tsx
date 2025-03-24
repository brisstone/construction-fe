import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type ProjData = {
  id: string;
};

const UpdateProjectMaterial = ({
  id,
  ...data
}: ProjData): Promise<ResponseType> => {
  return axiosInstance.put(`/project-materials/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useUpdateProjectMaterial = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, ProjData>({
    mutationFn: (data: ProjData) => UpdateProjectMaterial(data),
  });
};

export default useUpdateProjectMaterial;
