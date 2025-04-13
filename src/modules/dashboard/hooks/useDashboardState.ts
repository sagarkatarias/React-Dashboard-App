// src/modules/dashboard/hooks/useDashboardState.ts
import { useState, useEffect, useCallback } from "react";
import { Layout } from "react-grid-layout";
import { v4 as uuidv4 } from "uuid";
import { debounce } from "lodash";
import {
  DashboardWidget,
  WidgetConfig,
  WidgetType,
} from "@/modules/dashboard/types";
import { LOCAL_STORAGE_DASHBOARD_LAYOUT_KEY } from "@/config/constants";

// Define a default layout when the app is first loaded or reset layout is triggered
const getDefaultLayout = (): DashboardWidget[] => {
  return [
    {
      i: uuidv4(),
      x: 0,
      y: 0,
      w: 3,
      h: 3,
      widgetType: "weather",
      config: { location: "Berlin" },
    },
  ];
};

// Debounce the localStorage saving function
const saveLayoutDebounced = debounce((layout: DashboardWidget[]) => {
  try {
    localStorage.setItem(
      LOCAL_STORAGE_DASHBOARD_LAYOUT_KEY,
      JSON.stringify(layout)
    );
  } catch (error) {
    console.error("Layout data that failed:", layout, error);
  }
}, 1000);

export function useDashboardState() {
  const [widgets, setWidgets] = useState<DashboardWidget[]>(() => {
    try {
      const savedLayout = localStorage.getItem(
        LOCAL_STORAGE_DASHBOARD_LAYOUT_KEY
      );
      return savedLayout ? JSON.parse(savedLayout) : getDefaultLayout();
    } catch (error) {
      console.error("Failed to load layout from localStorage:", error);
      return getDefaultLayout();
    }
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only save after initial load to prevent overwriting on mount potentially
    if (isInitialized) {
      saveLayoutDebounced(widgets);
    } else {
      // Mark as initialized after the first render cycle completes
      setIsInitialized(true);
    }
  }, [widgets, isInitialized]);

  // Callback for react-grid-layout's onLayoutChange
  const handleLayoutChange = useCallback((newLayout: Layout[]) => {
    setWidgets((currentWidgets) => {
      const updatedWidgets = currentWidgets
        .map((widget) => {
          const layoutItem = newLayout.find((item) => item.i === widget.i);
          if (layoutItem) {
            return {
              ...widget,
              x: layoutItem.x,
              y: layoutItem.y,
              w: layoutItem.w, // Applying size from RGL
              h: layoutItem.h, // Applying size from RGL
            };
          }
          return widget; // Return unchanged if not found in newLayout
        })
        .sort((a, b) => {
          if (a.y !== b.y) return a.y - b.y;
          return a.x - b.x;
        });
      return updatedWidgets;
    });
  }, []);

  const addWidget = useCallback(
    (type: WidgetType) => {
      // Simple placement logic: find the lowest Y, then leftmost X
      // A more robust solution might track empty spaces
      const y = widgets.reduce((maxY, w) => Math.max(maxY, w.y + w.h), 0);
      const initialWidth = 2; // Or your desired width
      const initialHeight = 2; // Or your desired height
      const newWidget: DashboardWidget = {
        i: uuidv4(),
        x: 0, // react-grid-layout will often handle collisions and placement
        y: y, // Place below existing widgets
        w: initialWidth, // Default width
        h: initialHeight, // Default height
        widgetType: type,
        config: {}, // Start with empty config, specific defaults can be added
        minW: 2, // Example constraints
        minH: 2,
      };
      setWidgets((currentWidgets) => [...currentWidgets, newWidget]);
    },
    [widgets]
  ); // Depends on widgets for placement logic

  const removeWidget = useCallback((id: string) => {
    setWidgets((currentWidgets) =>
      currentWidgets.filter((widget) => widget.i !== id)
    );
  }, []);

  const updateWidgetConfig = useCallback(
    (id: string, newConfig: Partial<WidgetConfig>) => {
      setWidgets((currentWidgets) =>
        currentWidgets.map((widget) =>
          widget.i === id
            ? { ...widget, config: { ...widget.config, ...newConfig } }
            : widget
        )
      );
    },
    []
  );

  const resetDashboard = useCallback(() => {
    setWidgets(getDefaultLayout());
    // Optionally clear localStorage immediately too, though the useEffect will handle it
  }, []);

  return {
    widgets,
    handleLayoutChange,
    addWidget,
    removeWidget,
    updateWidgetConfig,
    resetDashboard,
  };
}
