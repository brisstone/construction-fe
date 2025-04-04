import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

type ResponseType = {
  success: boolean;
  data: string;
};

type ErrorType = { error: string; success: boolean };

const DeleteImage = (fileUrl: string): Promise<ResponseType> => {
  return axiosInstance.delete(`/file-upload`, {
    data: { fileUrl }, 
  });
};
const useDeleteImage = () => {
  return useMutation<ResponseType, AxiosError<ErrorType>, string>({
    mutationFn: (fileUrl: string) => DeleteImage(fileUrl),
  });
};

export default useDeleteImage;
