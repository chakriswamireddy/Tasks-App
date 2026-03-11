import { loginRequest } from "./AuthAPI"
import { api } from "../../services/axiosClient"

jest.mock("../../services/axiosClient")

const mockedApi = api as jest.Mocked<typeof api>

describe("AuthAPI", () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  test("loginRequest should call POST /login with credentials", async () => {

    const mockResponse = {
      token: "fakeJWT",
      username: "test"
    }

    mockedApi.post.mockResolvedValue({ data: mockResponse })

    const result = await loginRequest("test", "test123")

    expect(mockedApi.post).toHaveBeenCalledWith("/login", {
      username: "test",
      password: "test123"
    })

    expect(result).toEqual(mockResponse)
  })

})