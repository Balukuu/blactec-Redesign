const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// The standard footer begins with `<footer id="footer"`
// Let's grab everything from `<footer id="footer"` to `</footer>` from `index.html`
const footerStart = indexHtml.indexOf('<footer id="footer"');
const footerEndTag = '</footer>';
const footerEnd = indexHtml.indexOf(footerEndTag, footerStart) + footerEndTag.length;
const newFooter = indexHtml.substring(footerStart, footerEnd);

// Also need the copyright bottom div if it exists outside footer. But looking at index.html, `<div class="footer-bottom">` rests inside the `<footer id="footer">` scope. So extracting the full outer footer is correct.

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  if (file === 'index.html') return; // skip source of truth
  
  let content = fs.readFileSync(file, 'utf8');
  
  let fStart = content.indexOf('<footer id="footer"');
  if (fStart !== -1) {
    let fEnd = content.indexOf('</footer>', fStart) + 9;
    
    // Replace the old footer chunk with the new perfectly verified chunk from index.html
    const updated = content.substring(0, fStart) + newFooter + content.substring(fEnd);
    fs.writeFileSync(file, updated);
    console.log('Propagated to', file);
  }
});
