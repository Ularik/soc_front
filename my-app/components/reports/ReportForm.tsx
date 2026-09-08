"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  inputClass,
  RISK_LEVELS,
  DETECTION_TOOLS,
  ORIGIN_NAMES,
} from "@/constants/constants";
import { useOrganizations } from "@/lib/hooks/reports";
import type { ReportType } from "@/types/reports";

interface Props {
  initialValue?: ReportType;
  error: Error | null;
  isLoading: boolean;
  submitFunc: (data: ReportType) => void;
}

export default function ReportForm({
  initialValue,
  error,
  isLoading,
  submitFunc,
}: Props) {

  const {data: organizations, isPending, error: orgError } = useOrganizations();
  const ORGANIZATIONS_TITLE = organizations?.map((org) => org.name_en);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<ReportType>({
    values: initialValue
      ? {
          ...initialValue,
          origin_name:
            ORGANIZATIONS_TITLE?.find((title) =>
              initialValue.origin_name.includes(title),
            ) || "",

        }
      : {
          country: "",
          detection_date: "",
          origin_name: "",
          attack_type: "",
          source_ip: "",
          destination_ip: "",
          host: "",
          cve: "",
          detection_tool: "",
          short_description: "",
          methods: "",
          protocols_ports: "",
          risk_assessment: "",
          potential_impact: "",
          data_or_payload: "",
          response_actions: "",
        },
  });

  const onSubmit = (data: ReportType) => {
    // Преобразуем пустые строки для опциональных полей host и cve в null перед отправкой (если требуется бэкендом)
    const formattedData: ReportType = {
      ...data,
      host: data.host || null,
      cve: data.cve || null,
    };
    submitFunc(formattedData);
  };

  useEffect(() => {
    if (!error) return;

    const data = (
      error as AxiosError<{ detail: { field: string; source: string } }>
    ).response?.data.detail;

    if (data?.field) {
      setError(data.field as keyof ReportType, {
        type: "server",
        message: data.source ?? "Ошибка сервера",
      });
    }
  }, [error, setError]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
      autoComplete="off"
    >
      <h2 className="text-xl font-semibold text-[#1E2B6D]">
        {initialValue ? "Редактирование отчета" : "Создание отчета"}
      </h2>

      {/* Метаданные (2 колонки) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Страна (Country)
          </label>
          <Input
            {...register("country")}
            placeholder="US"
            className={`${inputClass} ${errors.country ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            disabled={isLoading}
          />
          {errors.country && (
            <p className="pt-0.5 text-xs font-semibold text-red-500">
              {errors.country.message}
            </p>
          )}
        </div>
        {/* Дата обнаружения */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Дата обнаружения
          </label>
          <Input
            {...register("detection_date", {
              required: "Укажите дату обнаружения",
            })}
            placeholder="2026-08-07T13:56:36"
            className={`${inputClass} ${errors.detection_date ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            disabled={isLoading}
          />
          {errors.detection_date && (
            <p className="pt-0.5 text-xs font-semibold text-red-500">
              {errors.detection_date.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Организация (Ведомство)
          </label>
          <Controller
            control={control}
            name="origin_name"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value || undefined}
              >
                <SelectTrigger
                  className={`${inputClass} ${errors.origin_name ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Выберите средство (WAF / IPS)" />
                </SelectTrigger>
                <SelectContent>
                  {organizations?.map((org) => (
                    <SelectItem key={org.id} value={org.name_en}>
                      {org.name_en} / {org.name_ru}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.origin_name && (
            <p className="pt-0.5 text-xs font-semibold text-red-500">
              {errors.origin_name.message}
            </p>
          )}
        </div>

        {/* Средство обнаружения */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Средство обнаружения
          </label>
          <Controller
            control={control}
            name="detection_tool"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value || undefined}
              >
                <SelectTrigger
                  className={`${inputClass} ${errors.detection_tool ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Выберите средство (WAF / IPS)" />
                </SelectTrigger>
                <SelectContent>
                  {DETECTION_TOOLS?.map((tool) => (
                    <SelectItem key={tool} value={tool}>
                      {tool}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.detection_tool && (
            <p className="pt-0.5 text-xs font-semibold text-red-500">
              {errors.detection_tool.message}
            </p>
          )}
        </div>

        {/* Оценка риска */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Уровень риска
          </label>
          <Controller
            control={control}
            name="risk_assessment"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value || undefined}
              >
                <SelectTrigger
                  className={`${inputClass} ${errors.risk_assessment ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Выберите уровень риска" />
                </SelectTrigger>
                <SelectContent>
                  {RISK_LEVELS?.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.risk_assessment && (
            <p className="pt-0.5 text-xs font-semibold text-red-500">
              {errors.risk_assessment.message}
            </p>
          )}
        </div>

        {/* CVE */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            CVE (опционально)
          </label>
          <Input
            {...register("cve")}
            placeholder="CVE-2024-XXXX"
            className={inputClass}
            disabled={isLoading}
          />
        </div>

        {/* IP Источника */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            IP-адрес источника (Source IP)
          </label>
          <Input
            {...register("source_ip", { required: "Укажите IP источника" })}
            placeholder="80.187.126.228"
            className={`${inputClass} ${errors.source_ip ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            disabled={isLoading}
          />
          {errors.source_ip && (
            <p className="pt-0.5 text-xs font-semibold text-red-500">
              {errors.source_ip.message}
            </p>
          )}
        </div>

        {/* IP Назначения */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            IP-адрес назначения (Destination IP)
          </label>
          <Input
            {...register("destination_ip", {
              required: "Укажите IP назначения",
            })}
            placeholder="212.42.102.76"
            className={`${inputClass} ${errors.destination_ip ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            disabled={isLoading}
          />
          {errors.destination_ip && (
            <p className="pt-0.5 text-xs font-semibold text-red-500">
              {errors.destination_ip.message}
            </p>
          )}
        </div>

        {/* Домен / Host */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Домен / Host (опционально)
          </label>
          <Input
            {...register("host")}
            placeholder="example.com"
            className={inputClass}
            disabled={isLoading}
          />
        </div>

        {/* Протоколы и порты */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Протоколы и порты
          </label>
          <Input
            {...register("protocols_ports")}
            placeholder="UDP / 161"
            className={inputClass}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Текстовые описания (на всю ширину) */}
      <div className="space-y-4">
        {/* Краткое описание */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Краткое описание
          </label>
          <Textarea
            {...register("short_description")}
            placeholder="Краткая сводка об инциденте..."
            className={`${inputClass} min-h-[80px] resize-none`}
            disabled={isLoading}
          />
        </div>

        {/* Тип атаки */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Тип угрозы / атаки
          </label>
          <Input
            {...register("attack_type")}
            placeholder="SNMP GET Request(UDP)-1"
            className={inputClass}
            disabled={isLoading}
          />
        </div>

        {/* Метод атаки */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Методы атаки
          </label>
          <Textarea
            {...register("methods")}
            placeholder="Детали использованного метода..."
            className={`${inputClass} min-h-[80px] resize-none`}
            disabled={isLoading}
          />
        </div>

        {/* Потенциальные последствия */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Потенциальные последствия
          </label>
          <Textarea
            {...register("potential_impact")}
            placeholder="Возможный ущерб или риски..."
            className={`${inputClass} min-h-[80px] resize-none`}
            disabled={isLoading}
          />
        </div>

        {/* Данные или Payload */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Данные запроса / Payload
          </label>
          <Textarea
            {...register("data_or_payload")}
            placeholder="Тело запроса или сигнатура..."
            className={`${inputClass} font-mono text-xs min-h-[100px] resize-none`}
            disabled={isLoading}
          />
        </div>

        {/* Меры защиты */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Рекомендуемые меры защиты
          </label>
          <Textarea
            {...register("response_actions")}
            placeholder="Действия по нейтрализации угрозы..."
            className={`${inputClass} min-h-[80px] resize-none`}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Кнопка отправки */}
      <button
        type="submit"
        disabled={isLoading}
        className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#1E2B6D] px-4 py-3 font-semibold text-white transition hover:bg-[#162356] disabled:opacity-50"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" /> Сохранение...
          </span>
        ) : initialValue ? (
          "Сохранить изменения"
        ) : (
          "Создать отчет"
        )}
      </button>
    </form>
  );
}
