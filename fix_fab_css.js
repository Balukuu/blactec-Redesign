/**
 * fix_fab_css.js
 * Injects the complete base CSS for #whatsappFab and #scrollTop into every
 * sub-page that has the hover/animation styles but is missing the base styles.
 * index.html is skipped (it already has correct base CSS).
 */

const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir)
  .filter(f => f.endsWith('.html') && f !== 'index.html');

// The canonical base CSS block to inject — matches index.html exactly
const FAB_BASE_CSS = `
    /* ============================================================
       SCROLL TO TOP BUTTON
       ============================================================ */
    #scrollTop {
      position: fixed;
      bottom: 32px;
      right: 32px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--gradient-brand);
      color: #fff;
      border: none;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px var(--color-primary-glow);
      z-index: 7000;
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
    }
    #scrollTop.show { opacity: 1; visibility: visible; transform: translateY(0); }
    #scrollTop:hover { transform: translateY(-3px); box-shadow: 0 8px 28px var(--color-primary-glow); }

    /* ============================================================
       WHATSAPP FAB
       ============================================================ */
    #whatsappFab {
      position: fixed;
      bottom: 90px;
      right: 32px;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #25D366;
      color: #fff;
      border: none;
      font-size: 26px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(37,211,102,0.4);
      z-index: 7001;
      text-decoration: none;
      transition: transform 0.25s, box-shadow 0.25s;
    }
    #whatsappFab:hover { transform: scale(1.1); box-shadow: 0 8px 30px rgba(37,211,102,0.55); }
    #whatsappFab::before {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid rgba(37,211,102,0.5);
      animation: waPulse 2.5s ease-out infinite;
    }
    @keyframes waPulse {
      0% { transform: scale(1); opacity: 0.7; }
      100% { transform: scale(1.5); opacity: 0; }
    }
    @media (max-width: 480px) {
      #whatsappFab { bottom: 76px; right: 20px; width: 46px; height: 46px; font-size: 22px; }
      #scrollTop { bottom: 20px; right: 20px; width: 40px; height: 40px; }
    }
`;

let fixed = 0;
let skipped = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has the base position:fixed style for the FAB
  if (content.includes('#whatsappFab {') || content.includes('#whatsappFab{')) {
    console.log(`SKIP (already has base) : ${file}`);
    skipped++;
    return;
  }

  // Check that it has the old partial styles to replace
  const hasPartial = content.includes('#whatsappFab:hover') || content.includes('#whatsappFab::before');

  if (!hasPartial) {
    // No FAB styles at all — inject before </style>
    // Find the first closing </style> tag and inject before it
    const styleCloseIdx = content.indexOf('</style>');
    if (styleCloseIdx === -1) {
      console.log(`SKIP (no </style>)       : ${file}`);
      skipped++;
      return;
    }
    content = content.slice(0, styleCloseIdx) + FAB_BASE_CSS + '\n  ' + content.slice(styleCloseIdx);
    console.log(`FIX (injected fresh)    : ${file}`);
  } else {
    // Replace the partial hover/before block with the full base+hover+before block
    // Pattern: #whatsappFab:hover { ... } ... ::before { ... } ... @keyframes waPulse { ... }
    // along with any @media block referencing these elements
    const partialPattern = /(\s*#whatsappFab:hover\s*\{[^}]+\}\s*)(#whatsappFab::before\s*\{[\s\S]*?@keyframes waPulse\s*\{[\s\S]*?\}\s*)?(@media\s*\([^)]*\)\s*\{[^{]*#whatsappFab[^}]*\}[^}]*\}\s*)?/;
    const match = partialPattern.exec(content);
    if (match) {
      content = content.replace(partialPattern, FAB_BASE_CSS);
      console.log(`FIX (replaced partial)  : ${file}`);
    } else {
      // Simpler: find the existing partial and prepend the base block before it
      const insertAt = content.indexOf('#whatsappFab:hover');
      if (insertAt !== -1) {
        content = content.slice(0, insertAt) + FAB_BASE_CSS.trimStart() + '\n    ' + content.slice(insertAt);
        console.log(`FIX (prepended base)    : ${file}`);
      } else {
        console.log(`SKIP (pattern not found): ${file}`);
        skipped++;
        return;
      }
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  fixed++;
});

console.log(`\n=====================================`);
console.log(`Fixed: ${fixed} | Skipped: ${skipped}`);
console.log(`=====================================`);
