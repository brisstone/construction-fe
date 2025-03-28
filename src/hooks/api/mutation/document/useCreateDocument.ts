import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

type documentData = {
  projectId: string;
  type?: string;
};

const CreateDocument = (data: documentData): Promise<ResponseType> => {
  return axiosInstance.post(`/document`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useCreateDocument = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, documentData>({
    mutationFn: (data: documentData) => CreateDocument(data),
  });
};

export default useCreateDocument;
