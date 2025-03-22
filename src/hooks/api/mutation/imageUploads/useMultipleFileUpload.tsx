import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

const MultipleFileUpload = (formData: FormData): Promise<ResponseType> => {
  return axiosInstance.post(`/file-upload/multiple`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const useMultipleFileUpload = () => {
  return useMutation<
    ResponseType,
    AxiosError<ErrorType>,
    { formData: FormData }
  >({
    mutationFn: ({ formData }) => MultipleFileUpload(formData),
  });
};

export default useMultipleFileUpload;
