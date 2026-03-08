import { Pool } from "pg"

export const pool = new Pool({
  user: "sabi",
  host: "localhost",
  database: "skynet_epr",
  password: "",
  port: 5432,
})