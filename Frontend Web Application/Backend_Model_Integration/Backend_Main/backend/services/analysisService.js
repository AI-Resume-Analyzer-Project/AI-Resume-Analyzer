const resumeModel = require('../models/resumeModel');
const jdModel = require('../models/jobDescriptionModel');
const skillModel = require('../models/skillModel');
const resultModel = require('../models/resultModel');
const recommendationModel = require('../models/recommendationModel');

const pythonAI = require('./pythonAIService');
const ApiError = require('../utils/apiError');


const ensureOwnership = (record, user, type) => {
    if (!record || !user) {
        throw new ApiError(400, 'Record and user are required');
    }

    if (user.role === 'admin') return true;

    if (
        type === 'resume' &&
        user.role === 'candidate' &&
        record.candidate_id !== user.user_id
    ) {
        throw new ApiError(
            403,
            'You can access only your own resumes'
        );
    }

    if (
        type === 'resume' &&
        user.role === 'recruiter' &&
        record.uploaded_by !== user.user_id
    ) {
        throw new ApiError(
            403,
            'You can access only your own resumes'
        );
    }

    if (
        type === 'jd' &&
        user.role === 'recruiter' &&
        record.recruiter_id !== user.user_id
    ) {
        throw new ApiError(
            403,
            'You can access only your own job descriptions'
        );
    }

    return true;
};



const runAnalysis = async ({
    file,
    user,
    candidate_id,
    jd_id,
    jd_title,
    jd_text,
    experience_required
}) => {
    // Validate required inputs
    if (!file || !user) {
        throw new ApiError(400, 'File and user are required');
    }

    if (user.role === 'candidate' && !candidate_id) {
        throw new ApiError(400, 'candidate_id is required for candidate analysis');
    }

    if (!file.path || !file.filename || !file.originalname) {
        throw new ApiError(400, 'Invalid file object');
    }

    if (!user.user_id || !user.role) {
        throw new ApiError(400, 'Invalid user object');
    }

    const aiResult = await pythonAI.analyzeResume(
        file.path,
        jd_text || ""
    );

    // Validate AI response
    if (!aiResult || typeof aiResult !== 'object') {
        throw new ApiError(500, 'Invalid response from AI service');
    }

    console.log("========== AI RESPONSE ==========");
    console.log(JSON.stringify(aiResult, null, 2));
    console.log("=================================");

    // Safely extract data with defaults
    const resumeText = aiResult?.resume_data?.resume_text || "";
    const resumeSkillsList = aiResult?.resume_data?.skills || [];
    const jobSkillsList = aiResult?.job_data?.skills || [];
    
    // Extract ATS result data - LOG EVERYTHING
    const atsScore = aiResult?.ats_result?.ATS_score || 0;
    console.log("\n========== DEBUGGING SKILLS ==========");
    console.log("ats_result:", JSON.stringify(aiResult?.ats_result, null, 2));
    console.log("ats_result.skills:", JSON.stringify(aiResult?.ats_result?.skills, null, 2));
    
    const matchedSkillsList = aiResult?.ats_result?.skills?.matched_skills || [];
    const missingSkillsList = aiResult?.ats_result?.skills?.missing_skills || [];
    
    console.log("Matched Skills (extracted):", matchedSkillsList);
    console.log("Missing Skills (extracted):", missingSkillsList);
    console.log("=====================================\n");
    
    // Extract recommendation data
    const feedback = (aiResult?.recommendation?.feedback || "").substring(0, 255);
    const recommendationsList = aiResult?.recommendation?.recommendations || [];

    console.log("\n========== EXTRACTED DATA ==========");
    console.log("ATS Score:", atsScore);
    console.log("Matched Skills:", matchedSkillsList);
    console.log("Missing Skills:", missingSkillsList);
    console.log("Recommendations:", recommendationsList);
    console.log("====================================\n");

    // Save Resume
    const resumeId = await resumeModel.create({
        candidate_id,
        uploaded_by: user.user_id,
        file_name: file.filename,
        original_name: file.originalname,
        extracted_text: resumeText
    });

    // Save Resume Skills
    const resumeSkills = await skillModel.findManyByNames(
        resumeSkillsList
    );

    await resumeModel.mapSkills(
        resumeId,
        resumeSkills
    );

    // A recruiter batch creates one JD and reuses it for every uploaded resume.
    // Candidate analysis retains the original one-resume/one-JD behaviour.
    let jdId = jd_id;
    if (!jdId) {
        jdId = await jdModel.create({
            recruiter_id: user.user_id,
            title: jd_title || "Resume Upload",
            description: jd_text || "",
            experience_required: experience_required ?? null
        });

        const jdSkills = await skillModel.findManyByNames(jobSkillsList);
        await jdModel.mapSkills(jdId, jdSkills);
    }

    // Save Result
    const resultId = await resultModel.create({
        resume_id: resumeId,
        jd_id: jdId,
        ats_score: atsScore,
        quality_label: feedback || "Analysis Complete",
        summary: feedback || ""
    });

    // Save Matched Skills
    const matched = await skillModel.findManyByNames(
        matchedSkillsList
    );

    await resultModel.addSkillRows(
        "matched_skills",
        resultId,
        matched
    );

    // Save Missing Skills
    const missing = await skillModel.findManyByNames(
        missingSkillsList
    );

    await resultModel.addSkillRows(
        "missing_skills",
        resultId,
        missing
    );

    // Save Recommendations
    await recommendationModel.createMany(
        resultId,
        recommendationsList
    );

    return {
        result_id: resultId,
        resume_id: resumeId,
        jd_id: jdId,
        ats_score: atsScore,
        quality_label: feedback || "Analysis Complete",
        summary: feedback || "",
        matched_skills: matchedSkillsList,
        missing_skills: missingSkillsList,
        recommendations: recommendationsList
    };
};



module.exports = {

    ensureOwnership,

    runAnalysis

};
