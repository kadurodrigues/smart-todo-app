import React, { createContext, useContext, ReactNode } from "react"
import { useTasksLogic } from '@/hooks/useTasksLogic'
import { useTasksOrdering } from "@/hooks/useTasksOrdering";
import { Task } from "@/types/Task"
import { useAITasksSuggestion } from "@/hooks/useAITasksSuggestion";

interface TaskContextType {
  tasks: Task[];
  editingTaskId: string | null;
  draggedIndex: number | null;
  aiSuggestion: string | null;
  isAILoading: boolean;
  isAISuggestionDialogOpen: boolean;
  addTask: (text: string) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
  setEditingTaskId: (id: string | null) => void;
  setIsAISuggestionDialogOpen: (value: boolean) => void;
  saveEdit: (id: string, text: string) => void;
  toggleTask: (index: string) => void;
  cancelEdit: () => void;
  onDragTaskStart: (index: number) => void;
  onDragTaskOver: ($event: React.DragEvent, index: number) => void;
  onDragTaskEnd: () => void;
  handleCreateTaskSuggestedByAI: () => void;
  handleGenerateTaskByAI: () => void;
} 

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const {
    tasks,
    editingTaskId,
    addTask,
    deleteTask,
    saveEdit,
    setTasks,
    setEditingTaskId,
    cancelEdit,
    toggleTask
  } = useTasksLogic()

  const {
    draggedIndex,
    onDragTaskStart,
    onDragTaskOver,
    onDragTaskEnd
  } = useTasksOrdering(tasks, setTasks)

  const {
    aiSuggestion,
    isAILoading,
    isAISuggestionDialogOpen,
    setIsAISuggestionDialogOpen,
    handleCreateTaskSuggestedByAI,
    handleGenerateTaskByAI
  } = useAITasksSuggestion(tasks, setTasks)

  return (
    <TaskContext.Provider value={{
      tasks,
      editingTaskId,
      draggedIndex,
      aiSuggestion,
      isAILoading,
      isAISuggestionDialogOpen,
      addTask,
      deleteTask,
      toggleTask,
      setTasks,
      setEditingTaskId,
      setIsAISuggestionDialogOpen,
      cancelEdit,
      saveEdit,
      onDragTaskStart,
      onDragTaskOver,
      onDragTaskEnd,
      handleCreateTaskSuggestedByAI,
      handleGenerateTaskByAI,
    }}>
      { children }
    </TaskContext.Provider>
  )
}

export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  
  return context;
};