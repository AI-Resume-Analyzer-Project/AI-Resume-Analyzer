const db = require('../config/db')

const create = async ({ candidate_id, uploaded_by, file_name, original_name, extracted_text }) => {
  const [result] = await db.execute(
    'INSERT INTO resumes (candidate_id, uploaded_by, file_name, original_name, extracted_text) VALUES (?, ?, ?, ?, ?)',
    [candidate_id || null, uploaded_by, file_name, original_name || file_name, extracted_text]
  )
  return result.insertId
}

const mapSkills = async (resumeId, skills) => {
  for (const skill of skills) {
    await db.execute('INSERT IGNORE INTO resume_skills (resume_id, skill_id) VALUES (?, ?)', [resumeId, skill.skill_id])
  }
}

const findById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM resumes WHERE resume_id = ?', [id])
  return rows[0] || null
}

const remove = async (id) => {
  const [result] = await db.execute('DELETE FROM resumes WHERE resume_id = ?', [id])
  return result.affectedRows
}

const list = async ({ limit, offset, user }) => {
  const values = []
  let where = ''
  if (user.role === 'candidate') {
    where = 'WHERE candidate_id = ?'
    values.push(user.user_id)
  } else if (user.role === 'recruiter') {
    where = 'WHERE uploaded_by = ? AND candidate_id IS NULL'
    values.push(user.user_id)
  }
  const [records] = await db.execute(`SELECT resume_id, candidate_id, uploaded_by, file_name, original_name, upload_date FROM resumes ${where} ORDER BY resume_id DESC LIMIT ? OFFSET ?`, [...values, limit, offset])
  const [count] = await db.execute(`SELECT COUNT(*) total FROM resumes ${where}`, values)
  return { records, total: count[0].total }
}

module.exports = { create, mapSkills, findById, remove, list }
