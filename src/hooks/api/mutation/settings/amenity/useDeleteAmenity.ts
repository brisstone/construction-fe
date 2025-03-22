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

const DeleteAmenity = (data: DelData): Promise<ResponseType> => {
  return axiosInstance.delete(`/amenities/${data.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useDeleteAmenity = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, DelData>({
    mutationFn: (data: DelData) => DeleteAmenity(data),
  });
};

export default useDeleteAmenity;
