const fs = require('fs');

function cleanFile(filename, prefix, newPrefix) {
  let content = fs.readFileSync(filename, 'utf8');
  
  // Replace class prefixes
  const regex = new RegExp(prefix + '-', 'g');
  content = content.replace(regex, newPrefix + '-');
  
  // Remove "google workspace" text if it's in a comment or irrelevant place
  content = content.replace(/interested in Google Workspace/gi, 'interested in ' + (filename.includes('microsoft') ? 'Microsoft 365' : 'Zoho Mail'));
  
  fs.writeFileSync(filename, content);
  console.log(`Cleaned ${filename}`);
}

cleanFile('microsoft-365.html', 'gw', 'ms');
cleanFile('zoho-mail.html', 'gw', 'zoho');
