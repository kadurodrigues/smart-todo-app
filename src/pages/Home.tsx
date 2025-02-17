import TaskList from "@/components/TaskList"
import TaskForm from "../components/TaskForm"

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-2 bg-slate-100">
      <h1 className=" text-gray-700 text-3xl">Smart Todo App</h1>
      <TaskForm />
      <TaskList />
    </div>
  )
}

export default Home