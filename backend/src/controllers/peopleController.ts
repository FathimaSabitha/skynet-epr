import { FastifyRequest, FastifyReply } from "fastify"
import { getPeople } from "../services/peopleServices"

export async function getPeopleController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { role, search } = request.query as any

  const people = await getPeople(role, search)

  reply.send(people)
}