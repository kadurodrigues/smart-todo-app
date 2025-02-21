import { useEffect, useState } from 'react';
import { useTask } from '../context/TaskContext'
import { Button } from './ui/button';
import { Input } from "@/components/ui/input"
import { Loader2, WandSparklesIcon } from "lucide-react"

const TaskForm = () => {
  const [text, setText] = useState('')
  const {
    tasks,
    editingTaskId,
    isAILoading,
    addTask,
    saveEdit,
    cancelEdit,
    handleGenerateTaskByAI
  } = useTask();

  useEffect(() => {
    if (editingTaskId != null) {
      const task = tasks.find(task => task.id === editingTaskId)
      setText(task?.text || '')
    } else {
      setText('')
    }
  }, [editingTaskId, tasks])

  const handleAddTask = (e: React.FormEvent) => {

    e.preventDefault();
    if (text.trim()) {
      addTask(text)
      setText('')
    }
  }

  const handleSaveEdit = () => {
    if (editingTaskId !== null && text.trim()) {
      saveEdit(editingTaskId, text);
    }
  };

  return (
    <div className='w-3/12 rounded-md bg-white shadow-lg shadow-slate-200 p-8'>
      <form onSubmit={handleAddTask} className='flex w-full items-center space-x-2'>
        <Input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your task here..."
        />
        { editingTaskId === null &&
          <div className='flex space-x-2'>
            <Button
              type='submit'
              className='cursor-pointer'
            >
              Add Task
            </Button>
            {tasks.length >= 1 && 
            <Button
              type='button'
              className='bg-green-600 cursor-pointer'
              onClick={handleGenerateTaskByAI}
            >
              {isAILoading ? <Loader2 className="animate-spin" /> : <WandSparklesIcon />}
              Generate by AI
            </Button>}
          </div>
        }
        { editingTaskId !== null &&
          <div className='flex space-x-2'>
            <Button
              type='button'
              className='cursor-pointer'
              onClick={handleSaveEdit}
            >
              Save Change
            </Button>
            <Button
              className='cursor-pointer'
              variant="ghost"
              onClick={cancelEdit}
            >
              Cancel
            </Button>
          </div>
        }
      </form>
    </div>
  )
}

export default TaskForm