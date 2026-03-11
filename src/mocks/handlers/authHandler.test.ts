import { setupServer } from "msw/node"
import { authHandlers } from "./authHandler"

const server = setupServer(...authHandlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("authHandlers", () => {

  test("returns token for valid credentials", async () => {

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "test",
        password: "test123"
      })
    })

    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.token).toBe("fake-jwt-token-123456")
    expect(data.username).toBe("test")
  })


  test("returns 401 for invalid credentials", async () => {

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "wrong",
        password: "wrong"
      })
    })

    const data = await res.json()

    expect(res.status).toBe(401)
    expect(data.message).toBe("Invalid credentials")
  })

})