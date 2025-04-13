// src/modules/weather/types/index.ts
import { BaseWidgetConfig } from "@/modules/dashboard/types";

export interface WeatherWidgetConfig extends BaseWidgetConfig {
  location?: string;
  unit?: "metric" | "imperial";
}

export interface WeatherInfo {
  id: number;
  main: string; // e.g., "Clouds"
  description: string; // e.g., "overcast clouds"
  icon: string; // e.g., "04d"
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WindData {
  speed: number;
  deg: number;
}

export interface SysData {
  country: string;
  sunrise: number; // Unix timestamp
  sunset: number; // Unix timestamp
}

export interface WeatherApiResponse {
  coord: { lon: number; lat: number };
  weather: WeatherInfo[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindData;
  clouds: { all: number };
  dt: number; // Unix timestamp of data calculation
  sys: SysData;
  timezone: number; // Shift in seconds from UTC
  id: number; // City ID
  name: string; // City name
  cod: number; // Response code (e.g., 200)
}

export interface WeatherApiError {
  cod: string | number;
  message: string;
}

export interface WeatherContentProps {
  location: string;
  unit: "metric" | "imperial";
}

export interface WeatherDetailItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  unit?: string;
  className?: string; // For additional styling like text alignment
}

export interface WeatherWidgetProps {
  config: WeatherWidgetConfig;
}

export interface WeatherIconProps {
  iconCode?: string;
  description?: string;
}
