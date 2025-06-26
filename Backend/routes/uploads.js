const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Resume = require('../models/Resume');
const axios = require('axios');

router.post('/', upload.any(), async (req, res) => {
  try {
    const files = req.files; // array of files
    const rawSession = req.body.sessionId;
    const sessionId = Array.isArray(rawSession) ? rawSession[0] : rawSession;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }


    const resumeDocs = files.map((file, i) => ({
      sessionId: sessionId,
      resume: {
        data: file.buffer,
        contentType: file.mimetype,
        filename: file.originalname
      }
    }));

    await Resume.insertMany(resumeDocs);

    res.status(200).json({ message: 'All resumes uploaded successfully!' });

  } catch (error) {
    console.error('Bulk upload error:', error);
    res.status(500).json({ error: 'Bulk upload failed' });
  }
});

module.exports = router;
