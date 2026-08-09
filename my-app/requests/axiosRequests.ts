import axiosApi from "@/axiosApi";
import { ApiReportResponse, ReportType } from "@/types/reports";
import { OrganizationType } from "@/types/organizations";


export const getAiAnswer = async (text: string): Promise<ApiReportResponse> => {
    const data = { body: text };
    const res = await axiosApi.post("/get-ai-answer/", data);
    return res.data;
}

export const postReport = async (data: ReportType) => {
  const res = await axiosApi.post("/create-report/", data);
  return res.data;
};


export const getOrganizations = async (): Promise<OrganizationType[]> => {
    const res = await axiosApi.get("/get-organizations/");
    return res.data;
}