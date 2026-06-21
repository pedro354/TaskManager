import z from "zod"
import type { Task } from "../entities/Task"
import { useTasks } from "../hooks/useTasks"
import type { SubmitEventHandler } from "react"
import { Box, Button, Dialog, Flex, RadioGroup, Text, TextArea, TextField } from "@radix-ui/themes"

const EditTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["todo", "doing", "done"]),
    priority: z.enum(["low", "medium", "high"])
})

interface EditTaskFormProps {
    task: Task
}



export const EditTaskForm: React.FC<EditTaskFormProps> = ({ task }) => {
    const { updateTask } = useTasks()

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (ev) => {
        ev.preventDefault()

        const formData = new FormData(ev.currentTarget)

        const title = formData.get("title")
        const description = formData.get("description")
        const status = formData.get("status")
        const priority = formData.get("priority")

        const taskData = EditTaskSchema.parse({
            title,
            description,
            status,
            priority
        })

        await updateTask(task.id, taskData)
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger >
                <Button>
                    Editar
                </Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="32rem">
                <Dialog.Title>Editar tarefa</Dialog.Title>

                <form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="4">

                        <Box>
                            <Text as="label" htmlFor="title">
                                Título
                            </Text>

                            <TextField.Root
                                id="title"
                                name="title"
                                defaultValue={task.title}
                                required
                            />
                        </Box>

                        <Box>
                            <Text as="label" htmlFor="description">
                                Descrição
                            </Text>

                            <TextArea
                                id="description"
                                name="description"
                                defaultValue={task.description}
                                required
                            />
                        </Box>

                        <Box>
                            <Text as="div">
                                Situação
                            </Text>

                            <RadioGroup.Root
                                name="status"
                                defaultValue={task.status}
                            >
                                <RadioGroup.Item value="todo">
                                    Para Fazer
                                </RadioGroup.Item>

                                <RadioGroup.Item value="doing">
                                    Em Progresso
                                </RadioGroup.Item>

                                <RadioGroup.Item value="done">
                                    Concluída
                                </RadioGroup.Item>
                            </RadioGroup.Root>
                        </Box>

                        <Box>
                            <Text as="div">
                                Prioridade
                            </Text>

                            <RadioGroup.Root
                                name="priority"
                                defaultValue={task.priority}
                            >
                                <RadioGroup.Item value="low">
                                    Baixa
                                </RadioGroup.Item>

                                <RadioGroup.Item value="medium">
                                    Média
                                </RadioGroup.Item>

                                <RadioGroup.Item value="high">
                                    Alta
                                </RadioGroup.Item>
                            </RadioGroup.Root>
                        </Box>

                        <Flex justify="end" gap="2">

                            <Dialog.Close>
                                <Button
                                    color="gray"
                                    variant="soft"
                                >
                                    Cancelar
                                </Button>
                            </Dialog.Close>

                            <Button type="submit">
                                Salvar
                            </Button>

                        </Flex>

                    </Flex>
                </form>

            </Dialog.Content>
        </Dialog.Root>
    )
}