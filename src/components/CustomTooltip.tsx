import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CustomTooltipProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const CustomTooltip = ({
  title,
  children,
  className = "",
}: CustomTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p className={className}>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CustomTooltip;
