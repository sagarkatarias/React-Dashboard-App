import React from "react";
import { useDashboard } from "@/modules/dashboard/hooks/useDashboard";
import DashboardGrid from "./DashboardGrid";
import AddWidgetMenu from "./AddWidgetMenu";
import { Button } from "@/components/ui/button";

const DashboardView: React.FC = () => {
  const { addWidget, resetDashboard } = useDashboard();

  return (
    // The main layout structure for the dashboard page
    <div className="min-h-screen bg-background text-foreground p-4">
      <header className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button onClick={resetDashboard} variant="outline" size="sm">
            Reset Layout
          </Button>
          <AddWidgetMenu onAddWidget={addWidget} />
        </div>
      </header>

      <main>
        <DashboardGrid />
      </main>
    </div>
  );
};

export default DashboardView;
