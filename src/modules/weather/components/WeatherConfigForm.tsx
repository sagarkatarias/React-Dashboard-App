// src/modules/weather/components/WeatherConfigForm.tsx
import React, { useState } from "react";
import { WeatherWidgetConfig } from "@/modules/weather/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

interface WeatherConfigFormProps {
  currentConfig: WeatherWidgetConfig;
  onSave: (newConfig: Partial<WeatherWidgetConfig>) => void; // Send partial update
}

const WeatherConfigForm: React.FC<WeatherConfigFormProps> = ({
  currentConfig,
  onSave,
}) => {
  const [location, setLocation] = useState(currentConfig?.location || "");
  const [unit, setUnit] = useState<"metric" | "imperial">(
    currentConfig?.unit || "metric"
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission if used in a <form>
    onSave({
      location: location.trim(), // Trim whitespace
      unit: unit,
    });
    // Modal closing is handled by the Dialog in WidgetContainer via onOpenChange/onSave prop call
  };

  return (
    // Use a form tag for better accessibility/semantics
    <form onSubmit={handleSave} className="space-y-4 p-1">
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., London, UK or Berlin"
        />
      </div>

      <div className="space-y-2">
        <Label>Units</Label>
        <RadioGroup
          value={unit}
          onValueChange={(value) => setUnit(value as "metric" | "imperial")} // Type assertion
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="metric" id="metric" />
            <Label htmlFor="metric">Metric (°C, m/s)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="imperial" id="imperial" />
            <Label htmlFor="imperial">Imperial (°F, mph)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant={"outline"}>
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default WeatherConfigForm;
