import authReducer, {
    loginUser,
    logout,
    restoreSession
  } from "./authSlice"
  
  import { loginRequest } from "./AuthAPI"
  
  jest.mock("./AuthAPI")
  
  const mockedLoginRequest = loginRequest as jest.Mock
  
  describe("authSlice", () => {
  
    const initialState = {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null
    }
  
    beforeEach(() => {
      localStorage.clear()
      jest.clearAllMocks()
    })
  
    test("should return initial state", () => {
      const state = authReducer(undefined, { type: "unknown" })
      expect(state).toEqual(initialState)
    })
  
    test("should handle logout", () => {
  
      const startState = {
        user: { username: "test", password: "test123" },
        token: "fakeToken",
        isAuthenticated: true,
        loading: false,
        error: null
      }
  
      localStorage.setItem("token", "fakeToken")
  
      const state = authReducer(startState, logout())
  
      expect(state.user).toBeNull()
      expect(state.token).toBeNull()
      expect(state.isAuthenticated).toBe(false)
      expect(localStorage.getItem("token")).toBeNull()
    })
  
    test("should restore session from localStorage", () => {
  
      localStorage.setItem("token", "savedToken")
  
      const state = authReducer(initialState, restoreSession())
  
      expect(state.token).toBe("savedToken")
      expect(state.isAuthenticated).toBe(true)
    })
  
    test("should handle loginUser.pending", () => {
  
      const action = { type: loginUser.pending.type }
  
      const state = authReducer(initialState, action)
  
      expect(state.loading).toBe(true)
    })
  
    test("should handle loginUser.fulfilled", () => {
  
      const payload = {
        token: "fakeJWT",
        username: "test",
        password: "test123"
      }
  
      const action = {
        type: loginUser.fulfilled.type,
        payload
      }
  
      const state = authReducer(initialState, action)
  
      expect(state.loading).toBe(false)
      expect(state.token).toBe("fakeJWT")
      expect(state.isAuthenticated).toBe(true)
      expect(state.user?.username).toBe("test")
      expect(localStorage.getItem("token")).toBe("fakeJWT")
    })
  
    test("should handle loginUser.rejected", () => {
  
      const action = { type: loginUser.rejected.type }
  
      const state = authReducer(initialState, action)
  
      expect(state.loading).toBe(false)
      expect(state.error).toBe("Invalid credentials")
    })
  
  })