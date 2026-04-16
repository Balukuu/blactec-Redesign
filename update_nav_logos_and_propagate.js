const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const replacements = [
  {
    target: '<span class="nav-dropdown-icon">📧</span>',
    replacement: '<span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></span>'
  },
  {
    target: '<span class="nav-dropdown-icon">🔷</span>',
    replacement: '<span class="nav-dropdown-icon"><img src="https://www.gstatic.com/images/branding/product/2x/google_workspace_24dp.png" width="18" height="18" alt="Google Workspace"></span>'
  },
  {
    target: '<span class="nav-dropdown-icon">✉️</span>',
    replacement: '<span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="#e63946"/><path d="M22 6L12 13L2 6" stroke="#ffffff" stroke-width="2" fill="none"/></svg></span>'
  },
  {
    target: '<span class="nav-dropdown-icon">🏢</span>',
    replacement: '<span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 20 20"><rect x="1" y="1" width="8" height="8" fill="#f25022"/><rect x="11" y="1" width="8" height="8" fill="#7fba00"/><rect x="1" y="11" width="8" height="8" fill="#00a4ef"/><rect x="11" y="11" width="8" height="8" fill="#ffb900"/></svg></span>'
  },
  {
    target: '<span class="nav-dropdown-icon">🔒</span>',
    replacement: '<span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span>'
  },
  {
    target: '<span class="nav-dropdown-icon">🔍</span>',
    replacement: '<span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span>'
  },
  {
    target: '<span class="nav-dropdown-icon">📱</span>',
    replacement: '<span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></span>'
  },
  {
    target: '<span class="nav-dropdown-icon">🛡️</span>',
    replacement: '<span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>'
  }
];

// Perform replacements on index.html body specifically for Desktop Nav
replacements.forEach(r => {
  html = html.replace(r.target, r.replacement);
});

// Also fix the Mobile Nav links which look like >📧 Business Email</a>
const mobileReplacements = [
  { target: '>📧 Business Email<', replacement: '><svg width="16" height="16" style="vertical-align:text-bottom; margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Business Email<' },
  { target: '>🔒 SSL Certificates<', replacement: '><svg width="16" height="16" style="vertical-align:text-bottom; margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> SSL Certificates<' },
  { target: '>🔍 SEO Services<', replacement: '><svg width="16" height="16" style="vertical-align:text-bottom; margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> SEO Services<' },
  { target: '>📱 Bulk SMS<', replacement: '><svg width="16" height="16" style="vertical-align:text-bottom; margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> Bulk SMS<' },
  { target: '>🛡️ Website Security<', replacement: '><svg width="16" height="16" style="vertical-align:text-bottom; margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> Website Security<' }
];
mobileReplacements.forEach(r => {
  html = html.replace(r.target, r.replacement);
});

// For mobile Zoho Mail & M365 (they might not have emojis yet, let's inject them if they just say "Zoho Mail")
// Wait, index.html might not have Zoho Mail in mobile nav yet? 
// Let's just do a naive check:
html = html.replace(/>Zoho Mail<\/a>/, '><svg width="16" height="16" style="vertical-align:text-bottom; margin-right:6px;" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="#e63946"/><path d="M22 6L12 13L2 6" stroke="#ffffff" stroke-width="2" fill="none"/></svg> Zoho Mail</a>');
html = html.replace(/>Microsoft 365<\/a>/, '><svg width="16" height="16" style="vertical-align:text-bottom; margin-right:6px;" viewBox="0 0 20 20"><rect x="1" y="1" width="8" height="8" fill="#f25022"/><rect x="11" y="1" width="8" height="8" fill="#7fba00"/><rect x="1" y="11" width="8" height="8" fill="#00a4ef"/><rect x="11" y="11" width="8" height="8" fill="#ffb900"/></svg> Microsoft 365</a>');


fs.writeFileSync('index.html', html);

// PROPAGATION PHASE:
// Grab everything from `<header class="header">` to `</header>` AND the `<div class="mobile-nav"... </div>` block.
const headerStart = html.indexOf('<header class="header"');
const mobileNavStart = html.indexOf('<div class="mobile-nav"');
const mobileNavEnd = html.indexOf('</div>\n\n\n\n<main>') + 6; // To fully include it
// Just grab everything from headerStart to right before <main> !
const cutoff = html.indexOf('<main>');
const fullNavBlock = html.substring(headerStart, cutoff);

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  if (file === 'index.html') return;
  let content = fs.readFileSync(file, 'utf8');
  let hStart = content.indexOf('<header class="header"');
  let cOff = content.indexOf('<main>');
  
  if (hStart !== -1 && cOff !== -1) {
    let updated = content.substring(0, hStart) + fullNavBlock + content.substring(cOff);
    fs.writeFileSync(file, updated);
    console.log('Propagated Nav to', file);
  }
});

console.log('Nav fully updated!');
