// src/modules/dashboard/components/DashboardGrid.tsx
import React, { useMemo } from "react";
import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import { useDashboard } from "@/modules/dashboard/hooks/useDashboard";
import WidgetContainer from "./WidgetContainer";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

const DashboardGrid: React.FC = () => {
  const { widgets, handleLayoutChange, removeWidget, updateWidgetConfig } =
    useDashboard();

  const generateLayouts = useMemo((): Layouts => {
    const layoutsObj: Layouts = {};
    // Create the specific layout array structure needed by RGL items
    const layout = widgets.map((w) => ({
      i: w.i,
      x: w.x,
      y: w.y,
      w: w.w, // Use w from our state
      h: w.h, // Use h from our state
      minW: w.minW,
      minH: w.minH,
      maxW: w.maxW,
      maxH: w.maxH,
    }));
    // Assign this same layout structure to all defined breakpoints
    // RGL will handle adapting items based on the 'cols' prop for each breakpoint
    for (const breakpoint of Object.keys(breakpoints)) {
      layoutsObj[breakpoint] = layout;
    }
    return layoutsObj;
  }, [widgets]);

  return (
    <ResponsiveReactGridLayout
      className="layout"
      breakpoints={breakpoints}
      layouts={generateLayouts}
      cols={cols}
      rowHeight={100}
      compactType={"vertical"}
      isDraggable={true}
      isResizable={true}
      onLayoutChange={(currentLayout: Layout[]) => {
        handleLayoutChange(currentLayout);
      }}
      margin={[10, 10]}
      draggableHandle=".widget-drag-icon-handle" // Custom handle for dragging
      measureBeforeMount={false} // Set to false for better performance
      useCSSTransforms={true} // Use CSS transforms for better performance
    >
      {widgets.map((widget) => (
        <div key={widget.i} className=" overflow-hidden">
          <WidgetContainer
            widget={widget}
            // Pass down actions from context
            removeWidget={removeWidget}
            updateWidgetConfig={updateWidgetConfig}
          />
        </div>
      ))}
    </ResponsiveReactGridLayout>
  );
};

export default DashboardGrid;
