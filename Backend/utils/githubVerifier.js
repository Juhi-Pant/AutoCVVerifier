const axios = require('axios');

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

const dependencyToSkill = {
  "react": "React",
  "next": "Next.js",
  "vue": "Vue.js",
  "express": "Express",
  "mongoose": "MongoDB",
  "typescript": "TypeScript",
  "javascript": "JavaScript",
  "tailwindcss": "Tailwind",
  "redux": "Redux",
  "flask": "Flask",
  "django": "Django",
  "numpy": "NumPy",
  "pandas": "Pandas",
  "tensorflow": "TensorFlow",
  "scikit-learn": "Scikit-learn",
  "aws-sdk": "AWS",
  "google-cloud": "GCP",
  "azure": "Azure"
};

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
    const treeURL = `${repoURL}/git/trees/HEAD?recursive=1`;
    const treeData = await axios.get(treeURL, { headers });
    const allPaths = treeData.data.tree.map(entry => entry.path);

    // --- 1. Detect from file extensions
    const detectedSkillsSet = new Set();
    for (const path of allPaths) {
      const ext = extractExtension(path);
      const skill = extensionToSkill[ext];
      if (skill) detectedSkillsSet.add(skill);
    }

    // --- 2. Detect from dependencies
    const dependencyFiles = treeData.data.tree.filter(file =>
      ["package.json", "requirements.txt"].includes(file.path)
    );

    for (const file of dependencyFiles) {
      const contentRes = await axios.get(`${repoURL}/contents/${file.path}`, { headers });
      const contentDecoded = Buffer.from(contentRes.data.content, 'base64').toString();

      if (file.path === "package.json") {
        const pkg = JSON.parse(contentDecoded);
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        for (const dep of Object.keys(deps || {})) {
          if (dependencyToSkill[dep]) detectedSkillsSet.add(dependencyToSkill[dep]);
        }
      }

      if (file.path === "requirements.txt") {
        const lines = contentDecoded.split('\n');
        for (const line of lines) {
          const dep = line.trim().split('==')[0].toLowerCase();
          if (dependencyToSkill[dep]) detectedSkillsSet.add(dependencyToSkill[dep]);
        }
      }
    }

    const detectedSkills = Array.from(detectedSkillsSet);
    const matched = resumeSkills.filter(skill =>
      detectedSkills.includes(skill)
    );

    return {
      url: link,
      isValid: true,
      detectedSkills,

    };

  } catch (error) {
    console.error(`GitHub analysis failed for ${link}:`, error.message);
    return {
      url: link,
      isValid: false,
      scoreDetails: {
        error: error.message
      }
    };
  }
}

module.exports = { analyzeGithubProject };
