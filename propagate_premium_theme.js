/**
 * propagate_premium_theme.js
 * 
 * Propagates the homepage hero background (grid, blobs, particles, icons)
 * to all sub-pages.
 * 
 * Logic:
 * 1. Read all HTML files.
 * 2. Identify the hero section (ID ends in -hero, or class contains hero).
 * 3. Inject the CSS block for background animations into the <style> tag.
 * 4. Inject the HTML elements at the top of the hero section.
 * 5. Update the hero section rule to have position: relative and overflow: hidden.
 */

const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

// The CSS to inject
const HERO_THEME_CSS = `
    /* ============================================================
       PREMIUM HERO THEME (Propagated)
       ============================================================ */
    .hero-bg {
      position: absolute;
      inset: 0;
      background: var(--gradient-hero);
      z-index: 0;
    }
    .hero-grid-overlay {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 60px 60px;
      z-index: 1;
      pointer-events: none;
    }
    .hero-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      z-index: 0;
      animation: blobFloat 12s ease-in-out infinite;
    }
    .hero-blob-1 { width: 500px; height: 500px; background: rgba(124,92,252,0.18); top: -10%; left: 20%; animation-delay: 0s; }
    .hero-blob-2 { width: 350px; height: 350px; background: rgba(0,229,255,0.10); top: 30%; right: 10%; animation-delay: 4s; }
    @keyframes blobFloat {
      0%,100% { transform: translate(0,0) scale(1); }
      50% { transform: translate(20px,-20px) scale(1.05); }
    }
    .hero-icons-wrap { position: absolute; inset: 0; pointer-events: none; z-index: 5; opacity: 0.5; }
    .hero-icon {
      position: absolute; width: 60px; height: 60px;
      border: 1.5px solid var(--color-primary); border-radius: 12px;
      background: rgba(124,92,252,0.1); backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      animation: heroIconFloat 6s ease-in-out infinite;
      color: var(--color-primary);
    }
    .hi-1 { top: 18%; left: 10%; animation-delay: 0s; }
    .hi-2 { bottom: 25%; left: 15%; animation-delay: 2s; }
    .hi-3 { top: 25%; right: 10%; animation-delay: 4s; }
    @keyframes heroIconFloat {
      0%, 100% { transform: translateY(0) rotate(0); }
      50% { transform: translateY(-15px) rotate(4deg); }
    }
    .hero-particles { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
    .particle {
      position: absolute; border-radius: 50%;
      animation: particleFloat linear infinite;
    }
    @keyframes particleFloat {
      0% { transform: translateY(0) scale(1); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 0.6; }
      100% { transform: translateY(-120px) scale(0.5); opacity: 0; }
    }
`;

// The HTML elements to inject
const HERO_THEME_HTML = `
    <div class="hero-bg"></div>
    <div class="hero-grid-overlay"></div>
    <div class="hero-blob hero-blob-1"></div>
    <div class="hero-blob hero-blob-2"></div>
    <div class="hero-particles" id="heroParticles"></div>
    <div class="hero-icons-wrap">
      <div class="hero-icon hi-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6M12 5v14" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div class="hero-icon hi-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
      <div class="hero-icon hi-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
    </div>`;

htmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Inject CSS
    // We look for the closing </style> and inject before it
    const styleEndIdx = content.lastIndexOf('</style>');
    if (styleEndIdx !== -1) {
        content = content.slice(0, styleEndIdx) + HERO_THEME_CSS + content.slice(styleEndIdx);
    }

    // 2. Identify and Update Hero Section
    // Hero sections often have IDs like "hosting-hero", "gw-hero", "zoho-hero", etc.
    // Or class "hero-section".
    // We'll search for <section id="[something]-hero" or <section class="hero-section"
    const heroPattern = /<section\s+(?:id="([^"]*-hero)"|class="([^"]*hero[^"]*)")/i;
    const match = content.match(heroPattern);

    if (match) {
        const fullTag = match[0];
        const heroId = match[1];
        const heroClass = match[2];

        console.log(`Processing: ${file} (Found hero: ${heroId || heroClass})`);

        // Inject HTML
        const sectionEndIdx = content.indexOf('>', content.indexOf(fullTag)) + 1;
        content = content.slice(0, sectionEndIdx) + '\n    ' + HERO_THEME_HTML + content.slice(sectionEndIdx);

        // Update CSS for this hero to have position: relative and overflow: hidden
        // This is handled by a catch-all CSS rule we inject or by updating the specific ID rule.
        // Let's just add a general rule to the injected CSS for all hero IDs.
        const heroCssRule = `\n    [id*="-hero"], .hero-section { position: relative; overflow: hidden; }\n`;
        content = content.replace(HERO_THEME_CSS, HERO_THEME_CSS + heroCssRule);
    } else {
        console.warn(`Warning: Could not find hero section in ${file}. Checking for first <section> in <main>...`);
        // Fallback: look for the first <section> after <main>
        const mainIdx = content.indexOf('<main');
        if (mainIdx !== -1) {
            const firstSectionIdx = content.indexOf('<section', mainIdx);
            if (firstSectionIdx !== -1) {
                const sectionTagEnd = content.indexOf('>', firstSectionIdx) + 1;
                content = content.slice(0, sectionTagEnd) + '\n    ' + HERO_THEME_HTML + content.slice(sectionTagEnd);
                
                // Add relative/hidden to first section
                const sectionTag = content.substring(firstSectionIdx, sectionTagEnd);
                if (!sectionTag.includes('style')) {
                    content = content.replace(sectionTag, sectionTag.replace('<section', '<section style="position:relative;overflow:hidden;"'));
                }
                console.log(`✓ Applied fallback injection to ${file}`);
            }
        }
    }

    // 3. Injected Particle Script (from index.html)
    // Sub-pages need the JS to actually spawn the particles.
    const particleScript = `
    <script>
    function initParticles() {
      const container = document.getElementById('heroParticles');
      if(!container) return;
      const particleCount = 20;
      for(let i=0; i<particleCount; i++){
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 3 + 2;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.background = 'rgba(124,92,252,' + (Math.random() * 0.3 + 0.1) + ')';
        p.style.animationDuration = (Math.random() * 4 + 4) + 's';
        p.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(p);
      }
    }
    document.addEventListener('DOMContentLoaded', initParticles);
    </script>
    `;
    
    // Inject before </body>
    const bodyEndIdx = content.lastIndexOf('</body>');
    if (bodyEndIdx !== -1) {
        content = content.slice(0, bodyEndIdx) + particleScript + content.slice(bodyEndIdx);
    }

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Done: Propagated premium hero theme to all sub-pages.');
