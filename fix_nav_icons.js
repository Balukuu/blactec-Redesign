/**
 * fix_nav_icons.js
 * 
 * Fixes two icon issues across all 23 HTML pages:
 *
 * 1. .nav-dropdown-icon CSS — adds display:inline-flex + centering so SVG icons
 *    sit properly inside their span container (instead of being baseline-shifted).
 *
 * 2. Google Workspace <img> tag (external gstatic.com URL) is replaced with a
 *    proper inline Google "G" SVG that works without a network connection.
 *
 * 3. Replaces thin purple outline SVGs in the Email + Build dropdowns with
 *    cleaner, bolder emoji/colored icons that are immediately recognisable.
 */

const fs   = require('fs');
const path = require('path');

const dir       = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

/* ----------------------------------------------------------------
   1. New .nav-dropdown-icon CSS rule
   ---------------------------------------------------------------- */
const OLD_ICON_CSS = `.nav-dropdown-icon {
      font-size: 20px;
      flex-shrink: 0;
      margin-top: 1px;
    }`;

const NEW_ICON_CSS = `.nav-dropdown-icon {
      font-size: 20px;
      flex-shrink: 0;
      margin-top: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
    }
    .nav-dropdown-icon svg,
    .nav-dropdown-icon img {
      width: 22px;
      height: 22px;
      display: block;
    }`;

/* ----------------------------------------------------------------
   2. Inline Google Workspace G-logo SVG  (replaces the broken img)
   ---------------------------------------------------------------- */
const OLD_GWS_IMG = `<img src="https://www.gstatic.com/images/branding/product/2x/google_workspace_24dp.png" width="18" height="18" alt="Google Workspace">`;

// Google "G" four-color logo — looks identical to the real icon
const NEW_GWS_SVG = `<svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
</svg>`;

/* ----------------------------------------------------------------
   3. Replace thin outline SVGs with bolder, coloured alternatives
      in the Build + Email dropdowns
   ---------------------------------------------------------------- */

// Build dropdown — replace CODE_SVG (thin purple chevrons) with a coloured icon
const OLD_CODE_SVG_SPAN = `<span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg></span>`;
const NEW_CODE_SVG_SPAN = `<span class="nav-dropdown-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg></span>`;

// Build dropdown — Website Redesign (thin arrows icon)
const OLD_REDESIGN_SPAN = `<span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg></span>`;
const NEW_REDESIGN_SPAN = `<span class="nav-dropdown-icon">🔄</span>`;

// Email dropdown — Business Email (thin outline envelope)
const OLD_EMAIL_SVG_SPAN = `<span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></span>`;
const NEW_EMAIL_SVG_SPAN = `<span class="nav-dropdown-icon">✉️</span>`;

// Domain — replace thin WHOIS lock outline SVG with emoji
const OLD_LOCK_SPAN = `<span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span>`;
const NEW_LOCK_SPAN = `<span class="nav-dropdown-icon">🔒</span>`;

// Domain Search — thin outline search circle
const OLD_SEARCH_SPAN = `<span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span>`;
const NEW_SEARCH_SPAN = `<span class="nav-dropdown-icon">🔍</span>`;

// More — SMS outline SVG  
const OLD_SMS_SPAN = `<span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></span>`;
const NEW_SMS_SPAN = `<span class="nav-dropdown-icon">💬</span>`;

// More — Shield SVG
const OLD_SHIELD_SPAN = `<span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>`;
const NEW_SHIELD_SPAN = `<span class="nav-dropdown-icon">🛡️</span>`;

/* ----------------------------------------------------------------
   Process all HTML files
   ---------------------------------------------------------------- */
let fixed = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content    = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // CSS fix
  content = content.replace(OLD_ICON_CSS, NEW_ICON_CSS);

  // Google Workspace img → inline SVG
  content = content.split(OLD_GWS_IMG).join(NEW_GWS_SVG);

  // Icon replacements
  content = content.split(OLD_CODE_SVG_SPAN).join(NEW_CODE_SVG_SPAN);
  content = content.split(OLD_REDESIGN_SPAN).join(NEW_REDESIGN_SPAN);
  content = content.split(OLD_EMAIL_SVG_SPAN).join(NEW_EMAIL_SVG_SPAN);
  content = content.split(OLD_LOCK_SPAN).join(NEW_LOCK_SPAN);
  content = content.split(OLD_SEARCH_SPAN).join(NEW_SEARCH_SPAN);
  content = content.split(OLD_SMS_SPAN).join(NEW_SMS_SPAN);
  content = content.split(OLD_SHIELD_SPAN).join(NEW_SHIELD_SPAN);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${file}`);
    fixed++;
  } else {
    console.log(`- Unchanged: ${file}`);
  }
});

console.log(`\n=====================================`);
console.log(`Fixed ${fixed} / ${htmlFiles.length} files`);
console.log(`=====================================`);
