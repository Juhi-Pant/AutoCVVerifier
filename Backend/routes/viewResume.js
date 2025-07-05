const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume')


router.get('/resume/:resumeId/view', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume || !resume.resume?.data) {
      return res.status(404).send('Resume not found');
    }

    res.set('Content-Type', resume.resume.contentType || 'application/pdf');
    res.set('Content-Disposition', 'inline'); // change to 'attachment' for download
    res.send(resume.resume.data);
  } catch (error) {
    console.error('Error serving resume PDF:', error);
    res.status(500).send('Failed to retrieve resume');
  }
});

module.exports = router;