import { pool } from "../db/db";

// GET EPT list

export async function getEprs(personId: number) {
  const result = await pool.query(
    `SELECT * FROM epr_records WHERE person_id = $1 ORDER BY period_start DESC`,
    [personId],
  );
  return result.rows;
}

//Get a single epr

export async function getEprById(id: number) {
  const result = await pool.query(`SELECT * FROM epr_records WHERE id = $1`, [
    id,
  ]);

  return result.rows[0];
}

//create an EPR

export async function createEpr(data: any) {
  const {
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
  } = data;
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
    ],
  );

  return result.rows[0];
}

//UPDATE EPR


export async function updateEpr(id: number, data: any) {

  const result = await pool.query(
    `
UPDATE epr_records
SET
overall_rating=$1,
technical_skills_rating=$2,
non_technical_skills_rating=$3,
remarks=$4,
status=$5
WHERE id=$6
RETURNING *
`,
    [
      data.overallRating,
      data.technicalSkillsRating,
      data.nonTechnicalSkillsRating,
      data.remarks,
      data.status,
      id,
    ]
  );
   if (result.rowCount === 0) {
    throw new Error("EPR not found");
  }

  return result.rows[0];
}

export async function getEprSummary(personId: number) {

  const avgResult = await pool.query(
    `
    SELECT
      AVG(overall_rating) as average_overall_rating,
      AVG(technical_skills_rating) as average_technical_rating,
      AVG(non_technical_skills_rating) as average_non_technical_rating,
      COUNT(*) as epr_count
    FROM epr_records
    WHERE person_id = $1
    `,
    [personId]
  )

  const trendResult = await pool.query(
    `
    SELECT
      period_start,
      overall_rating
    FROM epr_records
    WHERE person_id = $1
    ORDER BY period_start DESC
    LIMIT 3
    `,
    [personId]
  )

  return {
    personId,
    averageOverallRating: Number(avgResult.rows[0].average_overall_rating),
    averageTechnicalRating: Number(avgResult.rows[0].average_technical_rating),
    averageNonTechnicalRating: Number(avgResult.rows[0].average_non_technical_rating),
    eprCount: Number(avgResult.rows[0].epr_count),
    lastThreePeriods: trendResult.rows.map((r:any) => ({
      periodLabel: r.period_start,
      overallRating: r.overall_rating
    }))
  }
}

//AI ASSISTANT

export function generateEprRemarks(data: any) {
  const { overallRating, technicalSkillsRating, nonTechnicalSkillsRating } = data;

  let remarks: string[] = [];

  if (overallRating >= 4.5) {
    remarks.push(
      "The student is performing at an excellent level and consistently demonstrates strong commitment and capability."
    );
  } else if (overallRating >= 3.5) {
    remarks.push(
      "The student shows solid overall performance and continues to develop their capabilities."
    );
  } else if (overallRating >= 2.5) {
    remarks.push(
      "The student is progressing but there are several areas where improvement would strengthen overall performance."
    );
  } else {
    remarks.push(
      "The student currently faces challenges that require focused improvement and additional guidance."
    );
  }

  if (technicalSkillsRating >= 4) {
    remarks.push(
      "Technically, the student demonstrates strong problem-solving ability and a good grasp of core concepts."
    );
  } else if (technicalSkillsRating >= 3) {
    remarks.push(
      "Technical understanding is developing well, though continued practice and deeper exploration of concepts will be beneficial."
    );
  } else {
    remarks.push(
      "The student should focus on strengthening technical fundamentals and applying concepts more confidently in practical tasks."
    );
  }

  if (nonTechnicalSkillsRating >= 4) {
    remarks.push(
      "They also show excellent collaboration, communication, and professionalism while working with others."
    );
  } else if (nonTechnicalSkillsRating >= 3) {
    remarks.push(
      "Communication and teamwork skills are developing steadily, with room to become more proactive and confident."
    );
  } else {
    remarks.push(
      "Improving communication, teamwork, and professional discipline would significantly enhance overall effectiveness."
    );
  }

  remarks.push(
    "With continued effort and consistent practice, the student has strong potential to further improve their performance."
  );

  return {
    suggestedRemarks: remarks.join(" ")
  };
}