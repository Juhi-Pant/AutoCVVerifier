
const axios = require('axios');

async function analyzeGithubProject(link) {
  try {
    const parts = link.split('github.com/')[1].split('/');
    const [ owner, repo] = parts;

    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'auto-cv-verifier'
    };
    const repoURL = `https://api.github.com/repos/${owner}/${repo}`;
    const commitsURL = `${repoURL}/commits`;
    const readmeURL = `${repoURL}/reademe`;
    const licenseURL = `${repoURL}/license`;

    const licenseOwner = null;
    const licenseYear = null;

    const [repoData, commitsData, licenseData] = await Promise.all([
      axios.get(repoURL, {headers}),
      axios.get(commitsURL, {headers}),
      axios.get(licenseURL, {headers}).catch(()=>null),
    ])

    const scoreDetails = {};
    let score =0;

    if (repoData.status === 200) {
      scoreDetails.repoExists = true;
      score += 10;
    }

    //Check if it's a fork
    if(repoData.data.fork){
      scoreDetails.isFork = true;
      score -=5;
    }
    else {
      scoreDetails.isFork = false;
      score+=5;
    }

    // number of commits
    const commitCount = commitsData.data.length;
    scoreDetails.commitCount = commitCount;
    if(commitCount>=10) score+=10;
    else if(commitCount>=5) score+=5;
    else score -=5;

    //license analysis 
    if(licenseData && licenseData.data.content){
      const licenseText = Buffer.from(licenseRes.data.content, 'base64').toString('utf-8');
      const match = licenseText.match(/Copyright\s*\(c\)?\s*(\d{4})?\s*(.*)/i);
      if(match){
        licenseYear = match[1];
        licenseOwner = match[2].trim();
      }

      if(licenseOwner && !licenseOwner.toLowerCase().includes(owner.toLowerCase())){
        scoreDetails.licenseMismatch = {
          expectedOwner: owner,
          licenseOwner,
          warning: 'License owner mismatch'
        };
        score-=10;
      }
      else{
        score+=10;
        scoreDetails.licenseVerified = true;
      }
    }
    
    const repoYear = new Date(repoData.data.created_at).getFullYear();
    if(licenseYear && licenseYear!=repoYear){
      scoreDetails.licenseYearMismatch = {
        repoYear,
        licenseYear
      };
      score-=10;
    }

    return {
      url: link,
      score,
      scoreDetails,
      isValid: true,
    };
  } catch (error) {
    console.error(`GitHub analysis failed for ${link}:`, error.message);
        return {
      url: link,
      isValid: false,
      score: 0,
      scoreDetails: {
        error: err.message
      }
  }
}
}

module.exports = { analyzeGithubProject };
