"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import ReportForm from "@/components/reports/ReportForm";
import { ReportType } from "@/types/reports";
import { Textarea } from "@/components/ui/textarea";
import { useAiReportResponse } from "@/requests/queries";
import { Button } from "@/components/ui/button";

export default function ReportCreate() {
  const [text, setText] = useState("");
  const [report, setReport] = useState<ReportType | undefined>();

  const { mutate: analyzeAi, isPending, error } = useAiReportResponse();

  // Функция очистки текста от разрушающих JSON бинарных/управляющих символов
  const sanitizeText = (rawText: string): string => {
    return (
      rawText
        // Удаляем спецсимволы ASCII 0x00-0x1F (кроме переносов строк \n \r и табуляции \t) и 0x7F-0x9F
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "")
        .trim()
    );
  };

  const answerAi = () => {
    const cleanedText = sanitizeText(text);

    if (!cleanedText) return;

    analyzeAi(cleanedText, {
      onSuccess: (data) => {
        const result = data.result;
        setReport(result);
      },
      onError: (err) => {
        console.error("Ошибка при запросе к ИИ:", err);
      },
    });
  };

  const submit = (data: ReportType) => {
    console.log("Сохраняем отчет:", data);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      {/* Блок ввода логов для ИИ */}
      <div className="space-y-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#1E2B6D]">
          Генерация отчета с помощью ИИ
        </h2>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Вставьте лог события или текст инцидента
          </label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Вставьте сырой лог (WAF, IPS, SIEM)..."
            className="min-h-[140px] font-mono text-xs"
            disabled={isPending}
          />
        </div>
        <Button
          onClick={answerAi}
          disabled={isPending || !text.trim()}
          className="bg-[#1E2B6D] hover:bg-[#162356] h-11 px-6 rounded-2xl"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Анализ и генерация...
            </span>
          ) : (
            "Сгенерировать"
          )}
        </Button>
      </div>

      {/* 
        Свойство key пересоздает форму при получении новых данных от ИИ, 
        что заставляет react-hook-form обновить defaultValues и заполнить поля.
      */}
      <ReportForm
        key={report ? JSON.stringify(report) : "empty-report-form"}
        initialValue={report}
        isLoading={isPending}
        error={error}
        submitFunc={submit}
      />
    </div>
  );
}
