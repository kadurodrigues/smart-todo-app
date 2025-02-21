import { useState, useCallback } from "react";
import { Task } from "@/types/Task";

export const useTasksOrdering = (tasks: Task[], setTasks: (tasks: Task[]) => void) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const onDragTaskStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, [setDraggedIndex])

  const onDragTaskOver = useCallback(($event: React.DragEvent, index: number) => {
    $event.preventDefault();

    if (draggedIndex === null) return;

    if (draggedIndex !== index) {
      const newTasks = [...tasks];
      const draggedTask = newTasks[draggedIndex];
      newTasks.splice(draggedIndex, 1);
      newTasks.splice(index, 0, draggedTask);
      setTasks(newTasks);
      setDraggedIndex(index);
    }
  }, [draggedIndex, setDraggedIndex, tasks, setTasks])

  const onDragTaskEnd = useCallback(() => {
    setDraggedIndex(null)
  }, [])

  return {
    draggedIndex,
    onDragTaskStart,
    onDragTaskOver,
    onDragTaskEnd
  }
}