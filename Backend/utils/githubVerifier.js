const axios = require('axios');

// Map file extensions to skills
const extensionToSkill = {
  '.js': 'JavaScript',
  '.ts': 'TypeScript',
  '.jsx': 'React',
  '.tsx': 'React',
  '.py': 'Python',
  '.java': 'Java',
  '.cpp': 'C++',
  '.cs': 'C#',
  '.html': 'HTML',
  '.css': 'CSS',
  '.sql': 'SQL',
  '.yml': 'YAML',
  '.rb': 'Ruby',
  '.go': 'Golang'
};

let topSkills = []

function extractExtension(path) {
  return path.slice(path.lastIndexOf('.'));
}

async function analyzeGithubProject(link, resumeSkills = []) {
  try {
      const parts = link.split('github.com/')[1].split('/');
      const [owner, repo] = parts;
  
      const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'auto-cv-verifier'
      };
  
      const repoURL = `https://api.github.com/repos/${owner}/${repo}`;
      const commitsURL = `${repoURL}/commits`;
      const readmeURL = `${repoURL}/readme`;
      const licenseURL = `${repoURL}/license`;
  
      let licenseOwner = null;
      let licenseYear = null;
  
      const [repoData, commitsData, licenseData, readmeData] = await Promise.all([
        axios.get(repoURL, { headers }),
        axios.get(commitsURL, { headers }),
        axios.get(licenseURL, { headers }).catch(() => null),
        axios.get(readmeURL, { headers }).catch(() => null),
      ]);
  
      const scoreDetails = {};
      let score = 0;
      let totalPossibleScore = 100;
  
      // Repo exists
      if (repoData.status === 200) {
        scoreDetails.repoExists = true;
        score += 10;
      }
  
      // Fork check
      if (repoData.data.fork) {
        scoreDetails.isFork = true;
      } else {
        score += 10;
        scoreDetails.isFork = false;
      }
  
      // Commit activity
      const commitCount = commitsData.data.length;
      scoreDetails.commitCount = commitCount;
      if (commitCount >= 10) {
        score += 20;
      } else {
        score += 10;
      }
  
      // License handling
      if (licenseData && licenseData.data.content) {
        score += 5; // base score for having license
  
        const licenseText = Buffer.from(licenseData.data.content, 'base64').toString('utf-8');
        const match = licenseText.match(/Copyright\s*\(c\)?\s*(\d{4})?\s*(.*)/i);
  
        if (match) {
          licenseYear = match[1];
          licenseOwner = match[2]?.trim();
        }
  
        if (licenseOwner && !licenseOwner.toLowerCase().includes(owner.toLowerCase())) {
          scoreDetails.licenseMismatch = { expectedOwner: owner, licenseOwner };
        } else {
          score += 10;
          scoreDetails.licenseOwnerVerified = true;
        }
  
        const repoYear = new Date(repoData.data.created_at).getFullYear();
        if (licenseYear && licenseYear != repoYear) {
          scoreDetails.licenseYearMismatch = { licenseYear, repoYear };
        } else {
          score += 5;
          scoreDetails.licenseYearVerified = true;
        }
      } else {
        scoreDetails.noLicense = true;
        totalPossibleScore -= 20; // reduce total from 100 to 80
      }
  
      // README check
      if (readmeData && readmeData.status === 200) {
        score += 5;
        scoreDetails.readmePresent = true;
      }
      
          // 🧠 Analyze repo content for skill relevance
    const treeURL = `${repoURL}/git/trees/HEAD?recursive=1`;
    const treeData = await axios.get(treeURL, { headers });
    const allPaths = treeData.data.tree.map(entry => entry.path);

    // Count skill frequency from file extensions
const skillFrequency = {};

for (const path of allPaths) {
  const ext = extractExtension(path);
  const skill = extensionToSkill[ext];
  if (skill) {
    skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
  }
}

// Get top 3 most-used skills
const topSkills = Object.entries(skillFrequency)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3)
  .map(([skill]) => skill);

// Compare with resumeSkills
const matchedSkills = resumeSkills.filter(skill =>
  topSkills.includes(skill)
);

// Skill match score logic (max 30 points)
const skillScore = Math.min(30, Math.round((matchedSkills.length / resumeSkills.length) * 30));
score += skillScore;

scoreDetails.skillMatch = {
  claimed: resumeSkills,
  detected: Object.keys(skillFrequency),
  matched: matchedSkills,
  topSkills,
  skillScore
};



      // Normalize score if totalPossibleScore < 100
      const finalScore = Math.round((score / totalPossibleScore) * 100);
  
      return {
        url: link,
        score: finalScore,
        rawScore: score,
        outOf: totalPossibleScore,
        scoreDetails,
        topSkills,
        isValid: true
      };
  
    } catch (error) {
      console.error(`GitHub analysis failed for ${link}:`, error.message);
      return {
        url: link,
        isValid: false,
        score: 0,
        scoreDetails: {
          error: error.message
        }
      };
    }
}

module.exports = { analyzeGithubProject };
