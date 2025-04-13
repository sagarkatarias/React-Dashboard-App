import { BaseWidgetConfig } from "@/modules/dashboard/types";

// Based on NewsAPI structure
export interface NewsArticleSource {
  id: string | null;
  name: string;
}

export interface NewsArticle {
  source: NewsArticleSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string; // ISO 8601 date string
  content: string | null;
}

export interface NewsApiResponse {
  status: "ok" | "error";
  totalResults?: number;
  articles?: NewsArticle[];
  code?: string; // For errors
  message?: string; // For errors
}

// Define possible categories for NewsAPI top-headlines
export type NewsCategory =
  | "business"
  | "entertainment"
  | "general"
  | "health"
  | "science"
  | "sports"
  | "technology";

// Configuration for the News widget
export interface NewsWidgetConfig extends BaseWidgetConfig {
  sourceType?: "category" | "keywords"; // Use category OR keywords
  category?: NewsCategory;
  keywords?: string;
  pageSize?: number;
}
