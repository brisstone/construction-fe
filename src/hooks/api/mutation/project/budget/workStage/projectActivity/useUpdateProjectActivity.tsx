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

const UpdateProjectActivity = ({
  id,
  ...data
}: ProjData): Promise<ResponseType> => {
  return axiosInstance.put(`/project-activities/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useUpdateProjectActivity = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, ProjData>({
    mutationFn: (data: ProjData) => UpdateProjectActivity(data),
  });
};

export default useUpdateProjectActivity;
