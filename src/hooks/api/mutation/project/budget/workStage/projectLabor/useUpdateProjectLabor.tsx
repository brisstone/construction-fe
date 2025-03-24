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

const UpdateProjectLabor = ({
  id,
  ...data
}: ProjData): Promise<ResponseType> => {
  return axiosInstance.put(`/project-labors/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useUpdateProjectLabor = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, ProjData>({
    mutationFn: (data: ProjData) => UpdateProjectLabor(data),
  });
};

export default useUpdateProjectLabor;
