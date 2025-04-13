// src/modules/weather/components/WeatherWidget.tsx
import React from "react";
import {
  WeatherContentProps,
  WeatherIconProps,
  WeatherWidgetProps,
} from "@/modules/weather/types";
import { useWeatherData } from "@/modules/weather/hooks/useWeatherData";
import { Wind, Droplet, Sunrise, Sunset, MapPin } from "lucide-react";
import ErrorDisplay from "@/components/ErrorDisplay";

import FallbackSkeleton from "@/components/FallbackSkeleton";

import WeatherDetailItem from "./WeatherDetailItem";
import { formatTemp, formatTime } from "@/lib/formatters";

const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

// Added React.memo for optimization
const WeatherIcon: React.FC<WeatherIconProps> = React.memo(
  ({ iconCode, description }) => {
    if (!iconCode) return null;
    return (
      <img
        src={getWeatherIconUrl(iconCode)}
        alt={description || "Weather icon"}
        className="w-10 h-10 flex-shrink-0"
        width="40"
        height="40"
        loading="lazy"
      />
    );
  }
);
WeatherIcon.displayName = "WeatherIcon"; // For better debugging

const WeatherContent: React.FC<WeatherContentProps> = React.memo(
  ({ location, unit }) => {
    const { data, isLoading, isError, error, isFetching } = useWeatherData(
      location,
      unit
    );

    if (isLoading) {
      return <FallbackSkeleton className="w-full h-[130px]" />; // Adjust height as needed
    }

    if (isError) {
      return <ErrorDisplay error={error} title="Weather Error" />;
    }

    const weatherInfo = data?.weather?.[0];
    const mainData = data?.main;
    const windData = data?.wind;
    const sysData = data?.sys;
    const timezoneOffset = data?.timezone;

    return (
      <div className="relative p-2 space-y-1.5 text-xs h-full flex flex-col justify-between">
        {isFetching && ( // Show only on refetch, not initial load
          <span className="text-xs text-muted-foreground absolute top-0.5 right-0.5 px-1 animate-pulse">
            ...
          </span>
        )}

        {/* Top section: Location, Description, Icon */}
        <div className="flex items-start justify-between space-x-1">
          <div className="min-w-0 flex-grow">
            <p
              className="text-sm font-semibold truncate text-foreground"
              title={`${data?.name}, ${sysData?.country}`}
            >
              {data?.name}, {sysData?.country}
            </p>
            <p
              className="text-xs text-muted-foreground capitalize truncate"
              title={weatherInfo?.description}
            >
              {weatherInfo?.description}
            </p>
          </div>
          <WeatherIcon
            iconCode={weatherInfo?.icon}
            description={weatherInfo?.description}
          />
        </div>

        {/* Middle section: Temperature */}
        <div className="flex items-baseline justify-between space-x-2">
          <p className="text-3xl font-bold text-foreground">
            {formatTemp(mainData?.temp, unit)}
          </p>
          <p className="text-xs text-muted-foreground">
            Feels like {formatTemp(mainData?.feels_like, unit)}
          </p>
        </div>

        {/* Bottom section: Details Grid */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-muted-foreground">
          <WeatherDetailItem
            icon={Droplet}
            label="Humidity"
            value={mainData?.humidity ?? "--"}
            unit="%"
          />
          <WeatherDetailItem
            icon={Wind}
            label="Wind"
            value={windData?.speed ? Math.round(windData.speed) : "--"}
            unit={unit === "metric" ? " m/s" : " mph"}
            className="justify-end"
          />
          <WeatherDetailItem
            icon={Sunrise}
            label="Sunrise"
            value={formatTime(sysData?.sunrise, timezoneOffset)}
          />
          <WeatherDetailItem
            icon={Sunset}
            label="Sunset"
            value={formatTime(sysData?.sunset, timezoneOffset)}
            className="justify-end"
          />
        </div>
      </div>
    );
  }
);
WeatherContent.displayName = "WeatherContent";

// Added React.memo for optimization
const WeatherWidget: React.FC<WeatherWidgetProps> = React.memo(({ config }) => {
  const { location, unit = "metric" } = config;

  // Handle No Location State
  if (!location) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-2 text-xs">
        <MapPin className="h-5 w-5 mb-1" />
        <span>Please set a location in the widget settings.</span>
      </div>
    );
  }
  return <WeatherContent location={location} unit={unit} />;
});
WeatherWidget.displayName = "WeatherWidget";

export default WeatherWidget;
