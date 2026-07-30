const db = require('../config/db')

const createMany = async (resultId, recommendations) => {
  for (const item of recommendations) {
    await db.execute('INSERT INTO recommendations (result_id, recommendation_text) VALUES (?, ?)', [resultId, item])
  }
}

const byResult = async (resultId) => {
  const [rows] = await db.execute('SELECT * FROM recommendations WHERE result_id = ? ORDER BY recommendation_id', [resultId])
  return rows
}

module.exports = { createMany, byResult }
