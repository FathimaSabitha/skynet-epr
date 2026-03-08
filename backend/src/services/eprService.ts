import { pool } from "../db/db";

// GET EPT list

export async function getEprs(personId: number) {
    const result = await pool.query(
        `SELECT * FROM epr_records WHERE person_id = $1 ORDER BY period_start DESC`,
        [personId]
    )
    return result.rows
}

//Get a single epr

export async function getEprById(id: number) {
  const result = await pool.query(
    `SELECT * FROM epr_records WHERE id = $1`,
    [id]
  )

  return result.rows[0]
}

//create an EPR

export async function createEpr(data: any) {
    const { personId, evaluatorId, roleType, periodStart, periodEnd, overallRating, technicalSkillsRating, nonTechnicalSkillsRating, remarks, status,} = data
    const result = await pool.query(
        `INSERT INTO epr_records(person_id,evaluator_id,role_type,period_start,period_end,overall_rating,technical_skills_rating,non_technical_skills_rating,remarks,status)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING * `,
    [
      personId,
      evaluatorId,
      roleType,
      periodStart,
      periodEnd,
      overallRating,
      technicalSkillsRating,
      nonTechnicalSkillsRating,
      remarks,
      status,
    ]
  )

  return result.rows[0]
    
}

//UPDATE EPR

export async function updateEpr(id: number, data: any) {
    const {overallRating, remarks, status} = data
    const result = await pool.query(`UPDATE epr_records SET overall_rating=$1, remarks=$2, status=$3 WHERE id=$4 RETURNING *`, [overallRating, remarks, status, id])
    return result.rows[0]
}
