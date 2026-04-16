const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. DESKTOP NAV REPLACEMENT
const oldDesktopDesignRegex = /<a href="website-design\.html"[\s\S]*?<\/a>/;
const oldDesktopModRegex = /<a href="website-modernisation\.html"[\s\S]*?<\/a>/;

const newDesktopLink = `<a href="web-development.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg></span>
                <div class="nav-dropdown-text"><strong>Web Development</strong><span>Build new apps or redesign existing sites</span></div>
              </a>`;

html = html.replace(oldDesktopDesignRegex, newDesktopLink);
html = html.replace(oldDesktopModRegex, ''); // Remove the second one

// 2. MOBILE NAV REPLACEMENT
const oldMobileDesignRegex = /<a href="website-design\.html"[\s\S]*?<\/a>/;
const oldMobileModRegex = /<a href="website-modernisation\.html"[\s\S]*?<\/a>/;
const newMobileLink = `<a href="web-development.html" class="mobile-sub-link">💻 Web Development</a>`;

html = html.replace(oldMobileDesignRegex, newMobileLink);
html = html.replace(oldMobileModRegex, ''); // Remove the second one

// 3. FOOTER MENU REPLACEMENT
// Replace "Website Design" and remove "Website Modernisation"
html = html.replace('<li><a href="website-design.html">Website Design</a></li>', '<li><a href="web-development.html">Web Development</a></li>');
html = html.replace(/\s*<li><a href="website-modernisation\.html">Website Modernisation<\/a><\/li>/, '');


fs.writeFileSync('index.html', html);

// PROPAGATION PHASE: Header & Footer across all files
const hStart = html.indexOf('<header');
const mStart = html.indexOf('<main>');
const navBlock = html.substring(hStart, mStart);

const fStartTag = '<footer id="footer"';
const fEndTag = '</footer>';
const fStart = html.indexOf(fStartTag);
const fEnd = html.indexOf(fEndTag, fStart) + fEndTag.length;
const footerBlock = html.substring(fStart, fEnd);

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  if (file === 'index.html') return;
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace Header
  let fhStart = content.indexOf('<header');
  let fmStart = content.indexOf('<main>');
  if (fhStart !== -1 && fmStart !== -1) {
    content = content.substring(0, fhStart) + navBlock + content.substring(fmStart);
  }
  
  // Replace Footer
  let ffStart = content.indexOf(fStartTag);
  if (ffStart !== -1) {
    let ffEnd = content.indexOf(fEndTag, ffStart) + fEndTag.length;
    content = content.substring(0, ffStart) + footerBlock + content.substring(ffEnd);
  }
  
  fs.writeFileSync(file, content);
  console.log('Updated links in', file);
});

console.log('Nav and Footer successfully updated and propagated!');
