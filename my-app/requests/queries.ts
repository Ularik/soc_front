import { useQuery, useMutation } from "@tanstack/react-query";
import { getAiAnswer } from "./axiosRequests";


export function useAiReportResponse() {
    return useMutation({
      mutationKey: ["report"],
      mutationFn: getAiAnswer,
    });
}