import { api } from "../../services/axiosClient"
import type { Task } from "./types"

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks")
  console.log(res.data, "rees")
  return res.data;
}

export const createTaskRequest = async (
  task: Omit<Task, "id">
) => {
  const res = await api.post("/tasks", task)
  return res.data
}

export const updateTaskRequest = async (task: Task) => {
  const res = await api.put(`/tasks/${task.id}`, task)
  return res.data
}

export const deleteTask = async (id: string) => {
  const res = await api.delete(`/tasks/${id}`)
  return res.data
}