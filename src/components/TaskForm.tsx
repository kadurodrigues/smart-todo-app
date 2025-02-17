import { useTask } from '../context/TaskContext'
import { Button } from './ui/button';
import { Input } from "@/components/ui/input"
import { Loader2, WandSparklesIcon } from "lucide-react"

const TaskForm = () => {
  
  const {
    task,
    tasks,
    editingIndex,
    isAILoading,
    addTask,
    setTask,
    saveEdit,
    cancelEdit,
    generateTaskByAI
  } = useTask();

  return (
    <div className='w-3/12 rounded-md bg-white shadow-lg shadow-slate-200 p-8'>
      <div className="flex w-full items-center space-x-2">
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Write your task here..."
        />
        { editingIndex == null
          ? <div className='flex space-x-2'>
              <Button
                className='cursor-pointer'
                onClick={addTask}
              >
                Add Task
              </Button>
              {tasks.length >= 1 && <Button

                className='bg-green-600 cursor-pointer'
                onClick={generateTaskByAI}
              >
                {isAILoading ? <Loader2 className="animate-spin" /> : <WandSparklesIcon />}
                AI Generate
              </Button>}
            </div>
          : <div className='flex space-x-2'>
              <Button
                className='cursor-pointer'
                onClick={() => saveEdit()}
              >
                Save Change
              </Button>
              <Button
                className='cursor-pointer'
                variant="secondary"
                onClick={() => cancelEdit()}
              >
                Cancel
              </Button>
            </div>
        }
      </div>
    </div>
  )
}

export default TaskForm