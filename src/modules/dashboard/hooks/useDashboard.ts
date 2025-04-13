// src/modules/dashboard/hooks/useDashboard.ts
import { useContext } from "react";
import { DashboardContextProps } from "@/modules/dashboard/types";
import { DashboardContext } from "../state/Context";

export const useDashboard = (): DashboardContextProps => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
