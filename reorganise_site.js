/**
 * reorganise_site.js
 * 
 * Phase 1 + 2 combined:
 * - Replaces the nav (desktop + mobile) across ALL 23 HTML files
 * - Replaces the footer across ALL 23 HTML files  
 * - Restructures the index.html homepage sections
 * 
 * Priority order: Build (Web Dev) → Email → Hosting → Domains → More → About
 */

const fs   = require('fs');
const path = require('path');

const dir      = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

/* ================================================================
   CANONICAL SVGs & ICONS (shared across nav items)
   ================================================================ */
const CODE_SVG  = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
const EMAIL_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
const LOCK_SVG  = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
const SEARCH_SVG= `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;
const SHIELD_SVG= `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
const SMS_SVG   = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
const REDESIGN_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>`;
const CART_EMOJI = `🛒`;
const WP_SVG    = `<svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-primary)"><path d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.05-.176 2.986-.503l-2.828-7.702zm-7.42-3.993c-.415.701-.652 1.516-.652 2.384 0 1.5.714 2.824 1.815 3.665l3.388-9.306c-1.896.65-3.41 1.84-4.55 3.257zm12.633-.633c.607.82.971 1.828.971 2.924 0 1.1-.36 2.1-.967 2.916l2.457 7.122c1.777-2.146 2.84-4.897 2.84-7.905 0-3.32-1.29-6.33-3.402-8.58l-1.899 3.523zM12.012 2C6.482 2 2.012 6.47 2.012 12c0 5.53 4.47 10 10 10s10-4.47 10-10c0-5.53-4.47-10-10-10zm.42 1.055c3.02.134 5.572 2.08 6.74 4.777l-.924 1.733c-.73-.836-1.76-1.365-2.914-1.365-.24 0-.472.023-.695.067L12.432 3.055z"/></svg>`;
const GWS_IMG   = `<img src="https://www.gstatic.com/images/branding/product/2x/google_workspace_24dp.png" width="18" height="18" alt="Google Workspace">`;
const ZOHO_SVG  = `<svg width="20" height="20" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="#e63946"/><path d="M22 6L12 13L2 6" stroke="#ffffff" stroke-width="2" fill="none"/></svg>`;
const M365_SVG  = `<svg width="20" height="20" viewBox="0 0 20 20"><rect x="1" y="1" width="8" height="8" fill="#f25022"/><rect x="11" y="1" width="8" height="8" fill="#7fba00"/><rect x="1" y="11" width="8" height="8" fill="#00a4ef"/><rect x="11" y="11" width="8" height="8" fill="#ffb900"/></svg>`;
const CHEVRON   = `<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg>`;
const CHEVRON16 = `<svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg>`;

/* ================================================================
   CANONICAL DESKTOP NAV  (new priority order)
   ================================================================ */
const DESKTOP_NAV = `        <ul class="nav-links" role="list">
          <!-- BUILD (Web & App Development — #1 priority) -->
          <li class="nav-item">
            <div class="nav-link" tabindex="0" aria-haspopup="true" aria-expanded="false">
              Build
              ${CHEVRON}
            </div>
            <div class="nav-dropdown" role="menu">
              <a href="web-development.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">${CODE_SVG}</span>
                <div class="nav-dropdown-text"><strong>Web &amp; App Development</strong><span>Custom websites, web apps &amp; digital platforms</span></div>
              </a>
              <a href="web-development.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">${REDESIGN_SVG}</span>
                <div class="nav-dropdown-text"><strong>Website Redesign</strong><span>Modernise &amp; rebuild your existing site</span></div>
              </a>
              <a href="ecommerce-development.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">${CART_EMOJI}</span>
                <div class="nav-dropdown-text"><strong>E-commerce Development</strong><span>Online stores with MoMo &amp; Airtel integration</span></div>
              </a>
              <a href="wordpress-development.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">${WP_SVG}</span>
                <div class="nav-dropdown-text"><strong>WordPress Development</strong><span>CMS-powered websites &amp; blogs</span></div>
              </a>
              <a href="website-maintenance.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">🔧</span>
                <div class="nav-dropdown-text"><strong>Website Maintenance</strong><span>Updates, backups &amp; ongoing support</span></div>
              </a>
            </div>
          </li>
          <!-- EMAIL SOLUTIONS (#2 priority) -->
          <li class="nav-item">
            <div class="nav-link" tabindex="0" aria-haspopup="true" aria-expanded="false">
              Email
              ${CHEVRON}
            </div>
            <div class="nav-dropdown" role="menu">
              <a href="business-email.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">${EMAIL_SVG}</span>
                <div class="nav-dropdown-text"><strong>Business Email</strong><span>Professional @yourdomain.ug addresses</span></div>
              </a>
              <a href="google-workspace.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">${GWS_IMG}</span>
                <div class="nav-dropdown-text"><strong>Google Workspace</strong><span>Gmail, Drive, Meet &amp; more for teams</span></div>
              </a>
              <a href="zoho-mail.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">${ZOHO_SVG}</span>
                <div class="nav-dropdown-text"><strong>Zoho Mail</strong><span>Ad-free, secure email &amp; workplace</span></div>
              </a>
              <a href="microsoft-365.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">${M365_SVG}</span>
                <div class="nav-dropdown-text"><strong>Microsoft 365</strong><span>Word, Excel, Teams &amp; Outlook</span></div>
              </a>
            </div>
          </li>
          <!-- HOSTING (#3 priority) -->
          <li class="nav-item">
            <div class="nav-link" tabindex="0" aria-haspopup="true" aria-expanded="false">
              Hosting
              ${CHEVRON}
            </div>
            <div class="nav-dropdown" role="menu">
              <a href="web-hosting.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">🌐</span>
                <div class="nav-dropdown-text"><strong>Web Hosting</strong><span>Shared Linux hosting with cPanel</span></div>
              </a>
              <a href="wordpress-hosting.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">${WP_SVG}</span>
                <div class="nav-dropdown-text"><strong>WordPress Hosting</strong><span>Managed WordPress with 1-click install</span></div>
              </a>
              <a href="vps-hosting.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">⚡</span>
                <div class="nav-dropdown-text"><strong>VPS Hosting</strong><span>Full root access, scalable resources</span></div>
              </a>
              <a href="cloud-hosting.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">☁️</span>
                <div class="nav-dropdown-text"><strong>Cloud Hosting</strong><span>Scale fast with cloud infrastructure</span></div>
              </a>
              <a href="reseller-hosting.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">🏢</span>
                <div class="nav-dropdown-text"><strong>Reseller Hosting</strong><span>Start your own hosting business</span></div>
              </a>
            </div>
          </li>
          <!-- DOMAINS (#4) -->
          <li class="nav-item">
            <div class="nav-link" tabindex="0" aria-haspopup="true" aria-expanded="false">
              Domains
              ${CHEVRON}
            </div>
            <div class="nav-dropdown" role="menu">
              <a href="domain-search.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">${SEARCH_SVG}</span>
                <div class="nav-dropdown-text"><strong>Domain Search</strong><span>Find &amp; register your perfect domain</span></div>
              </a>
              <a href="ug-domains.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">🇺🇬</span>
                <div class="nav-dropdown-text"><strong>.UG Domains</strong><span>Official Uganda country domain</span></div>
              </a>
              <a href="domain-transfer.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">🔁</span>
                <div class="nav-dropdown-text"><strong>Domain Transfer</strong><span>Move your domain to BlacTec</span></div>
              </a>
              <a href="whois-privacy.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">${LOCK_SVG}</span>
                <div class="nav-dropdown-text"><strong>Free WHOIS Privacy</strong><span>Protect your registration info</span></div>
              </a>
            </div>
          </li>
          <!-- MORE (#5) -->
          <li class="nav-item">
            <div class="nav-link" tabindex="0" aria-haspopup="true" aria-expanded="false">
              More
              ${CHEVRON}
            </div>
            <div class="nav-dropdown" role="menu">
              <a href="ssl-certificates.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">🔒</span>
                <div class="nav-dropdown-text"><strong>SSL Certificates</strong><span>Encrypt &amp; secure your website</span></div>
              </a>
              <a href="seo-services.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">🔍</span>
                <div class="nav-dropdown-text"><strong>SEO Services</strong><span>Rank higher on Google Search</span></div>
              </a>
              <a href="bulk-sms.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">${SMS_SVG}</span>
                <div class="nav-dropdown-text"><strong>Bulk SMS</strong><span>Reach customers via SMS marketing</span></div>
              </a>
              <a href="website-security.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">${SHIELD_SVG}</span>
                <div class="nav-dropdown-text"><strong>Website Security</strong><span>Firewalls, malware scanning &amp; protection</span></div>
              </a>
            </div>
          </li>
          <li><a href="index.html#about" class="nav-link-plain">About</a></li>
        </ul>`;

/* ================================================================
   CANONICAL MOBILE NAV
   ================================================================ */
const MOBILE_NAV = `<div class="mobile-nav" id="mobileNav" aria-hidden="true">
  <!-- BUILD -->
  <div class="mobile-nav-item">
    <div class="mobile-nav-header" id="mnh-build" tabindex="0">Build
      ${CHEVRON16}
    </div>
    <div class="mobile-sub-links" id="msl-build">
      <a href="web-development.html" class="mobile-sub-link">💻 Web &amp; App Development</a>
      <a href="web-development.html" class="mobile-sub-link">🔄 Website Redesign</a>
      <a href="ecommerce-development.html" class="mobile-sub-link">🛒 E-commerce Development</a>
      <a href="wordpress-development.html" class="mobile-sub-link">📝 WordPress Development</a>
      <a href="website-maintenance.html" class="mobile-sub-link">🔧 Website Maintenance</a>
    </div>
  </div>
  <!-- EMAIL -->
  <div class="mobile-nav-item">
    <div class="mobile-nav-header" id="mnh-email" tabindex="0">Email
      ${CHEVRON16}
    </div>
    <div class="mobile-sub-links" id="msl-email">
      <a href="business-email.html" class="mobile-sub-link">✉️ Business Email</a>
      <a href="google-workspace.html" class="mobile-sub-link">🔷 Google Workspace</a>
      <a href="zoho-mail.html" class="mobile-sub-link">📧 Zoho Mail</a>
      <a href="microsoft-365.html" class="mobile-sub-link">🏢 Microsoft 365</a>
    </div>
  </div>
  <!-- HOSTING -->
  <div class="mobile-nav-item">
    <div class="mobile-nav-header" id="mnh-hosting" tabindex="0">Hosting
      ${CHEVRON16}
    </div>
    <div class="mobile-sub-links" id="msl-hosting">
      <a href="web-hosting.html" class="mobile-sub-link">🌐 Web Hosting</a>
      <a href="wordpress-hosting.html" class="mobile-sub-link">🎯 WordPress Hosting</a>
      <a href="vps-hosting.html" class="mobile-sub-link">⚡ VPS Hosting</a>
      <a href="cloud-hosting.html" class="mobile-sub-link">☁️ Cloud Hosting</a>
      <a href="reseller-hosting.html" class="mobile-sub-link">🏢 Reseller Hosting</a>
    </div>
  </div>
  <!-- DOMAINS -->
  <div class="mobile-nav-item">
    <div class="mobile-nav-header" id="mnh-domain" tabindex="0">Domains
      ${CHEVRON16}
    </div>
    <div class="mobile-sub-links" id="msl-domain">
      <a href="domain-search.html" class="mobile-sub-link">🔍 Domain Search</a>
      <a href="ug-domains.html" class="mobile-sub-link">🇺🇬 .UG Domains</a>
      <a href="domain-transfer.html" class="mobile-sub-link">🔁 Domain Transfer</a>
      <a href="whois-privacy.html" class="mobile-sub-link">🔒 Free WHOIS Privacy</a>
    </div>
  </div>
  <!-- MORE -->
  <div class="mobile-nav-item">
    <div class="mobile-nav-header" id="mnh-more" tabindex="0">More
      ${CHEVRON16}
    </div>
    <div class="mobile-sub-links" id="msl-more">
      <a href="ssl-certificates.html" class="mobile-sub-link">🔒 SSL Certificates</a>
      <a href="seo-services.html" class="mobile-sub-link">🔍 SEO Services</a>
      <a href="bulk-sms.html" class="mobile-sub-link">💬 Bulk SMS</a>
      <a href="website-security.html" class="mobile-sub-link">🛡️ Website Security</a>
    </div>
  </div>
  <a href="index.html#about" class="mobile-nav-plain">About</a>
  <div class="mobile-nav-buttons">
    <a href="web-development.html" class="btn btn-primary">Start Your Project</a>
  </div>
</div>`;

/* ================================================================
   CANONICAL FOOTER
   ================================================================ */
const FOOTER_HTML = `<footer id="footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <!-- Brand -->
      <div>
        <span class="footer-brand-logo">blac<span class="lac">tec</span>.</span>
        <p class="footer-brand-desc">Building the Digital Future — Africa's leading web development, email solutions &amp; hosting provider. Based in Kampala, serving businesses across East Africa.</p>
        <div class="footer-socials">
          <a href="#" class="footer-social" aria-label="Twitter/X">𝕏</a>
          <a href="#" class="footer-social" aria-label="Facebook">f</a>
          <a href="#" class="footer-social" aria-label="LinkedIn">in</a>
          <a href="#" class="footer-social" aria-label="Instagram">◎</a>
        </div>
        <p style="font-size:12px;color:var(--color-text-muted);">© 2026 BlacTec. All rights reserved.</p>
      </div>

      <!-- Build (Web Dev — #1 priority) -->
      <div class="footer-col">
        <h4>Build</h4>
        <ul>
          <li><a href="web-development.html">Web &amp; App Development</a></li>
          <li><a href="web-development.html">Website Redesign</a></li>
          <li><a href="ecommerce-development.html">E-commerce Development</a></li>
          <li><a href="wordpress-development.html">WordPress Development</a></li>
          <li><a href="website-maintenance.html">Website Maintenance</a></li>
        </ul>
      </div>

      <!-- Email & Solutions (#2 priority) -->
      <div class="footer-col">
        <h4>Email &amp; Solutions</h4>
        <ul>
          <li><a href="business-email.html">Business Email</a></li>
          <li><a href="google-workspace.html">Google Workspace</a></li>
          <li><a href="zoho-mail.html"><svg width="14" height="14" style="vertical-align:text-bottom;margin-right:5px;" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="#e63946"/><path d="M22 6L12 13L2 6" stroke="#fff" stroke-width="2" fill="none"/></svg>Zoho Mail</a></li>
          <li><a href="microsoft-365.html"><svg width="14" height="14" style="vertical-align:text-bottom;margin-right:5px;" viewBox="0 0 20 20"><rect x="1" y="1" width="8" height="8" fill="#f25022"/><rect x="11" y="1" width="8" height="8" fill="#7fba00"/><rect x="1" y="11" width="8" height="8" fill="#00a4ef"/><rect x="11" y="11" width="8" height="8" fill="#ffb900"/></svg>Microsoft 365</a></li>
          <li><a href="ssl-certificates.html">SSL Certificates</a></li>
        </ul>
      </div>

      <!-- Hosting & Domains (#3 priority) -->
      <div class="footer-col">
        <h4>Hosting &amp; Domains</h4>
        <ul>
          <li><a href="web-hosting.html">Shared Hosting</a></li>
          <li><a href="wordpress-hosting.html">WordPress Hosting</a></li>
          <li><a href="vps-hosting.html">VPS Hosting</a></li>
          <li><a href="cloud-hosting.html">Cloud Hosting</a></li>
          <li><a href="domain-search.html">Domain Registration</a></li>
          <li><a href="ug-domains.html">.UG Domains</a></li>
        </ul>
      </div>

      <!-- Company -->
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="index.html#about">About BlacTec</a></li>
          <li><a href="index.html#contact">Our Portfolio</a></li>
          <li><a href="https://wa.me/256750870755">Help Center</a></li>
          <li><a href="index.html#contact">Privacy Policy</a></li>
          <li><a href="index.html#contact">Terms of Service</a></li>
          <li><a href="index.html#contact">Contact Us</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span class="footer-copy">© 2026 BlacTec Technologies Ltd. Kampala, Uganda.</span>
      <div class="footer-bottom-links">
        <a href="index.html#contact">Privacy</a>
        <a href="index.html#contact">Terms</a>
        <a href="https://wa.me/256750870755">Support</a>
      </div>
    </div>
  </div>
</footer>`;

/* ================================================================
   HELPER: replace nav block in a file
   ================================================================ */
function replaceNav(content) {
  // Replace desktop nav links block
  // Pattern: from <ul class="nav-links" to closing </ul> before </nav>
  const navStart = /<ul class="nav-links"[^>]*role="list">/;
  const navStartIdx = content.search(navStart);
  if (navStartIdx === -1) return content;

  // Find closing </ul> for nav-links (balance ul tags)
  let depth = 0;
  let i = navStartIdx;
  while (i < content.length) {
    if (content.slice(i, i+4) === '<ul ') depth++;
    else if (content.slice(i, i+3) === '<ul') depth++;
    else if (content.slice(i, i+5) === '</ul>') {
      depth--;
      if (depth === 0) { i += 5; break; }
    }
    i++;
  }
  const before = content.slice(0, navStartIdx);
  const after  = content.slice(i);
  content = before + DESKTOP_NAV + after;

  // Replace mobile nav block
  // Pattern: <div class="mobile-nav" id="mobileNav" ... to its closing </div>
  const mobileStart = /<!-- Mobile nav overlay -->\s*\n\s*\n\s*<!-- Mobile nav overlay -->\s*\n/;
  const mobileStart2 = /<!-- Mobile nav overlay -->\s*\n/;
  
  // Find the mobile-nav div
  const mobileNavStart = content.indexOf('<div class="mobile-nav" id="mobileNav"');
  if (mobileNavStart !== -1) {
    // Find its closing tag by balancing div tags
    let d2 = 0;
    let j = mobileNavStart;
    while (j < content.length) {
      if (content.slice(j, j+5) === '<div ') d2++;
      else if (content.slice(j, j+4) === '<div') d2++;
      else if (content.slice(j, j+6) === '</div>') {
        d2--;
        if (d2 === 0) { j += 6; break; }
      }
      j++;
    }
    const mb = content.slice(0, mobileNavStart);
    const ma = content.slice(j);
    
    // Also strip the duplicate comment lines before mobile-nav
    const cleanedBefore = mb.replace(/(\s*<!-- Mobile nav overlay -->\s*\n){1,3}\s*$/, '\n\n');
    content = cleanedBefore + '<!-- Mobile nav overlay -->\n' + MOBILE_NAV + ma;
  }

  return content;
}

/* ================================================================
   HELPER: replace footer block in a file
   ================================================================ */
function replaceFooter(content) {
  const footerStart = content.indexOf('<footer id="footer"');
  if (footerStart === -1) return content;
  
  const footerEnd = content.indexOf('</footer>', footerStart);
  if (footerEnd === -1) return content;
  
  const before = content.slice(0, footerStart);
  const after  = content.slice(footerEnd + 9); // 9 = '</footer>'.length
  return before + FOOTER_HTML + after;
}

/* ================================================================
   PROCESS ALL HTML FILES — Nav + Footer
   ================================================================ */
let navFixed = 0, footerFixed = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  content = replaceNav(content);
  content = replaceFooter(content);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated: ${file}`);
    navFixed++;
  } else {
    console.log(`- Skipped: ${file} (no nav/footer found)`);
  }
});

/* ================================================================
   PHASE 2 — HOMEPAGE RESTRUCTURE (index.html only)
   ================================================================ */
console.log('\n--- Phase 2: Restructuring index.html homepage ---\n');

const idxPath = path.join(dir, 'index.html');
let idx = fs.readFileSync(idxPath, 'utf8');

/* 2a. Update hero headline + sub-copy + CTAs */
idx = idx.replace(
  /<h1>\s*\n\s*Host Smarter\. Build Better\. Grow <span class="gradient-text" id="typewriter">[\s\S]*?<\/h1>/,
  `<h1>
          We Build <span class="gradient-text" id="typewriter">Websites.</span><span class="typing-cursor"></span><br>
          Apps. Emails. Digital Futures.
        </h1>`
);

idx = idx.replace(
  /<p class="hero-sub">\s*\n\s*From blazing-fast web hosting[\s\S]*?<\/p>/,
  `<p class="hero-sub">
          From custom web &amp; app development and website redesigns to professional email solutions and lightning-fast hosting — BlacTec powers the digital presence of businesses across Africa.
        </p>`
);

idx = idx.replace(
  /<div class="hero-cta-row">\s*\n\s*<a href="#pricing" class="btn btn-primary btn-lg">Get Started — It's Fast<\/a>\s*\n\s*<a href="#services" class="btn btn-ghost btn-lg">View Our Services<\/a>/,
  `<div class="hero-cta-row">
          <a href="web-development.html" class="btn btn-primary btn-lg">Start Your Project</a>
          <a href="#services" class="btn btn-ghost btn-lg">View All Services</a>`
);

idx = idx.replace(
  /<div class="hero-trust">\s*\n\s*<span>✓ Free SSL Certificate<\/span>[\s\S]*?<\/div>/,
  `<div class="hero-trust">
          <span>✓ Web &amp; App Development</span>
          <span class="dot">·</span>
          <span>✓ Free SSL Certificate</span>
          <span class="dot">·</span>
          <span>✓ 99.9% Uptime</span>
          <span class="dot">·</span>
          <span>✓ MTN MoMo &amp; Airtel Accepted</span>
        </div>`
);

/* 2b. Update typewriter words to dev-first */
idx = idx.replace(
  /const words\s*=\s*\[[\s\S]*?\];/,
  `const words = ['Web Apps.', 'Online Stores.', 'Email Systems.', 'Websites.', 'Digital Futures.'];`
);

/* 2c. Reorder services grid — Web Dev first */
const newServicesGrid = `      <div class="services-grid">
        <!-- 1. Web & App Development -->
        <div class="service-card animate-on-scroll">
          <div class="service-icon-wrap">
            ${CODE_SVG}
          </div>
          <h3>Web &amp; App Development</h3>
          <p>Custom websites, web applications and digital platforms built from scratch. Fast, modern, and tailored to your business goals.</p>
          <a href="web-development.html" class="service-link">Learn More →</a>
        </div>
        <!-- 2. Website Redesign -->
        <div class="service-card animate-on-scroll" style="transition-delay:0.05s">
          <div class="service-icon-wrap">
            ${REDESIGN_SVG}
          </div>
          <h3>Website Redesign</h3>
          <p>Is your old website hurting your business? We rebuild and modernise existing sites to current standards — faster, mobile-first, and converting.</p>
          <a href="web-development.html" class="service-link">Learn More →</a>
        </div>
        <!-- 3. E-commerce -->
        <div class="service-card animate-on-scroll" style="transition-delay:0.1s">
          <div class="service-icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </div>
          <h3>E-commerce Development</h3>
          <p>Launch your online store with secure payment integration including MTN MoMo and Airtel Money.</p>
          <a href="ecommerce-development.html" class="service-link">Learn More →</a>
        </div>
        <!-- 4. Business Email -->
        <div class="service-card animate-on-scroll" style="transition-delay:0.15s">
          <div class="service-icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </div>
          <h3>Business Email</h3>
          <p>Professional email addresses @yourdomain.ug. Reliable, spam-free, and works on all devices. Powered by Google, Zoho, or Microsoft.</p>
          <a href="business-email.html" class="service-link">Learn More →</a>
        </div>
        <!-- 5. Google Workspace -->
        <div class="service-card animate-on-scroll" style="transition-delay:0.2s">
          <div class="service-icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>
          </div>
          <h3>Google Workspace</h3>
          <p>Transform teamwork with Gmail, Drive, Meet and the full Google apps suite for your business.</p>
          <a href="google-workspace.html" class="service-link">Learn More →</a>
        </div>
        <!-- 6. Web Hosting -->
        <div class="service-card animate-on-scroll" style="transition-delay:0.25s">
          <div class="service-icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y1="6"/><line x1="6" y1="18" x2="6.01" y1="18"/></svg>
          </div>
          <h3>Web Hosting</h3>
          <p>Fast, reliable Linux hosting with cPanel, SSD storage, and 99.9% uptime. Perfect for any website.</p>
          <a href="web-hosting.html" class="service-link">Learn More →</a>
        </div>
        <!-- 7. Domain Registration -->
        <div class="service-card animate-on-scroll" style="transition-delay:0.28s">
          <div class="service-icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </div>
          <h3>Domain Registration</h3>
          <p>Register .ug, .co.ug, .com and 500+ domain extensions. Includes free WHOIS privacy protection.</p>
          <a href="domain-search.html" class="service-link">Learn More →</a>
        </div>
        <!-- 8. SEO Services -->
        <div class="service-card animate-on-scroll" style="transition-delay:0.3s">
          <div class="service-icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <h3>SEO Services</h3>
          <p>Get found on Google. Our SEO experts optimise your site for local and international search results.</p>
          <a href="seo-services.html" class="service-link">Learn More →</a>
        </div>
        <!-- 9. Bulk SMS -->
        <div class="service-card animate-on-scroll" style="transition-delay:0.35s">
          <div class="service-icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h3>Bulk SMS Marketing</h3>
          <p>Reach your customers directly on their phones with targeted SMS campaigns across Africa.</p>
          <a href="bulk-sms.html" class="service-link">Learn More →</a>
        </div>
      </div>`;

// Replace services grid
idx = idx.replace(/<div class="services-grid">[\s\S]*?<\/div>\s*\n\s*<\/div>\s*\n\s*<\/section>\s*\n\s*<div class="section-divider">/, 
  newServicesGrid + `\n    </div>\n  </section>\n\n  <div class="section-divider">`);

/* 2d. Update section label for services — was "OUR SERVICES" */
idx = idx.replace(
  /<span class="section-label">OUR SERVICES<\/span>\s*\n\s*<h2 id="services-heading">Everything Your Business Needs Online<\/h2>\s*\n\s*<p>From your first domain to a fully modernised website[\s\S]*?<\/p>/,
  `<span class="section-label">OUR SERVICES</span>
        <h2 id="services-heading">Complete Digital Services for African Businesses</h2>
        <p>From custom web &amp; app development and website redesigns to email solutions, hosting and domains — BlacTec handles it all.</p>`
);

/* 2e. Update mid-CTA banner — was hosting-focused */
idx = idx.replace(
  /<h2>Ready to launch your online presence\?<\/h2>\s*\n\s*<p>Join 500\+ African businesses[\s\S]*?<\/p>/,
  `<h2>Ready to Start Your Project?</h2>
          <p>Join 500+ African businesses already powered by BlacTec. Whether you need a new website, app, email solution or hosting — we make it happen fast.</p>`
);
idx = idx.replace(
  /<a href="web-hosting\.html" class="btn btn-primary btn-lg">View Hosting Plans<\/a>/,
  `<a href="web-development.html" class="btn btn-primary btn-lg">Start Your Project</a>`
);

/* 2f. Update contact form service dropdown order */
idx = idx.replace(
  /<select id="cService">[\s\S]*?<\/select>/,
  `<select id="cService">
                <option value="">Select a service...</option>
                <option>Web &amp; App Development</option>
                <option>Website Redesign</option>
                <option>E-commerce Development</option>
                <option>Business Email</option>
                <option>Google Workspace</option>
                <option>Web Hosting</option>
                <option>Domain Registration</option>
                <option>SEO Services</option>
                <option>Bulk SMS</option>
                <option>Other</option>
              </select>`
);

/* 2g. Update section header for design spotlight */
idx = idx.replace(
  `<span class="section-label">WEB SERVICES</span>
        <h2 id="design-heading">Websites That Work as Hard as You Do</h2>`,
  `<span class="section-label">WEBSITE DEVELOPMENT &amp; REDESIGN</span>
        <h2 id="design-heading">Websites That Work as Hard as You Do</h2>`
);

/* 2h. Pricing section — update label */
idx = idx.replace(
  `<span class="section-label">WEB HOSTING</span>`,
  `<span class="section-label">HOSTING PLANS</span>`
);

fs.writeFileSync(idxPath, idx, 'utf8');
console.log(`✓ index.html homepage restructured`);

console.log(`\n========================================`);
console.log(`Phase 1: ${navFixed} files updated (nav + footer)`);
console.log(`Phase 2: index.html homepage restructured`);
console.log(`========================================`);
