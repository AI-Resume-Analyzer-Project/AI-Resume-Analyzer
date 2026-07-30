const db = require('../config/db')

const create = async ({ resume_id, jd_id, ats_score, quality_label, summary }) => {
  const [result] = await db.execute(
    'INSERT INTO results (resume_id, jd_id, ats_score, quality_label, summary) VALUES (?, ?, ?, ?, ?)',
    [resume_id, jd_id, ats_score, quality_label, summary]
  )
  return result.insertId
}

const addSkillRows = async (table, resultId, skills) => {
  for (const skill of skills) {
    await db.execute(`INSERT IGNORE INTO ${table} (result_id, skill_id) VALUES (?, ?)`, [resultId, skill.skill_id])
  }
}

const setRanking = async (resultId, rank) => {
  await db.execute('UPDATE results SET ranking = ? WHERE result_id = ?', [rank, resultId])
}

const findById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM results WHERE result_id = ?', [id])
  return rows[0] || null
}

const list = async ({ limit, offset, user, resume_id, jd_id }) => {
  const values = []
  const filters = []
  if (resume_id) {
    filters.push('r.resume_id = ?')
    values.push(resume_id)
  }
  if (jd_id) {
    filters.push('r.jd_id = ?')
    values.push(jd_id)
  }
  if (user.role === 'candidate') {
    filters.push('re.candidate_id = ?')
    values.push(user.user_id)
  } else if (user.role === 'recruiter') {
    filters.push('jd.recruiter_id = ?')
    values.push(user.user_id)
  }
  const where = filters.length ? `WHERE ${filters.join(' AND ')}` : ''
  const sql = `FROM results r JOIN resumes re ON re.resume_id = r.resume_id JOIN job_descriptions jd ON jd.jd_id = r.jd_id ${where}`
  // Use the text query protocol here because some MySQL/MariaDB versions reject LIMIT/OFFSET parameters in prepared statements.
  const [records] = await db.query(`SELECT r.*, re.original_name, jd.title ${sql} ORDER BY r.ats_score DESC, r.result_id DESC LIMIT ? OFFSET ?`, [...values, limit, offset])
  const [count] = await db.execute(`SELECT COUNT(*) total ${sql}`, values)
  return { records, total: count[0].total }
}

const rankedByJd = async ({ jdId, user }) => {
  const values = [jdId]
  const filters = ['r.jd_id = ?']
  if (user.role === 'recruiter') {
    filters.push('jd.recruiter_id = ?')
    values.push(user.user_id)
  }
  const [rows] = await db.execute(
    `SELECT r.*, re.original_name, jd.title
     FROM results r
     JOIN resumes re ON re.resume_id = r.resume_id
     JOIN job_descriptions jd ON jd.jd_id = r.jd_id
     WHERE ${filters.join(' AND ')}
     ORDER BY r.ats_score DESC, r.result_id ASC`,
    values
  )
  return rows
}

const skillsForResult = async (resultId, table) => {
  const [rows] = await db.execute(
    `SELECT s.skill_name
     FROM skills s
     JOIN ${table} x ON x.skill_id = s.skill_id
     WHERE x.result_id = ?
     ORDER BY s.skill_name`,
    [resultId]
  )
  return rows.map((row) => row.skill_name)
}

module.exports = { create, addSkillRows, setRanking, findById, list, rankedByJd, skillsForResult }
