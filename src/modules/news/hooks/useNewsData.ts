// src/modules/news/hooks/useNewsData.ts
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchNewsData } from "@/modules/news/services/newsApi";
import { NewsApiResponse, NewsWidgetConfig } from "@/modules/news/types";

type QueryKey = [string, NewsWidgetConfig];

export const useNewsData = (
  config: NewsWidgetConfig,
  options?: Omit<
    UseQueryOptions<NewsApiResponse, Error, NewsApiResponse, QueryKey>,
    "queryKey" | "queryFn" | "enabled"
  >
) => {
  const queryKey: QueryKey = ["news", config]; // Use config object in key

  return useQuery<NewsApiResponse, Error, NewsApiResponse, QueryKey>({
    queryKey: queryKey,

    queryFn: () => fetchNewsData(config),

    // Only enable if configuration seems valid
    enabled: !!(
      (config.sourceType === "category" && config.category) ||
      (config.sourceType === "keywords" && config.keywords)
    ),

    staleTime: 1000 * 60 * 15, // Consider fresh for 15 minutes
    // Use refresh interval from config if provided (convert minutes to ms), else disable
    refetchInterval: config.refreshInterval
      ? config.refreshInterval * 60 * 1000
      : false,
    refetchOnWindowFocus: true,
    retry: 1,
    ...options,
  });
};
