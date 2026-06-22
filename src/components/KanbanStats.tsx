import { Card, Flex, Grid, Text } from "@radix-ui/themes"
import { useTasks } from "../hooks/useTasks"
import {
    CheckCircledIcon,
    ClockIcon,
    BarChartIcon,
    ActivityLogIcon
} from "@radix-ui/react-icons"
export const KanbanStats: React.FC = () => {

    const { tasks } = useTasks()

    const totalTasks = tasks.length

    const todoTasks = tasks.filter(task => task.status === "todo").length
    const doingTasks = tasks.filter(task => task.status === "doing").length
    const doneTasks = tasks.filter(task => task.status === "done").length

const stats = [
  {
    icon: <BarChartIcon color="violet" width={20} height={20} />,
    value: totalTasks,
    label: "Total de tarefas",
    className: "stats-total"
  },
  {
    icon: <ActivityLogIcon color="orange" width={20} height={20} />,
    value: doingTasks,
    label: "Em Progresso",
    className: "stats-progress"
  },
  {
    icon: <CheckCircledIcon color="green" width={20} height={20} />,
    value: doneTasks,
    label: "Concluídas",
    className: "stats-done"
  },
  {
    icon: <ClockIcon color="deepskyblue" width={20} height={20} />,
    value: todoTasks + doingTasks,
    label: "Pendentes",
    className: "stats-pending"
  }
]
    return (
        <Grid columns={ "4" } gap={ "4" } my={"6"}>
            {stats.map(stat => (
            <Card className={stat.className} key={stat.label}>
                <Flex direction="row" gap={ "4" } align={ "center" }>
                    {stat.icon}
                    <Flex direction={ "column" }>
                        <Text size="7" weight={ "bold" }>
                    {stat.value}                            
                        </Text>
                        <Text color="gray">
                            {stat.label}
                        </Text>
                    </Flex>
                </Flex>
            </Card>
            ))}
        </Grid>
    )
}

