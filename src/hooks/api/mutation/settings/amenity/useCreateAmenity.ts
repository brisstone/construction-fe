import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type AmenityData = {
  name: string;
};

const CreateAmenity = (data: AmenityData): Promise<ResponseType> => {
  return axiosInstance.post(`/amenities`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreateAmenity = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, AmenityData>({
    mutationFn: (data: AmenityData) => CreateAmenity(data),
  });
};

export default useCreateAmenity;
