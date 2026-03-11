import { rest } from "msw"
import type { Task } from "../../features/tasks/types"

let tasks: Task[] = [
  { id: "1", title: "First Task", description: "Example", status: "todo" }
]

export const taskHandlers = [

  rest.get("/tasks", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(tasks))
  }),

  rest.post("/tasks", async (req, res, ctx) => {
    const body = await req.json() as Omit<Task, "id">

    const newTask: Task = {
      id: String(tasks.length + 1),
      ...body
    }

    tasks.push(newTask)

    return res(ctx.status(201), ctx.json(newTask))
  }),

  rest.put("/tasks/:id", async (req, res, ctx) => {
    const { id } = req.params
    const body = await req.json() as Omit<Task, "id">

    const index = tasks.findIndex((t) => t.id === id)

    if (index === -1) {
      return res(
        ctx.status(404),
        ctx.json({ message: "Task not found" })
      )
    }

    const updatedTask: Task = {
      id: String(id),
      ...body
    }

    tasks[index] = updatedTask

    return res(ctx.status(200), ctx.json(updatedTask))
  }),

  rest.delete("/tasks/:id", (req, res, ctx) => {
    const { id } = req.params

    tasks = tasks.filter((t) => t.id !== id)

    return res(
      ctx.status(200),
      ctx.json({ success: true })
    )
  })
]