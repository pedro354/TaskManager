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
    const newTask = await tasksServices.createTask(attributes)
    setTasks((currrentState)=> [...currrentState,  newTask])
  }
  const updateTask = async (id: string, attributes: Partial<Omit<Task, "id">>) => {
    await tasksServices.updateTask(id, attributes)
    setTasks((currentState) => {
        const updatedTasks = [...currentState]
        const taskIndex = updatedTasks.findIndex((task) => task.id === id)
        Object.assign(updatedTasks[taskIndex], attributes)
        return updatedTasks
    })
}
  const deleteTask = async(id:string) =>{
      await tasksServices.deleteTask(id)
    setTasks((currentState) => currentState.filter((task) => task.id !== id))
    
  }
    return (
        <TasksContext.Provider value={{ tasks,createTask,updateTask,deleteTask }}>
            {children}
        </TasksContext.Provider>
    );
} 