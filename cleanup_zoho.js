const fs = require('fs');
let html = fs.readFileSync('zoho-mail.html', 'utf8');

const mainStart = html.indexOf('<main>');
const mainEnd = html.indexOf('</main>', mainStart);

let mainContent = html.substring(mainStart, mainEnd);

mainContent = mainContent.replace(/Google Workspace/g, 'Zoho Mail');
mainContent = mainContent.replace(/G Suite/g, 'Zoho Workplace');
mainContent = mainContent.replace(/Google products/g, 'Zoho products');
mainContent = mainContent.replace(/Google security/g, 'Zoho security');
mainContent = mainContent.replace(/Gmail/g, 'Zoho Mail');
mainContent = mainContent.replace(/Google Drive/g, 'WorkDrive');
mainContent = mainContent.replace(/Drive, Meet/g, 'WorkDrive, Meeting');
mainContent = mainContent.replace(/Docs, Sheets, Slides, Forms, Sites/g, 'Writer, Sheet, Show');

html = html.substring(0, mainStart) + mainContent + html.substring(mainEnd);

html = html.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="Get Zoho Mail through BlacTec — professional email for business, WorkDrive, Meeting, and Office suite. Perfect for African businesses.">');
html = html.replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="Zoho Mail | BlacTec — Business Email & Collaboration Tools">');
html = html.replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="Transform teamwork and boost productivity with Zoho Mail from BlacTec. Professional email, cloud storage, and office tools for your business.">');
html = html.replace(/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="https://blactec.ug/zoho-mail">');

fs.writeFileSync('zoho-mail.html', html);
console.log('Fixed Zoho issues.');
