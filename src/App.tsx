import { Box, Flex, Heading } from "@radix-ui/themes"
import { CreateTaskForm } from "./components/CreateTaskForm"
import { TaskBoard } from "./components/TaskBoard"
import { TasksContextProvider } from "./contexts/TasksContextProvider"

function App() {
  return (
    <TasksContextProvider>

    <Box maxWidth="88rem" mx="auto">
      <Box height="4rem">
        <Flex align="center" gap="4" height="100%">
          <Heading as="h1" size={"8"} weight={"light"}>React Kaban</Heading>
          <CreateTaskForm/>
        </Flex>
      </Box>
    <Box>
      <Heading as="h2">Quadro de tarefas</Heading>
      <TaskBoard />
    </Box>
    </Box>
    </TasksContextProvider>
  )
}

export default App
