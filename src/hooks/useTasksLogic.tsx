import { useState, useCallback } from "react";
import { Task } from "@/types/Task"

export const useTasksLogic = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const addTask = useCallback((text: string) => {
    const newTask = {
      id: new Date().toLocaleString(),
      text,
      completed: false
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const saveEdit = useCallback((id: string, text: string) => {
    setTasks((prev) =>
      prev.map((task) => 
        task.id === id 
          ? { ...task, id: `Last change: ${new Date().toLocaleString()}`, text }
          : task
      )
    );
    setEditingTaskId(null);
  }, [])

  const cancelEdit = useCallback(() => {
    setEditingTaskId(null)
  }, [])

  return {
    tasks,
    editingTaskId,
    setTasks,
    addTask,
    toggleTask,
    deleteTask,
    setEditingTaskId,
    saveEdit,
    cancelEdit
  }
}