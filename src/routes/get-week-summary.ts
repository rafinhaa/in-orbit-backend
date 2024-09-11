import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { getWeekSummary } from "../functions/get-week-summary"

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    "/get-week-summary",

    async request => {
      const result = await getWeekSummary()

      return {
        result,
      }
    }
  )
}
