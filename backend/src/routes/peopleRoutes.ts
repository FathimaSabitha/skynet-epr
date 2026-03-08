import { FastifyInstance } from "fastify"
import { getPeopleController } from "../controllers/peopleController"

export async function peopleRoutes(app: FastifyInstance) {
  app.get("/api/people", getPeopleController)
}