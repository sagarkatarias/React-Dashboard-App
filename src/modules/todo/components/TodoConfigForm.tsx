// src/modules/todo/components/TodoConfigForm.tsx
import React, { useState } from "react";
import { TodoWidgetConfig } from "@/modules/todo/types";
import { BaseConfigFormProps } from "@/modules/dashboard/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const TodoConfigForm: React.FC<BaseConfigFormProps<TodoWidgetConfig>> = ({
  currentConfig,
  onSave,
}) => {
  const [title, setTitle] = useState(currentConfig?.title || "");
  const [filter, setFilter] = useState<"all" | "active" | "completed">(
    currentConfig?.filter || "all"
  );

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({
      title: title.trim(),
      filter: filter,
    });
  };

  const handleFilterChange = (value: string) => {
    setFilter(value as "all" | "active" | "completed");
  };

  return (
    <form onSubmit={handleSave} className="space-y-4 p-1 text-sm">
      {/* Title Input */}
      <div className="space-y-2">
        <Label htmlFor="todo-title">Widget Title (Optional)</Label>
        <Input
          id="todo-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder="My Todo List"
        />
      </div>

      {/* --- Filter Selection --- */}
      <div className="space-y-2">
        <Label>Show Tasks</Label>
        <RadioGroup
          value={filter}
          onValueChange={handleFilterChange} // Use specific handler
          className="flex space-x-4 pt-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="filter-all" />
            <Label htmlFor="filter-all">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="active" id="filter-active" />
            <Label htmlFor="filter-active">Active</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="completed" id="filter-completed" />
            <Label htmlFor="filter-completed">Completed</Label>
          </div>
        </RadioGroup>
      </div>
      {/* --- End Filter --- */}

      <div className="flex justify-end">
        <Button type="submit" variant="outline">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default TodoConfigForm;
