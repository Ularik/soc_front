import axiosApi from "@/constants/axiosApi";
import { ApiReportResponse, ReportType } from "@/types/reports";
import { OrganizationType } from "@/types/organizations";

export const getAiAnswer = async (text: string): Promise<ApiReportResponse> => {
  const data = { body: text };
  const res = await axiosApi.post("/reports/get-ai-answer/", data);
  return res.data;
};

export const postReport = async (data: ReportType) => {
  const res = await axiosApi.post("/reports/create-report/", data);
  return res.data;
};

export const getOrganizations = async (): Promise<OrganizationType[]> => {
  const res = await axiosApi.get("/reports/get-organizations/");
  return res.data;
};
