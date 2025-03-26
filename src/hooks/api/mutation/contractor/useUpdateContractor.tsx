import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type ContractorData = {
  firstName: string;
  id: string;
};

const updateContractor = ({
  id,
  ...data
}: ContractorData): Promise<ResponseType> => {
  return axiosInstance.put(`/contractor/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useUpdateContractor = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, ContractorData>({
    mutationFn: (data: ContractorData) => updateContractor(data),
  });
};

export default useUpdateContractor;
