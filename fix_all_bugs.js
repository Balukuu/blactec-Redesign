/**
 * fix_all_bugs.js — BlacTec Redesign Bug Fixer
 * 
 * Fixes identified across all HTML pages:
 * 1. btn-outline → btn-ghost (zoho-mail.html, microsoft-365.html)
 * 2. Remove leftover payment-badge elements from footer-bottom sections (all pages)
 * 3. Fix duplicate <main> tag in web-development.html
 * 4. Remove literal \\n CSS artifacts in web-development.html and web-hosting.html (and any others)
 * 5. Remove duplicate "Scroll to Top / WhatsApp FAB" comment blocks (zoho-mail, microsoft-365, etc.)
 * 6. Add null-guard to desktopGetStarted in pages that don't have it properly guarded
 */

const fs = require('fs');
const path = require('path');

const dir = __dirname;

// Get all HTML files
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let totalFixed = 0;
let fileChanges = {};

function fix(file, content) {
  let changed = false;
  const original = content;

  // ============================================================
  // FIX 1: btn-outline → btn-ghost
  // ============================================================
  if (content.includes('btn-outline')) {
    content = content.replace(/\bbtn-outline\b/g, 'btn-ghost');
    console.log(`  [FIX 1] btn-outline → btn-ghost`);
    changed = true;
  }

  // ============================================================
  // FIX 2: Remove payment-badge elements from footer-bottom
  // These are the Airtel/Visa/Mastercard badge divs that were
  // supposed to be removed in a previous session but remain.
  // They are nested inside footer-bottom and should be removed.
  // Pattern: the entire block from <!-- Airtel Money --> to </div>
  // that wraps the 3 payment-badge divs.
  // ============================================================
  // Match: the payment-badge divs block (including surrounding whitespace)
  // These appear after the footer-bottom-links closing div tag
  const paymentBlock = /\s*<!-- Airtel Money -->[\s\S]*?<!-- Mastercard -->[\s\S]*?<\/div>\s*(?=\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/footer>)/g;
  if (paymentBlock.test(content)) {
    content = content.replace(paymentBlock, '');
    console.log(`  [FIX 2] Removed payment badges from footer`);
    changed = true;
  }

  // ============================================================
  // FIX 3: Remove duplicate <main> / <main id="main-content"> 
  // In web-development.html there's:
  //   <main>
  //     <main id="main-content">
  // Fix: remove the outer plain <main> tag and its duplicate
  // ============================================================
  if (content.includes('<main>\n  \n<main id="main-content">') ||
      content.includes('<main>\n\n<main id="main-content">') ||
      content.includes('<main>\n    \n<main id="main-content">')) {
    content = content
      .replace(/<main>\s*\n\s*<main id="main-content">/g, '<main id="main-content">')
      .replace(/<\/main>\s*\n\s*<\/body>/g, '</main>\n</body>');
    console.log(`  [FIX 3] Fixed duplicate <main> tag`);
    changed = true;
  }
  // Simpler pattern for the web-development case:
  const dualMain = /<main>\n([\s]*)\n<main id="main-content">/;
  if (dualMain.test(content)) {
    content = content.replace(dualMain, '<main id="main-content">');
    console.log(`  [FIX 3b] Fixed duplicate <main> tag (pattern 2)`);
    changed = true;
  }

  // ============================================================
  // FIX 4: Remove literal \\n (backslash-n) in CSS <style> block
  // These appear as: \n   (literal backslash + n + spaces)
  // inside <style>...</style> tags — they are CSS parse artifacts
  // ============================================================
  // The artifact looks like: \n  \n  or \\n  
  if (content.includes('\\n  \n')) {
    content = content.replace(/\\n\s*\n/g, '\n');
    console.log(`  [FIX 4] Removed literal \\n CSS artifact`);
    changed = true;
  }
  // Also clean up the exact pattern found: `\n  ` followed by a real newline 
  if (content.includes('\\\n  \n')) {
    content = content.replace(/\\\n\s*\n/g, '\n');
    changed = true;
  }

  // ============================================================
  // FIX 5: Remove duplicate "Scroll to Top / WhatsApp FAB" comment blocks
  // In zoho-mail.html and microsoft-365.html, these are duplicated 3x:
  //   <!-- Scroll to Top -->
  //   <!-- WhatsApp FAB -->
  // (with empty content after the first real ones)
  // Keep only the first occurrence of each actual element; 
  // remove the empty comment-only duplicates below them.
  // ============================================================
  // Pattern: multiple occurrences of comment-only blocks after the real buttons
  const dupScrollComments = /(<\/a>\s*\n\s*\n)\s*<!-- Scroll to Top -->\s*\n\s*\n\s*<!-- WhatsApp FAB -->\s*\n\s*\n\s*\n\s*<!-- Scroll to Top -->\s*\n\s*\n\s*<!-- WhatsApp FAB -->/g;
  if (dupScrollComments.test(content)) {
    content = content.replace(dupScrollComments, '$1');
    console.log(`  [FIX 5] Removed duplicate Scroll/WA comment blocks`);
    changed = true;
  }
  
  // More targeted: Remove empty comment blocks that appear after the real button elements
  // Look for pattern: real #whatsappFab anchor closing tag, then duplicated empty comment sections
  const dupPattern = /(id="whatsappFab"[\s\S]*?<\/a>)((\s*\n\s*<!-- Scroll to Top -->\s*\n\s*\n\s*<!-- WhatsApp FAB -->\s*\n\s*\n){2,})/g;
  if (dupPattern.test(content)) {
    content = content.replace(dupPattern, '$1\n\n');
    console.log(`  [FIX 5b] Removed duplicate Scroll/WA comment blocks (pattern 2)`);
    changed = true;
  }

  // ============================================================
  // FIX 6: Guard desktopGetStarted null reference
  // On pages that use: desktopGetStarted.style.display = ...
  // but don't guard against null. Wrap in if (desktopGetStarted)
  // ============================================================
  // Pattern to catch the un-guarded version:
  const unguardedDesktop = /function updateDesktopButtons\s*\(\s*\)\s*\{\s*\n\s*var show = window\.innerWidth >= 1024;\s*\n\s*desktopGetStarted\.style\.display = show \? 'inline-flex' : 'none';\s*\n\s*\}/g;
  if (unguardedDesktop.test(content)) {
    content = content.replace(unguardedDesktop,
      `function updateDesktopButtons() {\n    if (!desktopGetStarted) return;\n    var show = window.innerWidth >= 1024;\n    desktopGetStarted.style.display = show ? 'inline-flex' : 'none';\n  }`
    );
    console.log(`  [FIX 6] Added null-guard to desktopGetStarted`);
    changed = true;
  }

  // ============================================================
  // FIX 7: web-development.html has a nested duplicate <main>
  // It literally reads:
  //   <main>
  //   \n
  //   <main id="main-content">
  // Let's do a direct text replacement for this file
  // ============================================================
  if (file === 'web-development.html') {
    if (content.includes('<main>\n  \n<main id="main-content">') ||
        content.match(/<main>\s*\n+\s*<main id="main-content">/)) {
      content = content.replace(/<main>\s*\n+\s*<main id="main-content">/, '<main id="main-content">');
      console.log(`  [FIX 7] Fixed web-development.html duplicate <main>`);
      changed = true;
    }
  }

  if (changed) {
    fileChanges[file] = true;
    totalFixed++;
  }
  return content;
}

// Process each file
htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  console.log(`\nProcessing: ${file}`);
  const fixed = fix(file, content);
  
  if (fileChanges[file]) {
    fs.writeFileSync(filePath, fixed, 'utf8');
    console.log(`  ✓ Saved`);
  } else {
    console.log(`  - No changes needed`);
  }
});

console.log(`\n========================================`);
console.log(`Done! Fixed ${totalFixed} / ${htmlFiles.length} files.`);
console.log(`========================================`);
