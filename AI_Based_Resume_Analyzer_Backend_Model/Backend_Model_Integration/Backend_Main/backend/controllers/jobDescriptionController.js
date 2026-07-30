const jdModel = require('../models/jobDescriptionModel')
const skillModel = require('../models/skillModel')
const analysisService = require('../services/analysisService')
const logService = require('../services/logService')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/apiError')
const { success } = require('../utils/response')
const { getPagination, paged } = require('../utils/pagination')

exports.create = asyncHandler(async (req, res) => {
  const jd = await analysisService.storeJd({ user: req.user, title: req.body.title, description: req.body.description, experience_required: req.body.experience_required })
  await logService.write(req, 'jd_created', `JD ${jd.jd_id} created`)
  success(res, 'Job description created successfully', jd, 201)
})

exports.list = asyncHandler(async (req, res) => {
  const paging = getPagination(req.query)
  const result = await jdModel.list({ ...paging, user: req.user })
  success(res, 'Records fetched successfully', paged(result.records, result.total, paging.page, paging.limit))
})

exports.getOne = asyncHandler(async (req, res) => {
  const jd = await jdModel.findById(req.params.id)
  if (!jd) throw new ApiError(404, 'Job description not found')
  if (req.user.role === 'recruiter') analysisService.ensureOwnership(jd, req.user, 'jd')
  jd.skills = await skillModel.byJd(req.params.id)
  success(res, 'Job description fetched successfully', jd)
})

exports.remove = asyncHandler(async (req, res) => {
  const jd = await jdModel.findById(req.params.id)
  if (!jd) throw new ApiError(404, 'Job description not found')
  if (req.user.role === 'recruiter') analysisService.ensureOwnership(jd, req.user, 'jd')
  await jdModel.remove(req.params.id)
  success(res, 'Job description deleted successfully')
})
