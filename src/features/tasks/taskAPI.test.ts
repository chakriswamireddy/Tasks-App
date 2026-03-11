import { api } from "../../services/axiosClient"
import {
    fetchTasks,
    createTaskRequest,
    updateTaskRequest,
    deleteTask
  } from "./taskAPI"
  
  import type { Task } from "./types"
  
  jest.mock("../../services/axiosClient")
  
  const mockedApi = api as jest.Mocked<typeof api>
  
  describe("taskAPI", () => {
  
    afterEach(() => {
      jest.clearAllMocks()
    })
  
    test("fetchTasks should return tasks", async () => {
  
      const mockTasks: Task[] = [
        {
          id: "1",
          title: "Test Task",
          description: "Example",
          status: "todo"
        }
      ]
  
      mockedApi.get.mockResolvedValue({ data: mockTasks })
  
      const result = await fetchTasks()
  
      expect(mockedApi.get).toHaveBeenCalledWith("/tasks")
      expect(result).toEqual(mockTasks)
    })
  
  
    test("createTaskRequest should create a task", async () => {

        const newTask: Omit<Task, "id"> = {
          title: "New Task",
          description: "Example",
          status: "todo"
        }
      
        const responseTask: Task = {
          id: "1",
          ...newTask
        }
      
        mockedApi.post.mockResolvedValue({ data: responseTask })
      
        const result = await createTaskRequest(newTask)
      
        expect(mockedApi.post).toHaveBeenCalledWith("/tasks", newTask)
        expect(result).toEqual(responseTask)
      })
  
  
    test("updateTaskRequest should update a task", async () => {
  
      const task: Task = {
        id: "1",
        title: "Updated Task",
        description: "Updated desc",
        status: "done"
      }
  
      mockedApi.put.mockResolvedValue({ data: task })
  
      const result = await updateTaskRequest(task)
  
      expect(mockedApi.put).toHaveBeenCalledWith(`/tasks/${task.id}`, task)
      expect(result).toEqual(task)
    })
  
  
    test("deleteTask should delete a task", async () => {
  
      const mockResponse = { success: true }
  
      mockedApi.delete.mockResolvedValue({ data: mockResponse })
  
      const result = await deleteTask("1")
  
      expect(mockedApi.delete).toHaveBeenCalledWith("/tasks/1")
      expect(result).toEqual(mockResponse)
    })
  
  })