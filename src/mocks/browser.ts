import { setupWorker } from "msw"
import { authHandlers } from "./handlers/authHandler"
import { taskHandlers } from "./handlers/taskHandler"
// import { authHandlers } from "./handlers/authHandlers"
// import { taskHandlers } from "./handlers/taskHandlers"

export const worker = setupWorker(...authHandlers, ...taskHandlers)