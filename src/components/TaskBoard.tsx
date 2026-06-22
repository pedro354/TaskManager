import { Badge, Card, Flex, Grid, ScrollArea, Text } from "@radix-ui/themes"
import type { Task, TaskStatus } from "../entities/Task"
import { TaskCard } from "./TaskCard"
import { useTasks } from "../hooks/useTasks"
import { CreateTaskForm } from "./CreateTaskForm"
import { DndContext } from "@dnd-kit/core"
import { DroppableColumn } from "./DroppableColumn"
import { KanbanStats } from "./KanbanStats"

export const TaskBoard: React.FC = () => {
  const { tasks, updateTask } = useTasks()
  const tasksTodo: Task[] = tasks.filter(task => task.status === "todo") ?? []
  const tasksInProgress: Task[] = tasks.filter(task => task.status === "doing") ?? []
  const tasksDone: Task[] = tasks?.filter(task => task.status === "done") ?? []
  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (!over) return
    updateTask(active.id, {
      status: over.id as TaskStatus
    })
  }
  return (
    <DndContext onDragEnd={ handleDragEnd }>
      <ScrollArea scrollbars="horizontal">
        <Grid columns={ "3" } gap={ "4" } minWidth={ "64rem" }>
          <DroppableColumn id="todo">
            <Card className="kanban-column card-todo">
              <Flex direction={ "column" } gap="4">
                <Flex justify={ "between" } m={ "2" }>
                  <Text weight={ "bold" } >Para fazer</Text>

                  <Badge color="cyan" size={ "2" }>{ tasksTodo.length }</Badge>
                </Flex>
                { tasksTodo.map((task) =>
                  <TaskCard key={ task.id } task={ task } />
                ) }
                <div className="create-task-button">
                  <CreateTaskForm defaultStatus="todo" buttonText="Adicionar tarefa" />
                </div>
              </Flex>
            </Card>
          </DroppableColumn>
          <DroppableColumn id="doing">

            <Card className="kanban-column card-doing">
              <Flex direction={ "column" } gap="4">
                <Flex justify={ "between" } m={ "2" }>
                  <Text weight={ "bold" }>Em Progresso</Text>
                  <Badge color="amber" size={ "2" }>{ tasksInProgress.length }</Badge>
                </Flex>
                { tasksInProgress.map((task) => <TaskCard key={ task.id } task={ task } />) }
                <div className="create-task-button">
                  <CreateTaskForm defaultStatus="doing" buttonText="Adicionar tarefa" />
                </div>
              </Flex>
            </Card>          
            </DroppableColumn>
          <DroppableColumn id="done">
            <Card className="kanban-column card-done">
              <Flex direction={ "column" } gap="4">
                <Flex justify={ "between" } m={ "2" }>
                  <Text weight={ "bold" }>Concluído</Text>
                  <Badge color="green" size={ "2" }>{ tasksDone.length }</Badge>
                </Flex>
                { tasksDone.map((task) => <TaskCard key={ task.id } task={ task } />) }
              </Flex>
            </Card>
          </DroppableColumn>
        </Grid>
      </ScrollArea>
    <KanbanStats />
    </DndContext>
    
  )
}