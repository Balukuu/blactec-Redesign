const fs = require('fs');
let html = fs.readFileSync('microsoft-365.html', 'utf8');

const mainStart = html.indexOf('<main>');
const mainEnd = html.indexOf('</main>', mainStart);

let mainContent = html.substring(mainStart, mainEnd);

// Fix SVG references across the board
mainContent = mainContent.replace(/m365-word\.svg/g, 'https://api.iconify.design/logos:microsoft-word.svg');
mainContent = mainContent.replace(/m365-excel\.svg/g, 'https://api.iconify.design/logos:microsoft-excel.svg');
mainContent = mainContent.replace(/m365-teams\.svg/g, 'https://api.iconify.design/logos:microsoft-teams.svg');
mainContent = mainContent.replace(/m365-onedrive\.svg/g, 'https://api.iconify.design/logos:microsoft-onedrive.svg');

mainContent = mainContent.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/f\/fd\/Microsoft_Office_Word_%282019%E2%80%93present%29\.svg/g, 'https://api.iconify.design/logos:microsoft-word.svg');
mainContent = mainContent.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/3\/34\/Microsoft_Office_Excel_%282019%E2%80%93present%29\.svg/g, 'https://api.iconify.design/logos:microsoft-excel.svg');
mainContent = mainContent.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/c\/c9\/Microsoft_Office_Teams_%282018%E2%80%93present%29\.svg/g, 'https://api.iconify.design/logos:microsoft-teams.svg');
mainContent = mainContent.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/d\/da\/Microsoft_OneDrive_icon\.svg/g, 'https://api.iconify.design/logos:microsoft-onedrive.svg');

// Replace Google terms safely inside the main content body so it doesn't break navigation links
mainContent = mainContent.replace(/Google Workspace/g, 'Microsoft 365');
mainContent = mainContent.replace(/G Suite/g, 'Office 365');
mainContent = mainContent.replace(/Google products/g, 'Microsoft products');
mainContent = mainContent.replace(/Google security/g, 'Microsoft security');
mainContent = mainContent.replace(/Gmail/g, 'Outlook Exchange');
mainContent = mainContent.replace(/Google Drive/g, 'OneDrive');
mainContent = mainContent.replace(/Drive, Meet/g, 'OneDrive, Teams');
mainContent = mainContent.replace(/Docs, Sheets, Slides, Forms, Sites/g, 'Word, Excel, PowerPoint, Teams, Loop');

html = html.substring(0, mainStart) + mainContent + html.substring(mainEnd);

// Fix Metadata in HEAD manually
html = html.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="Get Microsoft 365 through BlacTec — professional business email, Teams, Word, Excel, and OneDrive. Cloud productivity solutions perfect for African businesses.">');
html = html.replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="Microsoft 365 | BlacTec — Business Productivity & Collaboration Tools">');
html = html.replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="Transform teamwork and boost productivity with Microsoft 365 from BlacTec. Professional email, cloud storage, Teams chat, and Microsoft Office tools for your business.">');
html = html.replace(/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="https://blactec.ug/microsoft-365">');

fs.writeFileSync('microsoft-365.html', html);
console.log('Fixed M365 issues.');
