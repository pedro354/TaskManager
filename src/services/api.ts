import type { Task } from "../entities/Task";

const TASKS_KEY = "[]";
export const tasksServices = {
  async fetchTasks(): Promise<Task[]> {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
      const data: Task[] = await response.json();

      return data;
    } catch {
      return JSON.parse(localStorage.getItem(TASKS_KEY) ?? "[]") as Task[];
    }
  },
  async createTask(attributes: Omit<Task, "id">): Promise<Task> {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attributes),
      });
      const newTask: Task = await response.json();
      return newTask;
    } catch {
      const tasks = JSON.parse(
        localStorage.getItem(TASKS_KEY) ?? "[]",
      ) as Task[];

      const newTask = {
        ...attributes,
        id: String(Date.now),
      };

      tasks.push(newTask);

      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

      return newTask;
    }
  },
  async updateTask(
    id: string,
    attributes: Partial<Omit<Task, "id">>,
  ): Promise<Task> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attributes),
        },
      );
      const updatedTask: Task = await response.json();
      return updatedTask;
    } catch {
      const tasks = JSON.parse(
        localStorage.getItem(TASKS_KEY) ?? "[]",
      ) as Task[];

      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, ...attributes } : task,
      );

      localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));

      const updatedTask = updatedTasks.find((task) => task.id === id);

      if (!updatedTask) {
        throw new Error("Task not found");
      }

      return updatedTask;
    }
  },
  async deleteTask(id: string): Promise<void> {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: "DELETE",
      });
    } catch {
      const tasks = JSON.parse(
        localStorage.getItem(TASKS_KEY) ?? "[]",
      ) as Task[];

      const filteredTasks = tasks.filter((task) => task.id !== id);

      localStorage.setItem(TASKS_KEY, JSON.stringify(filteredTasks));
    }
  },
};
