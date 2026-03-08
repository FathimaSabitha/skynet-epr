import Fastify from "fastify"
import { peopleRoutes } from "./routes/peopleRoutes"
import { eprRoutes } from "./routes/eprRoutes"


const app = Fastify()

app.register(peopleRoutes)
app.register(eprRoutes)

app.get("/", async () => {
  return { message: "Skynet EPR API running" }
})

app.listen({ port: 4000 }, (err, address) => {
  if (err) throw err
  console.log(`Server running at ${address}`)
})