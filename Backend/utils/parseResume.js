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

module.exports = { extractLinksFromResume };
