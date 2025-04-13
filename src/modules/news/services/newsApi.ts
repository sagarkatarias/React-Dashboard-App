// src/modules/news/services/newsApi.ts
import { NewsApiResponse, NewsWidgetConfig } from "@/modules/news/types";
import {
  NEWSAPI_API_KEY,
  NEWSAPI_BASE_URL_HEADLINES,
  NEWSAPI_BASE_URL_EVERYTHING,
  NEWSAPI_DEFAULT_PAGE_SIZE,
  NEWSAPI_MAX_PAGE_SIZE_CONFIG,
} from "@/config/constants";

export const fetchNewsData = async (
  config: NewsWidgetConfig
): Promise<NewsApiResponse> => {
  if (!NEWSAPI_API_KEY) {
    throw new Error(
      "NewsAPI key not found. Please set VITE_NEWSAPI_NEWSAPI_API_KEY in your .env file."
    );
  }

  let url = "";
  const pageSize = Math.min(
    config.pageSize || NEWSAPI_DEFAULT_PAGE_SIZE,
    NEWSAPI_MAX_PAGE_SIZE_CONFIG
  );
  const params = new URLSearchParams({
    apiKey: NEWSAPI_API_KEY,
    pageSize: pageSize.toString(),
  });

  if (config.sourceType === "category" && config.category) {
    url = NEWSAPI_BASE_URL_HEADLINES;
    params.append("category", config.category);
  } else if (config.sourceType === "keywords" && config.keywords) {
    url = NEWSAPI_BASE_URL_EVERYTHING;
    params.append("q", config.keywords);
  } else {
    throw new Error(
      "News widget requires either a category or keywords to be configured."
    );
  }

  const fullUrl = `${url}?${params.toString()}`;

  try {
    const response = await fetch(fullUrl);
    const data: NewsApiResponse = await response.json();

    if (data.status === "error") {
      throw new Error(
        `NewsAPI Error: ${data.message || data.code || "Unknown error"}`
      );
    }

    if (!response.ok) {
      // This case might be redundant if status='error' covers it, but good practice
      throw new Error(`Network response was not ok (${response.status})`);
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch news data:", error);
    //  Re-throw the error so the caller (useQuery) knows it failed
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred while fetching news.");
  }
};
