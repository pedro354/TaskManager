import { Badge, Button, Card, Flex, Heading, IconButton, Text } from "@radix-ui/themes"
import type { Task, TaskPriority, TaskStatus } from "../entities/Task"
import { useTasks } from "../hooks/useTasks"
import { EditTaskForm } from "./EditTaskForm"
import { CalendarIcon, CheckIcon, TrashIcon } from "@radix-ui/react-icons"
import { useDraggable } from "@dnd-kit/core"
import {CSS} from '@dnd-kit/utilities';
import { DragHandleDots2Icon } from "@radix-ui/react-icons"
interface TaskCardProps {
    task: Task
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const { deleteTask, updateTask } = useTasks()

    const {setNodeRef, listeners, attributes, transform} = useDraggable({id:task.id})
    const style = {
  transform: CSS.Translate.toString(transform)
}
    const getActionText = (status: TaskStatus) => {
        const actionsTexts = {
            "todo": "Começar",
            "doing": "Concluir",
            "done": "Arquivar"
        }
        return actionsTexts[status]
    }
    const getActionColor = (status: TaskStatus) => {
        const actionsColors: { [key: string]: "indigo" | "green" | "bronze" } = {
            "todo": "indigo",
            "doing": "green",
            "done": "bronze"
        }
        return actionsColors[status]
    }
    const getPriorityColor = (priority: TaskPriority) => {
        const priorityColors: { [key: string]: "sky" | "amber" | "tomato" } = {
            "low": "sky",
            "medium": "amber",
            "high": "tomato"
        }
        return priorityColors[priority]
    }
    const getPriorityText = (
        priority: TaskPriority
    ) => {
        const priorities = {
            low: "Baixa",
            medium: "Média",
            high: "Alta"
        }

        return priorities[priority]
    }
    const handleDelete = (id: string) => {
        const confirmation = confirm("Tem certeza que deseja excluir essa tarefa?")
        if (confirmation) {
            deleteTask(id)
        }
    }
    const handleUpdate = () => {
        if (task.status === "todo") {
            updateTask(task.id, { status: "doing" })
        } else if (task.status === "doing") {
            updateTask(task.id, { status: "done" })
        }
    }
    const formatDate = (date:string) => {
        return new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short"
        })
    }
    return (
        <Card  className="task-card"
        ref={setNodeRef}
        style={style}
    
        >
            <Flex direction={ "row" } gap={"3"} align={"center"} justify={"between"}>
                <Heading as="h3" size={ "6" } style={ { textDecoration: task.status === "done" ? "line-through" : "none", opacity: task.status === "done" ? 0.6 : 1 } }>{ task.title }</Heading>
                  <IconButton
                    variant="ghost"
                    {...listeners}
                    {...attributes}
                        >
                    <DragHandleDots2Icon />
                </IconButton>
            </Flex>

                <Badge color={ getPriorityColor(task.priority) } style={ { width: "fit-content" } }>{ getPriorityText(task.priority) }</Badge>
            <Text as="p" my="4" size="2" color="gray">{ task.description }</Text>
            <Text size={"1"} color="gray" className="calendar"> 
                <CalendarIcon/>
                { task.updatedAt
                    ? `Atualizada em ${formatDate(task.updatedAt)}`
                    : `Criada em ${formatDate(task.createdAt)}`
                }
                </Text>
            <Flex justify="between" align="center" mt="3">
                <Flex gap={ "2" }>
                    { //se ele for diferente de done ele renderiza o botão
                        task.status !== "done" &&
                        <Button
                        size={"3"}
                        variant="ghost"
                        color={ getActionColor(task.status) } 
                        onClick={ handleUpdate }
                        >
                            <CheckIcon />
                        { getActionText(task.status) }
                        </Button>
                    }
                </Flex>
                <Flex gap={"3"} >

                    { task.status !== "done" && (
                        <EditTaskForm task={ task } />
                    )}
                <IconButton 
                    variant="ghost"
                    color="red"
                    size={"3"}
                    onClick={ () => handleDelete(task.id) }
                    >
                    <TrashIcon />
                </IconButton>
                    </Flex>
                </Flex>
        </Card>


    )
}