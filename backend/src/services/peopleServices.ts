import { pool } from "../db/db"

export async function getPeople(role?: string, search?: string) {
  let query = `SELECT id,name,email,role FROM users`
  const values: any[] = []

  if (role) {
    values.push(role)
    query += ` WHERE role = $${values.length}`
  }

  if (search) {
    values.push(`%${search}%`)
    query += role
      ? ` AND (name ILIKE $${values.length} OR email ILIKE $${values.length})`
      : ` WHERE (name ILIKE $${values.length} OR email ILIKE $${values.length})`
  }

  const result = await pool.query(query, values)
  return result.rows
}