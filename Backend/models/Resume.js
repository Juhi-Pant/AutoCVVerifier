const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    sessionId: String,
    resume: {
        data: Buffer,
        contentType: String,
        filename: String,
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    extractedLinks: [String],
    githubAnalysis: {
        type: [Object],
        default: []
    }
    
})

module.exports = mongoose.model('Resume', resumeSchema);