// src/components/ErrorDisplay.tsx
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorDisplayProps {
  error?: Error | unknown; // Accept Error object or other types
  title?: string;
  className?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  title = "Error",
  className,
}) => {
  const errorMessage =
    error instanceof Error ? error.message : "An unknown error occurred.";

  return (
    <Alert variant="destructive" className={cn("m-1 text-xs", className)}>
      <AlertCircle className="h-3 w-3" />
      <AlertTitle className="text-sm">{title}</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
};

export default ErrorDisplay;
