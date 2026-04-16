/**
 * fix_footer_css.js
 * 
 * Sub-pages are missing the #footer and .footer-grid CSS rules
 * (grid layout, background, padding, responsive breakpoints).
 * Without them the footer renders as a single stacked column.
 *
 * This script injects the complete footer layout CSS block into
 * every HTML file that has .footer-brand-logo but is missing
 * the .footer-grid grid definition.
 */

const fs   = require('fs');
const path = require('path');

const dir       = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

/* ----------------------------------------------------------------
   The complete footer layout CSS to inject — matches index.html
   Updated for our 5-column footer: 2fr 1fr 1fr 1fr 1fr
   ---------------------------------------------------------------- */
const FOOTER_CSS = `
    /* ============================================================
       FOOTER LAYOUT
       ============================================================ */
    #footer { background: #060709; border-top: 1px solid var(--color-border); padding: 80px 0 0; }
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
      gap: 40px;
      padding-bottom: 64px;
    }
    @media (max-width: 1100px) {
      .footer-grid { grid-template-columns: 1fr 1fr 1fr; }
    }
    @media (max-width: 700px) {
      .footer-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 480px) {
      .footer-grid { grid-template-columns: 1fr; }
    }`;

/* ----------------------------------------------------------------
   The anchor CSS line present in sub-pages (just before scrollbar hide)
   We inject the footer grid block right before the closing </style>
   ---------------------------------------------------------------- */
const ANCHOR = `    /* Hide scrollbars site-wide while maintaining scroll functionality */`;
const ANCHOR2 = `\n  </style>`;

let fixed = 0;

htmlFiles.forEach(file => {
  // Skip index.html — it already has the correct CSS
  if (file === 'index.html') {
    console.log(`SKIP (index.html already correct)`);
    return;
  }

  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Only process files that have the footer HTML but are missing footer-grid
  if (!content.includes('.footer-brand-logo') || content.includes('.footer-grid')) {
    console.log(`SKIP (already has footer-grid or no footer): ${file}`);
    return;
  }

  // Inject before the scrollbar comment line if present
  if (content.includes(ANCHOR)) {
    content = content.replace(ANCHOR, FOOTER_CSS + '\n\n    ' + ANCHOR.trim());
    console.log(`✓ Fixed (anchor method):  ${file}`);
  } else {
    // Fallback: inject before closing </style>
    const closeStyle = content.lastIndexOf('</style>');
    if (closeStyle === -1) {
      console.log(`SKIP (no </style> found): ${file}`);
      return;
    }
    content = content.slice(0, closeStyle) + FOOTER_CSS + '\n  ' + content.slice(closeStyle);
    console.log(`✓ Fixed (fallback method): ${file}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  fixed++;
});

console.log(`\n=====================================`);
console.log(`Fixed: ${fixed} files`);
console.log(`=====================================`);
