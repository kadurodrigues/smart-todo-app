import React, { createContext, useState, useContext, ReactNode } from "react"
import { getAiTaskSuggestions } from '@/services/aiService'

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskContextType {
  task: string;
  tasks: Task[];
  editingIndex: number | null;
  draggedIndex: number | null;
  aiSuggestion: string | null;
  isAILoading: boolean;
  isAISuggestionDialogOpen: boolean;
  addTask: () => void;
  setTask: (value: string) => void;
  removeTask: (id: string) => void;
  editTask: (index: number) => void;
  completeTask: (index: number) => void;
  cancelEdit: () => void;
  handleDragTaskStart: (index: number) => void;
  handleDragTaskOver: ($event: React.DragEvent, index: number) => void;
  handleDragTaskEnd: () => void;
  handleCreateTaskSuggestedByAI: () => void;
  saveEdit: () => void;
  generateTaskByAI: () => void;
} 

const TaskContext = createContext<TaskContextType>({
  task: '',
  tasks: [],
  editingIndex: null,
  draggedIndex: null,
  isAILoading: false,
  aiSuggestion: '',
  isAISuggestionDialogOpen: false,
  addTask: () => {},
  setTask: () => {},
  editTask: () => {},
  completeTask: () => {},
  saveEdit: () => {},
  cancelEdit: () => {},
  removeTask: () => {},
  handleDragTaskStart: () => {},
  handleDragTaskOver: () => {},
  handleDragTaskEnd: () => {},
  generateTaskByAI: () => {},
  handleCreateTaskSuggestedByAI: () => {},
} as TaskContextType );

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [aiSuggestion, setAISuggestion] = useState<string | null>('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [isAILoading, setIsAILoading] = useState(false)
  const [isAISuggestionDialogOpen, setIsAISuggestionDialogOpen] = useState(false)

  const addTask = () => {
    if (task.trim()) {
      const newTask = {
        id: new Date().toLocaleString(),
        text: task,
        completed: false
      }
      setTasks([...tasks, newTask])
      setTask('')
    }
  }

  const editTask = (index: number) => {
    setEditingIndex(index)
    setTask(tasks[index].text)
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const saveEdit = () => {
    if (task.trim()) {
      const newTasks = [...tasks];
      if (editingIndex !== null) {
        newTasks[editingIndex] = {
          id: `Last change: ${new Date().toLocaleString()}`,
          text: task,
          completed: false
        };
        setTasks(newTasks)
        setEditingIndex(null)
        setTask('')
      }
    }
  }

  const completeTask = (index: number) => {
    console.log('task', task)
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed
    setTasks(newTasks)
  }

  const cancelEdit = () => {
    setTask('')
    setEditingIndex(null)
  }

  const handleDragTaskStart = (index: number) => {
    setDraggedIndex(index);
  }

  const handleDragTaskOver = ($event: React.DragEvent, index: number) => {
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
  }

  const handleDragTaskEnd = () => {
    setDraggedIndex(null)
  }

  const handleCreateTaskSuggestedByAI = () => {
    const match1 = aiSuggestion && aiSuggestion.match(/"([^"]+)"/)
    const match2 = aiSuggestion && aiSuggestion.match(/\*\*"([^"]+)"\*\*/);
    const suggestion = (match1 && match1[1]) ? match1[1] : (match2 && match2[1]) ? match2[1] : aiSuggestion
    
    const newTask = {
      id: new Date().toLocaleString(),
      text: suggestion || '',
      completed: false
    }

    setTasks([...tasks, newTask])
    setIsAISuggestionDialogOpen(false)
  }

  const generateTaskByAI = async () => {
    try {
      setIsAILoading(true)
      const prevTasks = tasks.map(t => t.text).reduce((acc, cur) => `${acc}, ` + cur)
      const aiSuggestions = await getAiTaskSuggestions(prevTasks)
      aiSuggestions.forEach(s =>setAISuggestion(s.message.content))
      setIsAISuggestionDialogOpen(true)
    } catch (error) {
      throw new Error(`API Error: ${error}`);
    } finally {
      setIsAILoading(false)
    }
  }

  const value = {
    task,
    tasks,
    editingIndex,
    draggedIndex,
    aiSuggestion,
    isAILoading,
    isAISuggestionDialogOpen,
    addTask,
    setTask,
    removeTask,
    completeTask,
    editTask,
    cancelEdit,
    saveEdit,
    handleDragTaskStart,
    handleDragTaskOver,
    handleCreateTaskSuggestedByAI,
    handleDragTaskEnd,
    generateTaskByAI,
  }

  return (
    <TaskContext.Provider value={value}>
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