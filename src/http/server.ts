import fastify from "fastify"
import { createGoal } from "../functions/create-goal"
import z from "zod"
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

const app = fastify({
  logger: true,
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
    host: "0.0.0.0"
  })
  .then(() => {
    console.log(`http server running in port ${env.PORT}`)
  })
