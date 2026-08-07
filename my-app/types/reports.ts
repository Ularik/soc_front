export interface ReportType {
  detection_date: string;
  attack_type: string;
  source_ip: string;
  destination_ip: string;
  host: string | null;
  cve: string | null;
  detection_tool: "WAF" | "IPS" | "";
  short_description: string;
  methods: string;
  protocols_ports: string;
  risk_assessment: "Критическая" | "Высокая" | "Средняя" | "Низкая" | "";
  potential_impact: string;
  data_or_payload: string;
  response_actions: string;
}

export interface ApiReportResponse {
    result: ReportType;
}