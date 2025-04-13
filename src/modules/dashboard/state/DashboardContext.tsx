// src/modules/dashboard/state/DashboardContext.tsx
import React, { ReactNode } from "react";
import { useDashboardState } from "@/modules/dashboard/hooks/useDashboardState";

import { DashboardContext } from "./Context";

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
}) => {
  const dashboardState = useDashboardState();

  return (
    <DashboardContext.Provider value={dashboardState}>
      {children}
    </DashboardContext.Provider>
  );
};
