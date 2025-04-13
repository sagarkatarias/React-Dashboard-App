import React from "react";
import { WeatherDetailItemProps } from "../types";

const WeatherDetailItem: React.FC<WeatherDetailItemProps> = React.memo(
  ({ icon: Icon, label, value, unit, className }) => {
    const displayValue = `${value}${unit || ""}`;
    return (
      // Added items-baseline for better vertical alignment with icons
      <div className={`flex items-baseline space-x-1 ${className}`}>
        <Icon
          className="h-3 w-3 flex-shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <span className="truncate" title={`${label}: ${displayValue}`}>
          {displayValue}
        </span>
      </div>
    );
  }
);
WeatherDetailItem.displayName = "WeatherDetailItem";

export default WeatherDetailItem;
