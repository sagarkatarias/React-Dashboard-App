// src/config/constants.ts

// Local Storage Keys
export const LOCAL_STORAGE_DASHBOARD_LAYOUT_KEY = "dashboardLayout-v1";
export const LOCAL_STORAGE_TODO_WIDGET_PREFIX = "todoWidgetState-";

// It's often good practice to read these once here or at the top of service files
export const OPENWEATHERMAP_API_KEY = import.meta.env
  .VITE_OPENWEATHERMAP_API_KEY;
export const NEWSAPI_API_KEY = import.meta.env.VITE_NEWSAPI_API_KEY;

// API Base URLs
export const OPENWEATHERMAP_BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather";
export const NEWSAPI_BASE_URL_HEADLINES =
  "https://newsapi.org/v2/top-headlines";
export const NEWSAPI_BASE_URL_EVERYTHING = "https://newsapi.org/v2/everything";

export const NEWSAPI_MAX_PAGE_SIZE_CONFIG = 10;
export const NEWSAPI_DEFAULT_PAGE_SIZE = 2;
