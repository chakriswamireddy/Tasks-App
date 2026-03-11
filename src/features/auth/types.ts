export interface User {
    username: string,
    password: string,
  }
  
  export interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    loading: boolean
    error: string | null
}
