const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

router.get('/resumes/:sessionId', async(req, res)=> {
    try {
        const {sessionId} = req.params;
        if(!sessionId) return res.status(400).json({error: "sessioId is required"});

        const resumes = await Resume.find({sessionId: req.params.sessionId});
        res.json(resumes);
    } catch (error) {
        console.error('Failed at fetching resumes',error );
        res.status(500).json({error: "Internal server error"});
    }
});

module.exports=router;
