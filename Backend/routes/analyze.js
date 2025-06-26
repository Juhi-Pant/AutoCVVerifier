const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { extractLinksFromResume } = require('../utils/parseResume');

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
    const extractedLinks = [];

    for(const resume of resumes){
      const links = await extractLinksFromResume(resume.resume.data, resume.resume.contentType);
      resume.extractedLinks = links;
      await resume.save();

      extractedLinks.push({
        id: resume._id,
        filename: resume.resume.filename,
        links,
      });
    }

    const uniqueLinks = [...new Set(extractedLinks)];


    res.status(200).json({
      message: 'Links extracted successfully',
      links: uniqueLinks
    });
  } catch (err) {
    console.error('Error extracting links:', err);
    return res.status(500).json({ error: 'Link extraction failed' });
  }
});

module.exports = router;
