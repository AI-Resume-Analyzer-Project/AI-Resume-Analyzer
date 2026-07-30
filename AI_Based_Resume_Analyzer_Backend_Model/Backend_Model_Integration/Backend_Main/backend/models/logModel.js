const db = require('../config/db')

const create = async ({ user_id, event, description, ip_address }) => {
  try {
    await db.execute('INSERT INTO logs (user_id, event, description, ip_address) VALUES (?, ?, ?, ?)', [user_id || null, event, description || '', ip_address || null])
  } catch (ex) {
    if (process.env.NODE_ENV !== 'production') console.log(ex.message)
  }
}

const list = async ({ limit, offset }) => {
  const [records] = await db.execute('SELECT * FROM logs ORDER BY log_id DESC LIMIT ? OFFSET ?', [limit, offset])
  const [count] = await db.execute('SELECT COUNT(*) total FROM logs')
  return { records, total: count[0].total }
}

module.exports = { create, list }
