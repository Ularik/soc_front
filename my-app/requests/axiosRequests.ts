import axiosApi from "@/axiosApi";
import { ApiReportResponse } from "@/types/reports";


export const getAiAnswer = async (text: string): Promise<ApiReportResponse> => {
    const res = await axiosApi.post("/get-ai-answer/", {body: text});
    return res.data;
}