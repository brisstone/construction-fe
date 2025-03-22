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
  id: string;
};

const UpdateAmenity = ( data: AmenityData): Promise<ResponseType> => {
  const { id, ...restData } = data;
  return axiosInstance.put(`/amenities/${id}`, restData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useUpdateAmenity = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, AmenityData>({
    mutationFn: (data: AmenityData) => UpdateAmenity(data),
  });
};

export default useUpdateAmenity;
