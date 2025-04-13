import { createContext } from "react";
import type { DashboardContextProps } from "@/modules/dashboard/types";

export const DashboardContext = createContext<
  DashboardContextProps | undefined
>(undefined);
