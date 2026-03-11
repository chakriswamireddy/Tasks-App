import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { loginRequest } from "./AuthAPI";
import type { AuthState } from "./types";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    return await loginRequest(username, password)
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem("token")
    },
    restoreSession(state) {
      const token = localStorage.getItem("token")
      console.log("restoreingg", token)

      if (token) {
        state.token = token
        state.isAuthenticated = true
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.user = { username: action.payload.username, password:action.payload.password }
        state.isAuthenticated = true

        localStorage.setItem("token", action.payload.token)
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false
        state.error = "Invalid credentials"
      })
  }
})

export const { logout, restoreSession } = authSlice.actions
export default authSlice.reducer