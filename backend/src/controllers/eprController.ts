import { FastifyRequest, FastifyReply } from "fastify"
import {
  getEprs,
  getEprById,
  createEpr,
  updateEpr,
  getEprSummary,
  generateEprRemarks
} from "../services/eprService"


// list eprs
export async function getEprsController(request:FastifyRequest, reply:FastifyReply) {
    const { personId } = request.query as any
    const eprs = await getEprs(Number(personId))
    reply.send(eprs)
}

//single eprs

export async function getEprController(request:FastifyRequest, reply:FastifyReply) {
    const { id } = request.params as any
    const epr = await getEprById(Number(id))
    reply.send(epr)
}

//create epr

export async function createEprController(request:FastifyRequest, reply:FastifyReply) {
    const epr = await createEpr(request.body)
    reply.send(epr)
}

//update epr
export async function updateEprController(request:FastifyRequest, reply:FastifyReply) {
    const {id} = request.params as any
    const epr = await updateEpr(Number(id), request.body)
    reply.send(epr)
}
//AVG RATING
export async function getEprSummaryController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { personId } = request.params as any

  const summary = await getEprSummary(Number(personId))

  reply.send(summary)
}
//AI ASSISTANT
export async function assistEprController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const suggestion = generateEprRemarks(request.body)

  reply.send(suggestion)
}