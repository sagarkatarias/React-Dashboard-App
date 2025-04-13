// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DashboardProvider } from "@/modules/dashboard/state/DashboardContext";
import DashboardView from "@/modules/dashboard/components/DashboardView";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Wrap the part of the app needing dashboard state */}
      <DashboardProvider>
        <DashboardView />
      </DashboardProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
