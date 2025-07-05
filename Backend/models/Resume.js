const mongoose = require('mongoose');

const githubScoreDetailsSchema = new mongoose.Schema({
  error: String,
  repoExists: Boolean,
  isFork: Boolean,
  commitCount: Number,
  noLicense: Boolean,
  licenseMismatch: Boolean,
  licenseYearMismatch: Boolean
}, { _id: false });

const githubAnalysisSchema = new mongoose.Schema({
  url: String,
  isValid: Boolean,
  detectedSkills: [String],
  scoreDetails: githubScoreDetailsSchema,
}, { _id: false });


const resumeSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  resume: {
    data: Buffer,
    contentType: String,
    filename: String,
  },
  uploadedAt: { type: Date, default: Date.now },
  extractedLinks: [String],
  githubAnalysis: {
    type: [githubAnalysisSchema],
    default: []
  },
  
  skills: [String], // if you want to keep resume-parsed skills
});

module.exports = mongoose.model('Resume', resumeSchema);
