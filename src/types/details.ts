export interface Summary {
  display_name: string;
  display_unit: string;
  value: number;
  slug: string;
}

export interface Metric {
  display_name: string;
  display_unit: string;
  max_value: number;
  average_value: number;
  values: number[];
  slug: string;
}

export interface Details {
  duration: number;
  summaries: Summary[];
  metrics: Metric[];
}
