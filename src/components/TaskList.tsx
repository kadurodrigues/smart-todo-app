import { useTask } from '../context/TaskContext'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"

import { EllipsisVertical } from "lucide-react"

const TaskList = () => {
  const { tasks, removeTask, editTask } = useTask()

  return (
    <ul className='w-3/12 mt-3 space-y-3'>
      {tasks.map((task, index) => (
        <li key={task.id}>
          <div className='rounded-md bg-white shadow-lg shadow-slate-200 p-8'>
            <div className='flex items-center justify-between'>
              <div>
                <p>{task.text}</p>
                <span className='text-sm text-slate-500'>{task.id}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical />
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
        </li>
      ))}
    </ul>
  )
}

export default TaskList