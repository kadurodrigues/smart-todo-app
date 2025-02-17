import { useTask } from '../context/TaskContext'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"

import {
  GripVerticalIcon,
  SettingsIcon
} from "lucide-react"

const TaskList = () => {
  const {
    tasks,
    draggedIndex,
    removeTask,
    editTask,
    handleDragTaskStart,
    handleDragTaskOver,
    handleDragTaskEnd
  } = useTask()

  return (
    <ul className='w-3/12 mt-3 space-y-3'>
      {tasks.map((task, index) => (
        <li key={task.id}>
          <div
            className={`rounded-md bg-white shadow-lg shadow-slate-200 p-8 transition-transform ${draggedIndex === index ? 'opacity-50' : ''}`}
            draggable="true"
            onDragStart={() => handleDragTaskStart(index)}
            onDragOver={(e) => handleDragTaskOver(e, index)}
            onDragEnd={handleDragTaskEnd}
          >
            <div className='flex items-center space-x-5'>
              <GripVerticalIcon className='text-slate-400 cursor-grab' />
              <div className='flex flex-grow justify-between'>
                <div>
                  <p>{task.text}</p>
                  <span className='text-sm text-slate-500'>{task.id}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className='flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 cursor-pointer'>
                      <SettingsIcon className='h-5' />                      
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel
                      className='rounded hover:bg-slate-100 cursor-pointer'
                      onClick={() => editTask(index)}
                    >
                      Edit
                    </DropdownMenuLabel>
                    <DropdownMenuLabel
                      className='rounded hover:text-red-700 hover:bg-red-100 cursor-pointer'
                      onClick={() => removeTask(task.id)}
                    >
                      Delete
                    </DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TaskList