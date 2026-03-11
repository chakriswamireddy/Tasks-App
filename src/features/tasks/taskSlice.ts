import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "./taskAPI"
import type { Task } from "./types"
import { createTaskRequest } from "./taskAPI"

interface TasksState {
  tasks: Task[]
  loading: boolean
}

const initialState: TasksState = {
  tasks: [
  ],
  loading: false
}

export const getTasks = createAsyncThunk("tasks/getTasks", api.fetchTasks)

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task: Omit<Task, "id">) => {
    const data = await createTaskRequest(task)
    return data
  }
)

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: Task) => {
    const data = await api.updateTaskRequest(task)
    return data
  }
)

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload
        state.loading = false
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t.id === action.payload.id
        )
    
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
      })
  }
})

export default tasksSlice.reducer