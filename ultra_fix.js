const fs = require('fs');

function fixPage(filename) {
  let html = fs.readFileSync(filename, 'utf8');

  // Find the first </main> where our injected content actually ends
  let mainEnd = html.indexOf('</main>');
  if (mainEnd === -1) {
    console.error('Could not find main tag in', filename);
    return;
  }
  
  // Find where the true footer begins
  let footerStart = html.indexOf('<footer id="footer"');
  if (footerStart === -1) {
    console.error('Could not find footer in', filename);
    return;
  }

  // The final perfect HTML sequence.
  // We keep everything up to and including the first </main>, then we jump straight to the true Footer.
  // This explicitly removes any stray 'Get Gmail for Business' blocks that were accidentally appended.
  let cleanHtml = html.substring(0, mainEnd + 7) + '\n\n' + html.substring(footerStart);

  // Hard replace SVGs with foolproof Icons8 PNGs to completely eliminate the image loading bug.
  if (filename === 'microsoft-365.html') {
    // Replace all Word SVGs
    cleanHtml = cleanHtml.replace(/<img src="[^"]*word[^"]*"[^>]*>/gi, '<img src="https://img.icons8.com/color/96/microsoft-word-2019--v2.png" alt="Microsoft Word" style="width:48px; height:48px; margin:0 auto; display:block;">');
    // Replace all Excel SVGs
    cleanHtml = cleanHtml.replace(/<img src="[^"]*excel[^"]*"[^>]*>/gi, '<img src="https://img.icons8.com/color/96/microsoft-excel-2019--v1.png" alt="Microsoft Excel" style="width:48px; height:48px; margin:0 auto; display:block;">');
    // Replace all Teams SVGs
    cleanHtml = cleanHtml.replace(/<img src="[^"]*teams[^"]*"[^>]*>/gi, '<img src="https://img.icons8.com/fluency/96/microsoft-teams-2019.png" alt="Microsoft Teams" style="width:48px; height:48px; margin:0 auto; display:block;">');
    // Replace all OneDrive SVGs
    cleanHtml = cleanHtml.replace(/<img src="[^"]*onedrive[^"]*"[^>]*>/gi, '<img src="https://img.icons8.com/color/96/microsoft-onedrive-2019.png" alt="Microsoft OneDrive" style="width:48px; height:48px; margin:0 auto; display:block;">');
  }

  fs.writeFileSync(filename, cleanHtml);
  console.log('Successfully repaired:', filename);
}

fixPage('microsoft-365.html');
fixPage('zoho-mail.html');
