import { Badge, Button, Card, Flex, Heading, Text } from "@radix-ui/themes"
import type { Task, TaskPriority, TaskStatus } from "../entities/Task"
import { useTasks } from "../hooks/useTasks"
import { EditTaskForm } from "./EditTaskForm"

interface TaskCardProps {
    task: Task
}

export const TaskCard: React.FC<TaskCardProps> = ({task}) => {
    const {deleteTask, updateTask} = useTasks()
    
    const getActionText = (status: TaskStatus) => {
        const actionsTexts = {
            "todo": "Iniciar",
            "doing": "Concluir",
            "done": "Arquivar"
        }
        return actionsTexts[status]
    }
    const getActionColor = (status: TaskStatus) =>{
        const actionsColors: {[key: string]: "indigo" |"green"|"bronze"} = {
            "todo": "indigo",
            "doing": "green",
            "done": "bronze"
        }
        return actionsColors[status]
    }
    const getPriorityColor = (priority: TaskPriority) => {
        const priorityColors: {[key: string]: "sky" | "amber" | "tomato"} = {
            "low": "sky",
            "medium": "amber",
            "high": "tomato"
        }
        return priorityColors[priority]
    }
    const handleDelete = (id: string) => {
        const confirmation = confirm("Tem certeza que deseja excluir essa tarefa?")
        if(confirmation){
            deleteTask(id)
        }
    }
    const handleUpdate = () => {
        if(task.status === "todo"){
            updateTask(task.id, {status: "doing"})
        } else if (task.status === "doing"){
            updateTask(task.id, {status: "done"})
        }
    }
    const handleEdit = () => {
        if(task.status === "done"){
   return
}
    }
    return (
        <Card>
            <Flex align={"center"} gap={"4"}>
                <Heading as="h3" size={"4"}>{task.title}</Heading>
                <Badge color={getPriorityColor(task.priority)}>{task.priority}</Badge>
            </Flex>
            <Text as="p" my="4" size="2">{task.description}</Text>
            <Flex gap={"3"}>
                {task.status !== "done" && (
                    <Button style={{width: "4rem"}} color={"amber"} onClick={handleEdit}>
                        <EditTaskForm task={task}/>
                    </Button>
                )}
     { //se ele for diferente de done ele renderiza o botão
                    task.status !== "done" &&
                <Button style={{width: "4rem"}} color={getActionColor(task.status)} onClick={handleUpdate}>
                    {getActionText(task.status)}
                </Button>
                }
                <Button style={{width: "4rem"}} color="red" onClick={()=> handleDelete(task.id)}>excluir</Button>
            </Flex>
        </Card>
    )
}