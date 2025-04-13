import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "@/hooks/useLocalStorage"; // Use generic hook
import { TodoItem } from "@/modules/todo/types";
import { LOCAL_STORAGE_TODO_WIDGET_PREFIX } from "@/config/constants";

export function useTodoState(widgetId: string) {
  const storageKey = `${LOCAL_STORAGE_TODO_WIDGET_PREFIX}${widgetId}`;
  const [todos, setTodos] = useLocalStorage<TodoItem[]>(storageKey, []);
  const [newTaskText, setNewTaskText] = useState("");

  const addTodo = useCallback(() => {
    const text = newTaskText.trim();
    if (!text) return; // Prevent adding empty tasks
    const newTodo: TodoItem = { id: uuidv4(), text: text, completed: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTaskText(""); // Clear input after adding
  }, [newTaskText, setTodos]);

  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    },
    [setTodos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    },
    [setTodos]
  );

  const clearCompleted = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }, [setTodos]);

  return {
    todos,
    newTaskText,
    setNewTaskText,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  };
}
