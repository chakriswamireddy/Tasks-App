import { createTask, getTasks, updateTask } from "./taskSlice"
import tasksReducer from "./taskSlice"
import type { Task } from "./types"
  
//   import type { Task } from "../types"
  
  describe("tasksSlice reducer", () => {
  
    const initialState = {
      tasks: [],
      loading: false
    }
  
    test("should return the initial state", () => {
      const state = tasksReducer(undefined, { type: "unknown" })
      expect(state).toEqual(initialState)
    })
  
    test("should handle getTasks.pending", () => {
      const action = { type: getTasks.pending.type }
      const state = tasksReducer(initialState, action)
  
      expect(state.loading).toBe(true)
    })
  
    test("should handle getTasks.fulfilled", () => {
  
      const tasks: Task[] = [
        {
          id: "1",
          title: "Test Task",
          description: "Example",
          status: "todo"
        }
      ]
  
      const action = {
        type: getTasks.fulfilled.type,
        payload: tasks
      }
  
      const state = tasksReducer(initialState, action)
  
      expect(state.tasks).toEqual(tasks)
      expect(state.loading).toBe(false)
    })
  
    test("should handle createTask.fulfilled", () => {
  
      const newTask: Task = {
        id: "1",
        title: "New Task",
        description: "Example",
        status: "todo"
      }
  
      const action = {
        type: createTask.fulfilled.type,
        payload: newTask
      }
  
      const state = tasksReducer(initialState, action)
  
      expect(state.tasks.length).toBe(1)
      expect(state.tasks[0]).toEqual(newTask)
    })
  
    test("should handle updateTask.fulfilled", () => {
  
      const existingTask: Task = {
        id: "1",
        title: "Old Task",
        description: "Old desc",
        status: "todo"
      }
  
      const updatedTask: Task = {
        id: "1",
        title: "Updated Task",
        description: "Updated desc",
        status: "done"
      }
  
      const startState = {
        tasks: [existingTask],
        loading: false
      }

      
      const action = {
        type: updateTask.fulfilled.type,
        payload: updatedTask
      }
  
      const state = tasksReducer(startState, action)
  
      expect(state.tasks[0]).toEqual(updatedTask)
    })
  
  })