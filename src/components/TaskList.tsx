import { useTask } from '../context/TaskContext'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"

import {
  GripVerticalIcon,
  SettingsIcon,
  CheckIcon,
  EditIcon,
  TrashIcon,
  Undo2Icon
} from "lucide-react"

const TaskList = () => {
  const {
    tasks,
    draggedIndex,
    editingTaskId,
    deleteTask,
    setEditingTaskId,
    toggleTask,
    onDragTaskStart,
    onDragTaskEnd,
    onDragTaskOver
  } = useTask()

  return (
    <ul className='w-3/12 mt-3 space-y-3'>
      {tasks.map((task, index) => (
        <li key={task.id}>
          <div
            className={`rounded-md shadow-lg shadow-slate-200 p-8 transition-transform ${draggedIndex === index ? 'opacity-50' : ''} ${task.completed ? 'bg-slate-50' : 'bg-white'}`}
            draggable="true"
            onDragStart={() => onDragTaskStart(index)}
            onDragOver={(e) => onDragTaskOver(e, index)}
            onDragEnd={onDragTaskEnd}
          >
            <div className='flex items-center space-x-5'>
              <GripVerticalIcon className='text-slate-400 cursor-grab shrink-0' />
              <div className='flex flex-grow justify-between'>
                <div>
                  <p className={`${task.completed ? 'line-through' : ''}`}>
                    {task.text}
                  </p>
                  <span className={`text-sm text-slate-500 ${task.completed ? 'line-through' : ''}`}>{task.id}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger disabled={editingTaskId !== null} className='group'>
                    <div className='flex items-center justify-center w-10 h-10 rounded-full group-enabled:hover:bg-slate-100 group-enabled:cursor-pointer'>
                      <SettingsIcon className={`h-5 ${editingTaskId !== null && 'text-slate-300'}`} />                      
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                  <DropdownMenuLabel
                      className='flex items-center gap-x-1 rounded hover:bg-slate-100 cursor-pointer'
                      onClick={() => toggleTask(task.id)}
                    >
                      { task.completed ? <Undo2Icon className='h-4' /> : <CheckIcon className='h-4' /> }
                      { task.completed ? 'Undone' : 'Done' }
                    </DropdownMenuLabel>
                    <DropdownMenuLabel
                      className='flex items-center gap-x-1 rounded hover:bg-slate-100 cursor-pointer'
                      onClick={() => setEditingTaskId(task.id)}
                    >
                      <EditIcon className='h-4' />
                      Edit
                    </DropdownMenuLabel>
                    <DropdownMenuLabel
                      className='flex items-center gap-x-1 rounded hover:text-red-700 hover:bg-red-100 cursor-pointer'
                      onClick={() => deleteTask(task.id)}
                    >
                      <TrashIcon className='h-4' />
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