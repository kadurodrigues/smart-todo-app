import { useState, useCallback } from "react";
import { getAiTaskSuggestions } from '@/services/aiService'
import { Task } from "@/types/Task";

export const useAITasksSuggestion = (tasks: Task[], setTasks: (tasks: Task[]) => void) => {
  const [aiSuggestion, setAISuggestion] = useState<string | null>('')
  const [isAILoading, setIsAILoading] = useState(false)
  const [isAISuggestionDialogOpen, setIsAISuggestionDialogOpen] = useState(false)

  const handleGenerateTaskByAI = async () => {
    try {
      setIsAILoading(true)
      const prevTasks = tasks.map(t => t.text).reduce((acc, cur) => `${acc}, ` + cur)
      const aiSuggestions = await getAiTaskSuggestions(prevTasks)
      aiSuggestions.forEach(s => setAISuggestion(s.message.content))
      setIsAISuggestionDialogOpen(true)
    } catch (error) {
      throw new Error(`API Error: ${error}`);
    } finally {
      setIsAILoading(false)
    }
  }

  const handleCreateTaskSuggestedByAI = useCallback(() => {
    const match1 = aiSuggestion && aiSuggestion.match(/"([^"]+)"/)
    const match2 = aiSuggestion && aiSuggestion.match(/\*\*"([^"]+)"\*\*/);
    const suggestion = (match1 && match1[1]) ? match1[1] : (match2 && match2[1]) ? match2[1] : aiSuggestion

    const newTask = {
      id: new Date().toLocaleString(),
      text: suggestion || '',
      completed: false
    }

    setTasks([...tasks, newTask]);
    setIsAISuggestionDialogOpen(false)
  }, [tasks, aiSuggestion, setTasks, setIsAISuggestionDialogOpen])

  return {
    aiSuggestion,
    isAILoading,
    isAISuggestionDialogOpen,
    setIsAISuggestionDialogOpen,
    handleGenerateTaskByAI,
    handleCreateTaskSuggestedByAI
  }
}