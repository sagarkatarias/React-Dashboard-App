// src/modules/todo/components/TodoItem.tsx
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { TodoItemProps } from "../types";
import { Label } from "@radix-ui/react-label";

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodo,
  deleteTodo,
  id,
}) => {
  return (
    <li key={todo.id} className="flex items-center space-x-2 group">
      <Checkbox
        id={`todo-${todo.id}-${id}`}
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
      />
      <Label
        id={`todo-label-${todo.id}-${id}`}
        htmlFor={`todo-${todo.id}-${id}`}
        className={`flex-grow cursor-pointer ${
          todo.completed ? "line-through text-muted-foreground" : ""
        }`}
      >
        {todo.text}
      </Label>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => deleteTodo(todo.id)}
        aria-label={`Delete task ${todo.text}`} // Accessibility
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </li>
  );
};

export default TodoItem;
