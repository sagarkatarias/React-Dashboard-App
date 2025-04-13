// src/modules/dashboard/components/AddWidgetMenu.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle } from "lucide-react";
import { WidgetType } from "@/modules/dashboard/types";

interface AddWidgetMenuProps {
  onAddWidget: (type: WidgetType) => void;
}

const availableWidgets: { type: WidgetType; label: string }[] = [
  { type: "weather", label: "Weather" },
  { type: "todo", label: "Todo List" },
  { type: "news", label: "News Feed" },
];

const AddWidgetMenu: React.FC<AddWidgetMenuProps> = ({ onAddWidget }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Widget
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {availableWidgets.map((widget) => (
          <DropdownMenuItem
            key={widget.type}
            onClick={() => onAddWidget(widget.type)}
          >
            {widget.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddWidgetMenu;
