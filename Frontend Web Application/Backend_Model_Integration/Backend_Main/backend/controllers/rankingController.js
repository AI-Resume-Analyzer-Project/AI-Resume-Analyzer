const resumeModel = require('../models/resumeModel')
const jdModel = require('../models/jobDescriptionModel')
const resultModel = require('../models/resultModel')
const analysisService = require('../services/analysisService')
const logService = require('../services/logService')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/apiError')
const { success } = require('../utils/response')

const enrich = async (rows) => Promise.all(rows.map(async (row, index) => ({
  rank: index + 1,
  candidate_resume_name: row.original_name,
  resume_id: row.resume_id,
  jd_id: row.jd_id,
  result_id: row.result_id,
  ats_score: Number(row.ats_score),
  quality_label: row.quality_label,
  matched_skills: await resultModel.skillsForResult(row.result_id, 'matched_skills'),
  missing_skills: await resultModel.skillsForResult(row.result_id, 'missing_skills'),
  recommendation_summary: row.summary,
})))

exports.run = asyncHandler(async (req, res) => {
  const jd = await jdModel.findById(req.params.jd_id)
  if (!jd) throw new ApiError(404, 'Job description not found')
  analysisService.ensureOwnership(jd, req.user, 'jd')

  const resumes = []
  if (Array.isArray(req.files)) {
    for (const file of req.files) resumes.push(await analysisService.storeResumeFromFile({ file, user: req.user, candidate_id: null }))
  }
  const ids = Array.isArray(req.body.resume_ids) ? req.body.resume_ids : (req.body.resume_ids ? String(req.body.resume_ids).split(',') : [])
  for (const id of ids.filter(Boolean)) {
    const resume = await resumeModel.findById(id)
    if (!resume) throw new ApiError(404, `Resume not found: ${id}`)
    analysisService.ensureOwnership(resume, req.user, 'resume')
    resumes.push(resume)
  }
  if (!resumes.length) throw new ApiError(400, 'Upload resume files or provide resume_ids')

  for (const resume of resumes) await analysisService.run({ resume, jd })
  const ranked = await resultModel.rankedByJd({ jdId: jd.jd_id, user: req.user })
  for (let i = 0; i < ranked.length; i += 1) await resultModel.setRanking(ranked[i].result_id, i + 1)
  await logService.write(req, 'ranking_run', `Ranking completed for JD ${jd.jd_id}`)
  success(res, 'Ranking completed successfully', await enrich(ranked), 201)
})

exports.get = asyncHandler(async (req, res) => {
  const jd = await jdModel.findById(req.params.jd_id)
  if (!jd) throw new ApiError(404, 'Job description not found')
  if (req.user.role === 'recruiter') analysisService.ensureOwnership(jd, req.user, 'jd')
  success(res, 'Rankings fetched successfully', await enrich(await resultModel.rankedByJd({ jdId: req.params.jd_id, user: req.user })))
})
