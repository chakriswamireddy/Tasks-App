import { setupServer } from "msw/node"
import { taskHandlers } from "./taskHandler"

const server = setupServer(...taskHandlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("taskHandlers", () => {

  test("GET /tasks returns tasks", async () => {

    const res = await fetch("/tasks")
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
  })


  test("POST /tasks creates a new task", async () => {

    const newTask = {
      title: "New Task",
      description: "Example",
      status: "todo"
    }

    const res = await fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    })

    const data = await res.json()

    expect(res.status).toBe(201)
    expect(data.title).toBe("New Task")
    expect(data.id).toBeDefined()
  })


  test("PUT /tasks/:id updates a task", async () => {

    const updatedTask = {
      title: "Updated Task",
      description: "Updated description",
      status: "done"
    }

    const res = await fetch("/tasks/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.title).toBe("Updated Task")
    expect(data.status).toBe("done")
  })


  test("PUT /tasks/:id returns 404 for missing task", async () => {

    const res = await fetch("/tasks/999", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Test",
        description: "Test",
        status: "todo"
      })
    })

    const data = await res.json()

    expect(res.status).toBe(404)
    expect(data.message).toBe("Task not found")
  })


  test("DELETE /tasks/:id deletes a task", async () => {

    const res = await fetch("/tasks/1", {
      method: "DELETE"
    })

    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
  })

})