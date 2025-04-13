// src/modules/todo/components/TodoWidget.tsx
import React, { useCallback, useMemo } from "react"; // Import useMemo
import { TodoWidgetProps } from "@/modules/todo/types"; // Import TodoItem
import { useTodoState } from "@/modules/todo/hooks/useTodoState";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import TodoItem from "./TodoItem";

const TodoWidget: React.FC<TodoWidgetProps> = ({ config, id }) => {
  const {
    todos, // Raw list from hook
    newTaskText,
    setNewTaskText,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  } = useTodoState(id);

  const { filter = "all" } = config; // Default config setting

  // --- Apply Filtering ---
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "all":
      default:
        return todos;
    }
  }, [todos, filter]);

  const handleAddSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      addTodo();
    },
    [addTodo]
  );

  const completedCount = useMemo(
    () => todos.filter((t) => t.completed).length,
    [todos]
  );

  return (
    <div className="flex flex-col h-full text-sm">
      <form
        onSubmit={handleAddSubmit}
        className="flex space-x-2 p-1 border-b mb-1"
      >
        <Input
          type="text"
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="h-8 text-xs"
        />
        <Button
          type="submit"
          variant="outline"
          size="sm"
          className="h-8 px-2.5"
          disabled={!newTaskText.trim()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </form>
      {/* Todo List - Use filteredTodos */}
      <ScrollArea className="flex-grow pr-3">
        {filteredTodos.length === 0 && (
          <p className="text-muted-foreground text-center text-xs py-4">
            {filter === "completed"
              ? "No completed tasks."
              : filter === "active"
              ? "No active tasks."
              : "No tasks yet!"}
          </p>
        )}
        <ul className="space-y-0.5">
          {/* --- Map over filteredTodos --- */}
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              id={id}
            />
          ))}
        </ul>
      </ScrollArea>

      {/* Footer Actions (conditionally render based on completedCount) */}
      {todos.length > 0 && completedCount > 0 && (
        <div className="pt-2 mt-auto border-t flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            {completedCount} / {todos.length} completed
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground px-1 h-auto"
            onClick={clearCompleted}
          >
            Clear Completed
          </Button>
        </div>
      )}
    </div>
  );
};

export default TodoWidget;
