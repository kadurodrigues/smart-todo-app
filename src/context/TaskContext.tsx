import React, { createContext, useState, useContext, ReactNode } from "react"
import { getAiTaskSuggestions } from '@/services/aiService'

interface Task {
  id: string;
  text: string;
}

interface TaskContextType {
  task: string;
  tasks: Task[];
  editingIndex: number | null;
  isAILoading: boolean;
  addTask: () => void;
  setTask: (value: string) => void;
  removeTask: (id: string) => void;
  editTask: (index: number) => void;
  cancelEdit: () => void;
  saveEdit: () => void;
  generateTaskByAI: () => void;
} 

const TaskContext = createContext<TaskContextType>({
  task: '',
  tasks: [],
  editingIndex: null,
  isAILoading: false,
  addTask: () => {},
  setTask: () => {},
  editTask: () => {},
  saveEdit: () => {},
  cancelEdit: () => {},
  removeTask: () => {},
  generateTaskByAI: () => {}
} as TaskContextType );

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isAILoading, setIsAILoading] = useState(false)

  const addTask = () => {
    if (task.trim()) {
      const newTask = {
        id: new Date().toLocaleString(),
        text: task
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
          text: task
        };
        setTasks(newTasks)
        setEditingIndex(null)
        setTask('')
      }
    }
  }

  const cancelEdit = () => {
    setTask('')
    setEditingIndex(null)
  }

  const generateTaskByAI = async () => {
    try {
      setIsAILoading(true)
      const prevTasks = tasks.map(t => t.text).reduce((acc, cur) => `${acc}, ` + cur)
      const aiSuggestions = await getAiTaskSuggestions(prevTasks)
      aiSuggestions.forEach(s => {
        const taskGenerateByAI = {
          id: new Date().toLocaleString(),
          text: s.message.content || ''
        }
        setTasks([...tasks, taskGenerateByAI])
      })
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
    isAILoading,
    addTask,
    setTask,
    removeTask,
    editTask,
    cancelEdit,
    saveEdit,
    generateTaskByAI
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