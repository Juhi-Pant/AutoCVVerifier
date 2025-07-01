const express = require('express');
const router = express.Router();
const pdfParse = require('pdf-parse')
const Resume = require('../models/Resume');
const { extractLinksFromResume, extractSkills } = require('../utils/parseResume');

router.post('/extract-links', async (req, res) => {

  console.log("BODY RECEIVED:", req.body);

    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    console.log("Received sessionId:", sessionId);

  try {

    const resumes = await Resume.find({ sessionId });

    if (!resumes.length) {
      return res.status(404).json({ message: 'No resumes found for this session' });
    }

    console.log(`Found ${resumes.length} resumes`);
    const extractedData = [];

    for(const resume of resumes){
      const buffer = Buffer.from(resume.resume.data);
      const links = await extractLinksFromResume(resume.resume.data, resume.resume.contentType);
       const parsed = await pdfParse(buffer);
      const skills = await extractSkills(parsed.text);
      resume.extractedLinks = links;
      resume.skills = skills;
      await resume.save();
      

      extractedData.push({
        id: resume._id,
        filename: resume.resume.filename,
        links,
        skills,
      });
    }


    res.status(200).json({
      message: 'Links and skills extracted successfully',
      data: extractedData
    });
  } catch (err) {
    console.error('Error extracting links and skills:', err);
    return res.status(500).json({ error: 'Link extraction failed' });
  }
});

module.exports = router;
