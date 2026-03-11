import { api } from "../../services/axiosClient"

export const loginRequest = async (username: string, password: string) => {
  const response = await api.post("/login", { username, password })
  return response.data
}