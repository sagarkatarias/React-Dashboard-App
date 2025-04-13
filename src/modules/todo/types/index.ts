import { BaseWidgetConfig } from "@/modules/dashboard/types";

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoWidgetConfig extends BaseWidgetConfig {
  filter?: "all" | "active" | "completed";
}

export interface TodoItemProps {
  todo: TodoItem;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  id: string;
}

export interface TodoWidgetProps {
  config: TodoWidgetConfig;
  id: string;
}
