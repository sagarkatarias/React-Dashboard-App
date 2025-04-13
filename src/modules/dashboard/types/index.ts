// src/modules/dashboard/types/index.ts
import type { Layout } from "react-grid-layout";

import type { WeatherWidgetConfig } from "@/modules/weather/types";
import type { TodoWidgetConfig } from "@/modules/todo/types";
import type { NewsWidgetConfig } from "@/modules/news/types";

export type WidgetType = "weather" | "todo" | "news";

// Base config shared by all widgets
export interface BaseWidgetConfig {
  title?: string;
  refreshInterval?: number; // In minutes
}

export interface BaseWidgetProps {
  config: WidgetConfig;
  id: string;
}

export interface WidgetContainerProps {
  widget: DashboardWidget;
  removeWidget: (id: string) => void;
  updateWidgetConfig: (id: string, newConfig: Partial<WidgetConfig>) => void;
}

// Union of all possible specific widget configurations
export type WidgetConfig =
  | WeatherWidgetConfig
  | TodoWidgetConfig
  | NewsWidgetConfig;

// The definition of a widget instance on the dashboard grid
export interface DashboardWidget {
  i: string; // Unique Instance ID (key for RGL)
  x: number;
  y: number;
  w: number;
  h: number;
  widgetType: WidgetType;
  config: WidgetConfig; // Holds the specific config union type
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

export interface BaseConfigFormProps<
  C extends BaseWidgetConfig = BaseWidgetConfig
> {
  currentConfig: C;
  onSave: (newConfig: Partial<C>) => void;
}

// Type for the Dashboard Context Value
export interface DashboardContextProps {
  widgets: DashboardWidget[];
  handleLayoutChange: (newLayout: Layout[]) => void;
  addWidget: (type: WidgetType) => void;
  removeWidget: (id: string) => void;
  updateWidgetConfig: (id: string, newConfig: Partial<WidgetConfig>) => void;
  resetDashboard: () => void;
}
