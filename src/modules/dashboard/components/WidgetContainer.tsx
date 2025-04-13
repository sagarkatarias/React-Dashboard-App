// src/modules/dashboard/components/WidgetContainer.tsx
import React, { useState } from "react";
import {
  WidgetConfig,
  WidgetType,
  BaseWidgetProps,
  WidgetContainerProps,
} from "@/modules/dashboard/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Settings, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import widget components statically for simplicity initially
import { WeatherWidget, WeatherConfigForm } from "@/modules/weather";
import { TodoWidget, TodoConfigForm } from "@/modules/todo";
import { NewsWidget, NewsConfigForm } from "@/modules/news";
import ErrorDisplay from "@/components/ErrorDisplay";
import CustomTooltip from "@/components/CustomTooltip";

// const WeatherWidget = React.lazy(() => import('@/modules/weather/components/WeatherWidget'));
// const WeatherConfigForm = React.lazy(() => import('@/modules/weather/components/WeatherConfigForm'));

const WIDGET_COMPONENTS: Record<
  WidgetType,
  React.ComponentType<BaseWidgetProps>
> = {
  weather: WeatherWidget,
  todo: TodoWidget,
  news: NewsWidget,
};

// Use 'any' for config form map value type due to the complexity of typing heterogeneous components generics within a simple Record.
// Type safety is primarily enforced by the individual ConfigForm components' props
// and how they are used within WidgetContainer's render logic.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WIDGET_CONFIG_FORMS: Record<WidgetType, React.ComponentType<any>> = {
  weather: WeatherConfigForm,
  todo: TodoConfigForm,
  news: NewsConfigForm,
};

const WidgetContainer: React.FC<WidgetContainerProps> = React.memo(
  ({ widget, removeWidget, updateWidgetConfig }) => {
    const { i: id, widgetType, config } = widget;
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    const SpecificWidgetComponent = WIDGET_COMPONENTS[widgetType];
    const SpecificConfigFormComponent = WIDGET_CONFIG_FORMS[widgetType];

    if (!SpecificWidgetComponent) {
      return (
        <ErrorDisplay
          error={`Unknown widget type: ${widgetType}`}
          title="Widget Load Error"
        />
      );
    }

    const handleConfigSave = (newConfig: Partial<WidgetConfig>) => {
      updateWidgetConfig(id, newConfig);
      setIsConfigOpen(false); // Close modal on save
    };

    const getWidgetTitle = (type: WidgetType, config: WidgetConfig): string => {
      return (
        config.title?.trim() ||
        type.charAt(0).toUpperCase() + type.slice(1) + " Widget"
      );
    };

    return (
      <TooltipProvider delayDuration={100}>
        <Card className="flex flex-col h-full overflow-hidden shadow  border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2  cursor-move">
            <div className="flex items-center space-x-2 flex-grow min-w-0">
              <CustomTooltip title="Drag to move">
                <span
                  className="widget-drag-icon-handle cursor-move p-1 text-muted-foreground flex-shrink-0" // ADDED NEW CLASS and flex-shrink-0
                  title="Drag to move" // Accessibility
                >
                  <GripVertical className="h-5 w-5" />
                </span>
              </CustomTooltip>
              <CardTitle className="text-sm font-medium">
                {getWidgetTitle(widgetType, config)}
              </CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              {/* Conditionally render settings button if config form exists */}
              {SpecificConfigFormComponent && (
                <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
                  <CustomTooltip title="Change configuration">
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <Settings className="h-4 w-4" />
                        <span className="sr-only">Settings</span>
                      </Button>
                    </DialogTrigger>
                  </CustomTooltip>
                  <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
                    <DialogHeader>
                      <DialogTitle>
                        Configure {getWidgetTitle(widgetType, config)}
                      </DialogTitle>
                    </DialogHeader>
                    <SpecificConfigFormComponent
                      currentConfig={config}
                      onSave={handleConfigSave}
                    />
                    {/* DialogFooter might be part of the form itself */}
                  </DialogContent>
                </Dialog>
              )}
              <CustomTooltip title="Remove widget">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                  onClick={() => removeWidget(id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </CustomTooltip>
            </div>
          </CardHeader>
          <CardContent className="pt-2 flex-grow overflow-y-auto">
            <SpecificWidgetComponent config={config} id={id} />
          </CardContent>
        </Card>
      </TooltipProvider>
    );
  }
);

WidgetContainer.displayName = "WidgetContainer"; // Good practice with memo/forwardRef
export default WidgetContainer;
