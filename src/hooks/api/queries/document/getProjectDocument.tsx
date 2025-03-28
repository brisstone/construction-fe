import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";
import { ProjectID } from "../projects/paymentSchedule/getPaymentProject";
import { CompanyID } from "../projects/getProject";

export interface ResponseType {
  data: any[];
}

export interface DocumentType {
  _id: string;
  url: string;
  type: string;
  projectId: ProjectID;
  companyId: CompanyID;
  createdAt: string;
}

export const QUERY_KEY_PROJDOC = "getProjectDocument";

const getProjectDocument = async (
  projectId: string,
  params: Record<string, any> = {}
): Promise<ResponseType> => {
  const response = await axiosInstance.get(`/document/project/${projectId}`, {
    params,
  });

  return response.data;
};

const useGetProjectDocument = (
  projectId: string,
  params?: Record<string, any>
) => {
  return useQuery<ResponseType>({
    queryKey: [QUERY_KEY_PROJDOC, params, projectId],
    queryFn: () => getProjectDocument(projectId, params),
    staleTime: 10,
  });
};

export default useGetProjectDocument;
