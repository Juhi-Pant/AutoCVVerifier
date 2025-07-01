const express = require('express');
const router = express.Router();
const resume = require('../models/Resume');
const {analyzeGithubProject} = require('../utils/githubVerifier');
const Resume = require('../models/Resume');

router.post('/github', async(req, res) => {
    const {sessionId} = req.body;
    if(!sessionId) {
        return res.status(400).json({error: 'Session ID is required.'});
    }
    try {
        const resumes = await Resume.find({sessionId});
        if(!resumes.length){
            return res.status(404).json({message: "No resumes found for this session ID"});
        }
        const updatedResumes = [];
        for(const resume of resumes){
            const links = resume.extractedLinks || [];
            const githubLinks = links.filter(link=> link.includes('github.com'));
            const results = [];
            for (const link of githubLinks){
                const analysis = await analyzeGithubProject(link, resume.skills || []);
                results.push(analysis);
            }
            resume.githubAnalysis = results;
            await resume.save();
            updatedResumes.push({
                id: resume._id,
                filename: resume.resume.filename,
                githubAnalysis: results
            });
        }
        res.status(200).json({
            message: 'Github links analyzed',
            data: updatedResumes
        })
    }catch(error){
         console.error('Github Analysis Error: ', error);
         res.status(500).json({error: 'Github Analysis failed'})
    }

})

module.exports = router;