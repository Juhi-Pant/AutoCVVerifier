const pdfParse = require('pdf-parse');

function extractLinksFromText(text) {
  const linkRegex = /https?:\/\/(?:www\.)?(github\.com|vercel\.app)\/[^\s|)"]+/gi;
  const matches = text.match(linkRegex);
  return matches || [];
}

async function extractLinksFromResume(fileBuffer, contentType) {
  try {
    let text = '';

    if (contentType === 'application/pdf') {
      const data = await pdfParse(fileBuffer);
      text = data.text;
    } 
    else {
      console.warn('Unsupported file type:', contentType);
    }

    return extractLinksFromText(text);
  } catch (err) {
    console.error('Error parsing resume:', err);
    return [];
  }
}

const skillKeywords = [  "JavaScript", "TypeScript", "React", "Node.js", "Express",
  "HTML", "CSS", "MongoDB", "SQL", "MySQL", "PostgreSQL",
  "Python", "Django", "Flask", "Java", "Spring", "Kotlin",
  "C++", "C#", "AWS", "Azure", "Firebase", "Docker", "Kubernetes",
  "Git", "Linux", "GraphQL", "Next.js", "Tailwind", "Redux", "Docker"]

function extractSkills (resumeText) {
   const foundSkills = new Set();
   const lowerText = resumeText.toLowerCase();

   for(const skill of skillKeywords){
    if(lowerText.includes(skill.toLowerCase())){
      foundSkills.add(skill);
    }
   }
   return Array.from(foundSkills);
}

module.exports = { extractLinksFromResume, extractSkills };
