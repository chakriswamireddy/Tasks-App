import { rest } from "msw"

const STATIC_USER = {
  username: "test",
  password: "test123"
}

export const authHandlers = [
  rest.post("/login", async (req, res, ctx) => {

    const { username, password } = await req.json()

    if (
      username === STATIC_USER.username &&
      password === STATIC_USER.password
    ) {
      return res(
        ctx.status(200),
        ctx.json({
          token: "fake-jwt-token-123456",
          username: STATIC_USER.username
        })
      )
    }

    return res(
      ctx.status(401),
      ctx.json({ message: "Invalid credentials" })
    )
  })
]