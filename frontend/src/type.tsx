export type Person = {
  id: number
  name: string
  email: string
  role: "student" | "instructor" | "admin"
}

export type Epr = {
  id: number
  person_id: number
  evaluator_id: number
  role_type: string
  period_start: string
  period_end: string
  overall_rating: number
  technical_skills_rating: number
  non_technical_skills_rating: number
  remarks: string
  status: "draft" | "submitted" | "archived"
}