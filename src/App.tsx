import { Box, Flex, Heading, Text } from "@radix-ui/themes"
import { CreateTaskForm } from "./components/CreateTaskForm"
import { TaskBoard } from "./components/TaskBoard"
import { TasksContextProvider } from "./contexts/TasksContextProvider"
import icone from "./assets/icon.png"

function App() {
  
  return (
    <TasksContextProvider >

<Flex justify="between" p={"3"} align="center" mb="4">
  <Flex gap="4" align="center">
    <Box >
      <img width={"50px"} src={icone}>
      </img>
    </Box>
    <Box>
      <Heading size="8">
        React Kanban
      </Heading>
            <Text color="gray">
        Gerenciador de tarefas simples e eficiente
      </Text>
    </Box>

      </Flex>
                <CreateTaskForm/>
      </Flex>
      <div className="separator"></div>
    <Box className="boardTasks" my={"4"}>
      <Heading as="h2" mb={"4"}>Quadro de tarefas</Heading>
      <TaskBoard />
    </Box>
    </TasksContextProvider>
  )
}

export default App
