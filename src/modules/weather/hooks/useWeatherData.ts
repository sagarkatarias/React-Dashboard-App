// src/modules/weather/hooks/useWeatherData.ts
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchWeatherData } from "@/modules/weather/services/weatherApi"; // Adjust the import path as needed
import { WeatherApiResponse, WeatherApiError } from "@/modules/weather/types";

// Custom hook to fetch weather data
export const useWeatherData = (
  location: string | undefined,
  unit: "metric" | "imperial" = "metric",
  options?: Omit<
    UseQueryOptions<
      WeatherApiResponse,
      Error | WeatherApiError,
      WeatherApiResponse,
      (string | undefined)[]
    >,
    "queryKey" | "queryFn" | "enabled"
  >
) => {
  return useQuery<
    WeatherApiResponse,
    Error | WeatherApiError,
    WeatherApiResponse,
    (string | undefined)[]
  >({
    queryKey: ["weather", location, unit],

    queryFn: () => {
      if (!location) {
        // Should not happen if 'enabled' is false, but good practice
        return Promise.reject(new Error("Location is required."));
      }
      return fetchWeatherData(location, unit);
    },

    // Enable the query only if a location is provided
    enabled: !!location,

    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30, // Changed from cacheTime to gcTime
    refetchOnWindowFocus: true, // Refetch when window regains focus (good for weather)
    retry: 1,
    ...options,
  });
};
