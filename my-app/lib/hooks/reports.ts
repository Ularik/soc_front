import { useQuery, useMutation } from "@tanstack/react-query";
import { getAiAnswer, postReport, getOrganizations } from "@/lib/services/reports";

export function useAiReportResponse() {
  return useMutation({
    mutationKey: ["report"],
    mutationFn: getAiAnswer,
  });
}

export function useCreateReport() {
  return useMutation({
    mutationKey: ["report"],
    mutationFn: postReport,
  });
}

export function useOrganizations() {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
    // Данные считаются "свежими" в течение 1 мин (не будут запрашиваться повторно)
    staleTime: 1000 * 60, // 1 мин

    // Данные хранятся в кэше памяти 1 часа после того, как компонент размонтирован
    gcTime: 1000 * 60 * 60, // 1 часа (в React Query v4 и ниже используйте cacheTime)
  });
}
