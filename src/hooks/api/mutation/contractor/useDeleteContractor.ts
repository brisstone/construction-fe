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

const DeleteContractor = (data: DelData): Promise<ResponseType> => {
  return axiosInstance.delete(`/contractor/${data.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useDeleteContractor = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, DelData>({
    mutationFn: (data: DelData) => DeleteContractor(data),
  });
};

export default useDeleteContractor;
