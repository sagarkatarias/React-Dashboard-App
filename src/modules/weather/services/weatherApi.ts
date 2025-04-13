// src/modules/weather/services/weatherApi.ts
import { WeatherApiResponse } from "@/modules/weather/types";
import {
  OPENWEATHERMAP_API_KEY,
  OPENWEATHERMAP_BASE_URL,
} from "@/config/constants";

export const fetchWeatherData = async (
  location: string,
  units: "metric" | "imperial" = "metric"
): Promise<WeatherApiResponse> => {
  if (!OPENWEATHERMAP_API_KEY) {
    throw new Error(
      "OpenWeatherMap API key not found. Please set VITE_OPENWEATHERMAP_API_KEY in your .env file."
    );
  }
  if (!location) {
    throw new Error("Location is required to fetch weather data.");
  }

  const url = `${OPENWEATHERMAP_BASE_URL}?q=${encodeURIComponent(
    location
  )}&units=${units}&appid=${OPENWEATHERMAP_API_KEY}`; // Use encodeURIComponent to safely encode the location

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown API error" })); // Try to parse error details
    if (response.status === 401)
      throw new Error(
        `API Error (Unauthorized): ${errorData.message || "Invalid API Key?"}`
      );
    if (response.status === 404)
      throw new Error(
        `API Error (Not Found): ${errorData.message || "Location not found?"}`
      );
    throw new Error(
      `API Error (${response.status}): ${
        errorData.message || response.statusText
      }`
    );
  }

  const data: WeatherApiResponse = await response.json();
  return data;
};
