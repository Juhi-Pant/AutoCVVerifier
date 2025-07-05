const express = require('express');
const router = express.Router(); 
const Resume = require('../models/Resume');

router.post("/filter-candidates", async (req, res) => {
  const { skills = [], sessionId } = req.body;

  if (!skills.length || !sessionId) {
    return res.status(400).json({ error: 'Missing required skills or sessionId' });
  }

  try {
    const resumes = await Resume.find({ sessionId });

    const filteredResumes = resumes
      .map(resume => {
        const repos = resume.githubAnalysis || [];
        let matchedSkills = new Set();

        repos.forEach(repo => {
          const detected = repo?.detectedSkills || [];
          skills.forEach(skill => {
            if (detected.includes(skill)) {
              matchedSkills.add(skill);
            }
          });
        });

        if (matchedSkills.size > 0) {
          return {
            ...resume.toObject(), 
            matchedSkills: Array.from(matchedSkills),
          };
        }

        return null;
      })
      .filter(Boolean); 

    return res.status(200).json(filteredResumes); 
  } catch (error) {
    console.error("Error filtering candidates:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
