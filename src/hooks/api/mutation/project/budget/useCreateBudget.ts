import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type BudgetData = {
  name: string;
  projectId: string;
};

const CreateBudget = (data: BudgetData): Promise<ResponseType> => {
  return axiosInstance.post(`/budget`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreateBudget = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, BudgetData>({
    mutationFn: (data: BudgetData) => CreateBudget(data),
  });
};

export default useCreateBudget;
