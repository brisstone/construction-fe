import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type UnitData = {
  name: string;
  id: string;
};

const UpdateUnit = ( data: UnitData): Promise<ResponseType> => {
  const { id, ...restData } = data;
  return axiosInstance.put(`/units/${id}`, restData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useUpdateUnit = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, UnitData>({
    mutationFn: (data: UnitData) => UpdateUnit(data),
  });
};

export default useUpdateUnit;
