import fastify from "fastify"
import type { FastifyLoggerOptions } from "fastify"
import type { PinoLoggerOptions } from "fastify/types/logger"

import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod"
import { createGoalRoute } from "../routes/create-goal"
import { getPendingWeekGoalsRoute } from "../routes/get-pending-goals"
import { createGoalCompletionRoute } from "../routes/create-goal-completion"
import { getWeekSummaryRoute } from "../routes/get-week-summary"
import fastifyCors from "@fastify/cors"
import { env } from "../env"

type EnvToLogger = FastifyLoggerOptions & PinoLoggerOptions

const envToLogger: Record<typeof env.NODE_ENV, boolean | EnvToLogger> = {
  development: true,
  production: {
    serializers: {
      res: res => ({
        statusCode: res.statusCode,
      }),
      req: req => ({
        ip: req.headers["x-forwarded-for"] || req.ip,
        method: req.method,
        url: req.url,
        hostname: req.hostname,
        remoteAddress: req.socket.remoteAddress,
        remotePort: req.socket.remotePort,
      }),
    },
  },
  test: false,
}

const app = fastify({
  logger: envToLogger[env.NODE_ENV],
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: "*",
})

app.register(createGoalRoute)
app.register(getPendingWeekGoalsRoute)
app.register(createGoalCompletionRoute)
app.register(getWeekSummaryRoute)

app
  .listen({
    port: env.PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`http server running in port ${env.PORT}`)
  })
