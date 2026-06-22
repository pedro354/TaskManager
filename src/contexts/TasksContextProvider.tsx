import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { TasksContext } from "./TasksContext"
import type { Task } from "../entities/Task"
import { tasksServices } from "../services/api";

interface TasksContextProviderProps {
    children: ReactNode;
}

export const TasksContextProvider: React.FC<TasksContextProviderProps> = ({children}) => {
const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => { tasksServices.fetchTasks().then((data) => 
    setTasks(data))
  }, [])

  const createTask = async (attributes: Omit<Task, "id">) =>{
    const tempTask: Task = {
      ...attributes,
      id: Date.now().toString()
    }
    setTasks((currentState)=> [...currentState,  tempTask])
    await tasksServices.createTask(attributes)

  }
  const updateTask = async (id: string, attributes: Partial<Omit<Task, "id">>) => {
    setTasks((currentState) => {
        const updatedTasks = [...currentState]
        const taskIndex = updatedTasks.findIndex((task) => task.id === id)
        Object.assign(updatedTasks[taskIndex], attributes)
        return updatedTasks
    })
        await tasksServices.updateTask(id, attributes)
}
  const deleteTask = async(id:string) =>{
      console.log("DELETANDO:", id)
      await tasksServices.deleteTask(id)
setTasks((currentState) => {
  console.log("ID RECEBIDO:", id)

  currentState.forEach((task) => (task.id, task.id !== id))

  return currentState.filter(
    (task) => task.id !== id
  )
})  }
    return (
        <TasksContext.Provider value={{ tasks,createTask,updateTask,deleteTask }}>
            {children}
        </TasksContext.Provider>
    );
} 