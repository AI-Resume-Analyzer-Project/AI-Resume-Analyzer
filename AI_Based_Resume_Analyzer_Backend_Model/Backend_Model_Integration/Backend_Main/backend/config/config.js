require('dotenv').config()

module.exports = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  uploadDir: process.env.UPLOAD_DIR || 'uploads/resumes',
  aiProvider: process.env.AI_PROVIDER || 'gemini',
  aiApiKey: process.env.AI_API_KEY || '',
}
