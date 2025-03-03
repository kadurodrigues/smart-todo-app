import { useState, useCallback, useEffect } from "react";
import { Task } from "@/types/Task";
import formatDate from "@/utils/formatDate";
import TaskService from "@/services/taskService";

export const useTasksLogic = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log("Tasks state updated:", tasks);
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const data = await TaskService.getTasks();
      setTasks(() => data.map(t => ({ 
        ...t,
        createdAt: t.createdAt ? formatDate(t.createdAt) : '',
        updatedAt: t.updatedAt ? formatDate(t.updatedAt) : ''
      })));
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = useCallback(async (text: string) => {
    try {
      await TaskService.addTask(text);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const toggleTask = async (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task?.id) {
      await TaskService.toggleTask(id, task.completed);
      fetchTasks();
    }
  };

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const saveEdit = useCallback(async (id: string, text: string) => {
    try {
      await TaskService.updateTask(id, text);
      fetchTasks();
      setEditingTaskId(null);
    } catch (error) {
      console.error(error);
    }
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