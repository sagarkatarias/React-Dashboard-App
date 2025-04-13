// src/lib/formatters.ts

/**
 * Formats temperature value with unit symbol.
 */
export const formatTemp = (
  temp: number | undefined,
  unit: string = "metric"
): string => {
  if (temp === undefined) return "--";
  const symbol = unit === "metric" ? "°C" : "°F";
  return `${Math.round(temp)}${symbol}`;
};

/**
 * Formats a Unix timestamp to HH:MM time, adjusting for timezone offset.
 */
export const formatTime = (
  timestamp: number | undefined,
  timezoneOffset: number | undefined
): string => {
  if (timestamp === undefined || timezoneOffset === undefined) return "--:--";
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
};

/**
 * Formats an ISO 8601 date string or Date object to a readable date format.
 */
export const formatDate = (dateString: string | Date | undefined): string => {
  if (!dateString) return "";
  try {
    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;
    if (isNaN(date.getTime())) return "";

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      // Optional: add year, time etc.
      // year: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit'
    });
  } catch (e) {
    console.error("Error formatting date:", e);
    // Fallback for invalid date strings that Date() might accept initially
    return typeof dateString === "string" ? dateString : "";
  }
};
