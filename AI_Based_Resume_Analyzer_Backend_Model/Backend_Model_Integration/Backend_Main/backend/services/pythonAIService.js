const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const analyzeResume = async (resumePath, jobDescription) => {
    try {
        // Validate inputs
        if (!resumePath || !fs.existsSync(resumePath)) {
            throw new Error(`Resume file not found: ${resumePath}`);
        }

        console.log("\n========== PREPARING FORM DATA ==========");
        console.log("Resume path:", resumePath);
        console.log("Resume exists:", fs.existsSync(resumePath));
        console.log("Job Description provided:", !!jobDescription);
        console.log("Job Description length:", jobDescription ? jobDescription.length : 0);

        const form = new FormData();

        // Append resume file with correct field name
        const fileStream = fs.createReadStream(resumePath);
        const filename = resumePath.split(/[\\\/]/).pop();
        
        console.log("File to upload:", filename);
        
        form.append("resume", fileStream, {
            filename: filename
        });

        // Append job_description with the exact field name FastAPI expects
        // If empty, send empty string - FastAPI should handle it
        const jdValue = jobDescription && jobDescription.trim() ? jobDescription.trim() : "";
        form.append("job_description", jdValue);

        console.log("\nForm data fields:");
        console.log("- resume: [File Stream]");
        console.log("- job_description: " + (jdValue.length > 0 ? jdValue.substring(0, 100) + "..." : "[Empty]"));
        console.log("=========================================\n");

        const response = await axios.post(
            "http://127.0.0.1:8000/analyze",
            form,
            {
                headers: form.getHeaders(),
                timeout: 120000,
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );

        console.log("✓ FASTAPI SUCCESS - Analysis completed");
        console.log("\n========== FASTAPI RESPONSE STRUCTURE ==========");
        console.log("ats_result.ATS_score:", response.data?.ats_result?.ATS_score);
        console.log("ats_result.skills:", JSON.stringify(response.data?.ats_result?.skills, null, 2));
        console.log("ats_result.skills.matched_skills:", response.data?.ats_result?.skills?.matched_skills);
        console.log("ats_result.skills.missing_skills:", response.data?.ats_result?.skills?.missing_skills);
        console.log("recommendation.recommendations:", response.data?.recommendation?.recommendations);
        console.log("================================================\n");
        
        return response.data;

    } catch(error){
        console.log("\n========== FASTAPI ERROR ==========");

        if(error.response){
            console.log("❌ Status Code:", error.response.status);
            console.log("❌ Status Text:", error.response.statusText);
            console.log("❌ Response Data:");
            console.log(JSON.stringify(error.response.data, null, 2));
            
            // Extract and log detailed error info
            if (error.response.status === 422) {
                console.log("\n⚠️  Status 422 = Validation Error");
                console.log("Likely cause: Field name mismatch or invalid file format");
                console.log("FastAPI expects fields: 'resume' (File) and 'job_description' (Form)");
            }
        } else if(error.code === 'ECONNREFUSED'){
            console.log("❌ Cannot connect to FastAPI at http://127.0.0.1:8000");
            console.log("Make sure FastAPI is running:");
            console.log("   cd 'NLP & Rule Based Resume ATS Analyzer/NLP & Rule Based Resume ATS Scorer'");
            console.log("   python -m uvicorn main:app --reload");
        } else if(error.code === 'ENOENT'){
            console.log("❌ File not found:", error.path);
        } else {
            console.log("❌ Error:", error.message);
        }

        console.log("====================================\n");
        throw error;
    }
};

module.exports = {
    analyzeResume
};