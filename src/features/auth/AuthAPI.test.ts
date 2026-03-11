import { loginRequest } from "./AuthAPI"



jest.mock("./AuthAPI")
const mockedLoginRequest = loginRequest as jest.Mock


it("loginRequest should return user data", async () => {
  mockedLoginRequest.mockResolvedValue({
    token: "mock-token",
    user:   "test" 
  })

  const result = await loginRequest({
    username: "test",
    password: "test1234"
  })

  expect(loginRequest).toHaveBeenCalled()
  expect(result.token).toBe("mock-token")
})