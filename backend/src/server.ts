import Fastify from "fastify"
import cors from "@fastify/cors"
import { peopleRoutes } from "./routes/peopleRoutes"
import { eprRoutes } from "./routes/eprRoutes"

const app = Fastify()

// enable CORS
app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
})

app.register(peopleRoutes)
app.register(eprRoutes)

app.get("/", async () => {
  return { message: "Skynet EPR API running" }
})

app.listen({ port: 4000 }, (err, address) => {
  if (err) throw err
  console.log(`Server running at ${address}`)
})