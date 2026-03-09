import { FastifyInstance } from "fastify"
import {
  getEprsController,
  getEprController,
  createEprController,
  updateEprController,
  getEprSummaryController,
  assistEprController
} from "../controllers/eprController"


export async function eprRoutes(app: FastifyInstance) {

  app.get("/api/epr", getEprsController)

  app.get("/api/epr/:id", getEprController)

  app.post("/api/epr", createEprController)

  app.patch("/api/epr/:id", updateEprController)

  app.get("/api/epr/summary/:personId", getEprSummaryController)
  
  app.post("/api/epr/assist", assistEprController)
  
}