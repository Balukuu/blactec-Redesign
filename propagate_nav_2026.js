const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// Master Header (Source: index.html with fixes)
const masterHeader = `
<header>
  <nav id="navbar" role="navigation" aria-label="Main navigation">
    <div class="container">
      <div class="nav-inner">
        <!-- Logo -->
        <a href="index.html" class="nav-logo" aria-label="BlacTec Home">blac<span class="logo-accent">tec</span>.</a>

        <!-- Desktop Nav -->
        <ul class="nav-links" role="list">
          <!-- Hosting -->
          <li class="nav-item">
            <div class="nav-link" tabindex="0" aria-haspopup="true" aria-expanded="false">
              Hosting
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg>
            </div>
            <div class="nav-dropdown" role="menu">
              <a href="web-hosting.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">🌐</span>
                <div class="nav-dropdown-text"><strong>Web Hosting</strong><span>Shared Linux hosting with cPanel</span></div>
              </a>
              <a href="wordpress-hosting.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-primary)"><path d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.05-.176 2.986-.503l-2.828-7.702zm-7.42-3.993c-.415.701-.652 1.516-.652 2.384 0 1.5.714 2.824 1.815 3.665l3.388-9.306c-1.896.65-3.41 1.84-4.55 3.257zm12.633-.633c.607.82.971 1.828.971 2.924 0 1.1-.36 2.1-.967 2.916l2.457 7.122c1.777-2.146 2.84-4.897 2.84-7.905 0-3.32-1.29-6.33-3.402-8.58l-1.899 3.523zM12.012 2C6.482 2 2.012 6.47 2.012 12c0 5.53 4.47 10 10 10s10-4.47 10-10c0-5.53-4.47-10-10-10zm.42 1.055c3.02.134 5.572 2.08 6.74 4.777l-.924 1.733c-.73-.836-1.76-1.365-2.914-1.365-.24 0-.472.023-.695.067L12.432 3.055z"/></svg></span>
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
                <span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 20 20"><rect x="1" y="1" width="8" height="8" fill="#f25022"/><rect x="11" y="1" width="8" height="8" fill="#7fba00"/><rect x="1" y="11" width="8" height="8" fill="#00a4ef"/><rect x="11" y="11" width="8" height="8" fill="#ffb900"/></svg></span>
                <div class="nav-dropdown-text"><strong>Reseller Hosting</strong><span>Start your own hosting business</span></div>
              </a>
            </div>
          </li>
          <!-- Web Services -->
          <li class="nav-item">
            <div class="nav-link" tabindex="0" aria-haspopup="true" aria-expanded="false">
              Web Services
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg>
            </div>
            <div class="nav-dropdown" role="menu">
              <a href="web-development.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg></span>
                <div class="nav-dropdown-text"><strong>Web Development</strong><span>Build new apps or redesign existing sites</span></div>
              </a>
              <a href="ecommerce-development.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">🛒</span>
                <div class="nav-dropdown-text"><strong>E-commerce Development</strong><span>Stores with MoMo &amp; Airtel integration</span></div>
              </a>
              <a href="wordpress-development.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">📝</span>
                <div class="nav-dropdown-text"><strong>WordPress Development</strong><span>CMS-powered websites &amp; blogs</span></div>
              </a>
              <a href="website-maintenance.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">🔧</span>
                <div class="nav-dropdown-text"><strong>Website Maintenance</strong><span>Updates, backups &amp; ongoing support</span></div>
              </a>
            </div>
          </li>
          <!-- Domains -->
          <li class="nav-item">
            <div class="nav-link" tabindex="0" aria-haspopup="true" aria-expanded="false">
              Domains
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg>
            </div>
            <div class="nav-dropdown" role="menu">
              <a href="domain-search.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span>
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
                <span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span>
                <div class="nav-dropdown-text"><strong>Free WHOIS Privacy</strong><span>Protect your registration info</span></div>
              </a>
            </div>
          </li>
          <!-- Solutions -->
          <li class="nav-item">
            <div class="nav-link" tabindex="0" aria-haspopup="true" aria-expanded="false">
              Solutions
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg>
            </div>
            <div class="nav-dropdown" role="menu">
              <a href="business-email.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></span>
                <div class="nav-dropdown-text"><strong>Business Email</strong><span>Professional @yourdomain.ug addresses</span></div>
              </a>
              <a href="google-workspace.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon"><img src="https://www.gstatic.com/images/branding/product/2x/google_workspace_24dp.png" width="18" height="18" alt="Google Workspace"></span>
                <div class="nav-dropdown-text"><strong>Google Workspace</strong><span>Gmail, Drive, Meet & more for teams</span></div>
              </a>
              <a href="zoho-mail.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="#e63946"/><path d="M22 6L12 13L2 6" stroke="#ffffff" stroke-width="2" fill="none"/></svg></span>
                <div class="nav-dropdown-text"><strong>Zoho Mail</strong><span>Ad-free, secure email & workplace</span></div>
              </a>
              <a href="microsoft-365.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 20 20"><rect x="1" y="1" width="8" height="8" fill="#f25022"/><rect x="11" y="1" width="8" height="8" fill="#7fba00"/><rect x="1" y="11" width="8" height="8" fill="#00a4ef"/><rect x="11" y="11" width="8" height="8" fill="#ffb900"/></svg></span>
                <div class="nav-dropdown-text"><strong>Microsoft 365</strong><span>Word, Excel, Teams & Outlook</span></div>
              </a>
              <a href="ssl-certificates.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">🔒</span>
                <div class="nav-dropdown-text"><strong>SSL Certificates</strong><span>Encrypt &amp; secure your website</span></div>
              </a>
              <a href="seo-services.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon">🔍</span>
                <div class="nav-dropdown-text"><strong>SEO Services</strong><span>Rank higher on Google Search</span></div>
              </a>
              <a href="bulk-sms.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></span>
                <div class="nav-dropdown-text"><strong>Bulk SMS</strong><span>Reach customers via SMS marketing</span></div>
              </a>
              <a href="website-security.html" class="nav-dropdown-item" role="menuitem">
                <span class="nav-dropdown-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>
                <div class="nav-dropdown-text"><strong>Website Security</strong><span>Firewalls, malware scanning &amp; protection</span></div>
              </a>
            </div>
          </li>
          <li><a href="#about" class="nav-link-plain">About</a></li>
        </ul>

        <!-- Nav Right -->
        <div class="nav-right">
          <a href="#pricing" class="btn btn-primary" style="display:none;" id="desktopGetStarted">Get Started</a>
          <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</header>`;

// Master Mobile Nav
const masterMobileNav = `
<!-- Mobile nav overlay -->
<div class="mobile-nav" id="mobileNav" aria-hidden="true">
  <div class="mobile-nav-item">
    <div class="mobile-nav-header" id="mnh-hosting" tabindex="0">Hosting
      <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg>
    </div>
    <div class="mobile-sub-links" id="msl-hosting">
      <a href="web-hosting.html" class="mobile-sub-link">🌐 Web Hosting</a>
      <a href="wordpress-hosting.html" class="mobile-sub-link">🎯 WordPress Hosting</a>
      <a href="vps-hosting.html" class="mobile-sub-link">⚡ VPS Hosting</a>
      <a href="cloud-hosting.html" class="mobile-sub-link">☁️ Cloud Hosting</a>
      <a href="reseller-hosting.html" class="mobile-sub-link">🏢 Reseller Hosting</a>
    </div>
  </div>
  <div class="mobile-nav-item">
    <div class="mobile-nav-header" id="mnh-web" tabindex="0">Web Services
      <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg>
    </div>
    <div class="mobile-sub-links" id="msl-web">
      <a href="web-development.html" class="mobile-sub-link">💻 Web Development</a>
      <a href="ecommerce-development.html" class="mobile-sub-link">🛒 E-commerce Development</a>
      <a href="wordpress-development.html" class="mobile-sub-link">📝 WordPress Development</a>
      <a href="website-maintenance.html" class="mobile-sub-link">🔧 Website Maintenance</a>
    </div>
  </div>
  <div class="mobile-nav-item">
    <div class="mobile-nav-header" id="mnh-domain" tabindex="0">Domains
      <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg>
    </div>
    <div class="mobile-sub-links" id="msl-domain">
      <a href="domain-search.html" class="mobile-sub-link">🔍 Domain Search</a>
      <a href="ug-domains.html" class="mobile-sub-link">🇺🇬 .UG Domains</a>
      <a href="domain-transfer.html" class="mobile-sub-link">🔁 Domain Transfer</a>
      <a href="whois-privacy.html" class="mobile-sub-link">🔒 Free WHOIS Privacy</a>
    </div>
  </div>
  <div class="mobile-nav-item">
    <div class="mobile-nav-header" id="mnh-solutions" tabindex="0">Solutions
      <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg>
    </div>
    <div class="mobile-sub-links" id="msl-solutions">
      <a href="business-email.html" class="mobile-sub-link"><svg width="16" height="16" style="vertical-align:text-bottom; margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Business Email</a>
      <a href="google-workspace.html" class="mobile-sub-link">🔷 Google Workspace</a>
      <a href="zoho-mail.html" class="mobile-sub-link">✉️ Zoho Mail</a>
      <a href="microsoft-365.html" class="mobile-sub-link">🏢 Microsoft 365</a>
      <a href="ssl-certificates.html" class="mobile-sub-link"><svg width="16" height="16" style="vertical-align:text-bottom; margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> SSL Certificates</a>
      <a href="seo-services.html" class="mobile-sub-link"><svg width="16" height="16" style="vertical-align:text-bottom; margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> SEO Services</a>
      <a href="bulk-sms.html" class="mobile-sub-link"><svg width="16" height="16" style="vertical-align:text-bottom; margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> Bulk SMS</a>
      <a href="website-security.html" class="mobile-sub-link"><svg width="16" height="16" style="vertical-align:text-bottom; margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> Website Security</a>
    </div>
  </div>
  <a href="#about" class="mobile-nav-plain">About</a>
  <div class="mobile-nav-buttons">
    <a href="#pricing" class="btn btn-primary">Get Started</a>
  </div>
</div>`;

// Master Footer (Source: index.html with 2026 branding)
const masterFooter = `
<footer id="footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <!-- Brand -->
      <div>
        <span class="footer-brand-logo">blac<span class="lac">tec</span>.</span>
        <p class="footer-brand-desc">Hosting the Future — Africa's most trusted web hosting, website design, and digital solutions provider. Based in Kampala, serving East Africa.</p>
        <div class="footer-socials">
          <a href="#" class="footer-social" aria-label="Twitter/X">𝕏</a>
          <a href="#" class="footer-social" aria-label="Facebook">f</a>
          <a href="#" class="footer-social" aria-label="LinkedIn">in</a>
          <a href="#" class="footer-social" aria-label="Instagram">◎</a>
        </div>
        <p style="font-size:12px;color:var(--color-text-muted);">© 2026 BlacTec. All rights reserved.</p>
      </div>

      <!-- Hosting -->
      <div class="footer-col">
        <h4>Hosting</h4>
        <ul>
          <li><a href="web-hosting.html">Shared Hosting</a></li>
          <li><a href="wordpress-hosting.html">WordPress Hosting</a></li>
          <li><a href="vps-hosting.html">VPS Hosting</a></li>
          <li><a href="cloud-hosting.html">Cloud Hosting</a></li>
          <li><a href="reseller-hosting.html">Reseller Hosting</a></li>
          <li><a href="domain-search.html">Domain Registration</a></li>
        </ul>
      </div>

      <!-- Web Services -->
      <div class="footer-col">
        <h4>Web Services</h4>
        <ul>
          <li><a href="web-development.html">Web Development</a></li>
          <li><a href="ecommerce-development.html">E-commerce Development</a></li>
          <li><a href="business-email.html">Business Email</a></li>
          <li><a href="google-workspace.html">Google Workspace</a></li>
          <li><a href="zoho-mail.html"><svg width="16" height="16" style="vertical-align:text-bottom; margin-right:6px;" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="#e63946"/><path d="M22 6L12 13L2 6" stroke="#ffffff" stroke-width="2" fill="none"/></svg> Zoho Mail</a></li>
          <li><a href="microsoft-365.html"><svg width="16" height="16" style="vertical-align:text-bottom; margin-right:6px;" viewBox="0 0 20 20"><rect x="1" y="1" width="8" height="8" fill="#f25022"/><rect x="11" y="1" width="8" height="8" fill="#7fba00"/><rect x="1" y="11" width="8" height="8" fill="#00a4ef"/><rect x="11" y="11" width="8" height="8" fill="#ffb900"/></svg> Microsoft 365</a></li>
          <li><a href="ssl-certificates.html">SSL Certificates</a></li>
          <li><a href="seo-services.html">SEO Services</a></li>
          <li><a href="bulk-sms.html">Bulk SMS</a></li>
          <li><a href="website-maintenance.html">Website Maintenance</a></li>
        </ul>
      </div>

      <!-- Company -->
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="#about">About BlacTec</a></li>
          <li><a href="#contact">Our Portfolio</a></li>
          <li><a href="https://wa.me/256750870755">Help Center</a></li>
          <li><a href="#contact">Privacy Policy</a></li>
          <li><a href="#contact">Terms of Service</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </div>
    </div>

    <!-- Footer bottom -->
    <div class="footer-bottom">
      <span class="footer-copy">© 2026 BlacTec Technologies Ltd. Kampala, Uganda.</span>
      <div class="footer-bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Sitemap</a>
      </div>
      <div class="payment-badges" style="display: flex; gap: 8px; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" height="24" width="60" style="border-radius:4px; box-shadow:0 1px 3px rgba(0,0,0,0.2);">
          <rect width="100" height="40" rx="4" fill="#ffcc00"/>
          <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="18" fill="#000" letter-spacing="-0.5">MTN</text>
          <text x="50%" y="85%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="11" fill="#000">MoMo</text>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" height="24" width="60" style="border-radius:4px; box-shadow:0 1px 3px rgba(0,0,0,0.2);">
          <rect width="100" height="40" rx="4" fill="#ff0000"/>
          <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="15" fill="#fff" letter-spacing="0.5">airtel</text>
          <text x="50%" y="80%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="600" font-size="10" fill="#fff">money</text>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" height="24" width="60" style="background:#fff; border-radius:4px; box-shadow:0 1px 3px rgba(0,0,0,0.2);">
          <path fill="#1a1f71" d="M38 12l-4 16h5.5l4-16z M65.5 12c-2.3-1-5-1.5-8-1.5-8.5 0-14.5 4.5-14.5 11 0 5 4.5 7.5 8 9 3.5 1.5 4.5 2.5 4.5 4 0 2-2.5 3-5 3-4.5 0-7-1.5-8.5-2.5l-1.5 6.5c2 1 6 2 10.5 2 9 0 15-4.5 15-11.5 0-4-3-6.5-7.5-8.5-3-1.5-5-2.5-5-4 0-1.5 1.5-2.5 4.5-2.5 3 0 5.5 1 7.5 2l1-6.5z M85 12l-6.5 16h-5.5l-3-11.5-1-4.5h8.5l2 9.5 3.5-9.5h5.5z M26.5 12h-6.5c-1.5 0-2.5 1-3 2.5l-11.5 13.5h6L14 22.5h7L22 28h6l-1.5-16zm-7.5 7l2-5.5.5-1.5 1.5 7h-4z"/>
          <path fill="#f79e1b" d="M14 22.5h7L20 28h-6z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" height="24" width="60" style="border-radius:4px; box-shadow:0 1px 3px rgba(0,0,0,0.2);">
          <rect width="100" height="40" rx="4" fill="#141823"/>
          <circle cx="42" cy="20" r="11" fill="#eb001b"/>
          <circle cx="58" cy="20" r="11" fill="#f79e1b" fill-opacity="0.9"/>
        </svg>
      </div>
    </div>
  </div>
</footer>`;

let updatedTotal = 0;

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  const isHome = file === 'index.html';
  
  // Customise Master Header for subpages (anchors must point to index.html)
  let headerInstance = masterHeader;
  let mobileInstance = masterMobileNav;
  let footerInstance = masterFooter;

  if (!isHome) {
    // Force header to be solid/scrolled on subpages as requested
    headerInstance = headerInstance.replace('id="navbar"', 'id="navbar" class="scrolled"');
    
    // Update anchors to full paths
    headerInstance = headerInstance.replace(/href="#about"/g, 'href="index.html#about"');
    headerInstance = headerInstance.replace(/href="#pricing"/g, 'href="index.html#pricing"');
    headerInstance = headerInstance.replace(/href="#contact"/g, 'href="index.html#contact"');
    headerInstance = headerInstance.replace(/href="#services"/g, 'href="index.html#services"');
    headerInstance = headerInstance.replace(/href="#domains"/g, 'href="index.html#domains"');

    mobileInstance = mobileInstance.replace(/href="#about"/g, 'href="index.html#about"');
    mobileInstance = mobileInstance.replace(/href="#pricing"/g, 'href="index.html#pricing"');
    
    footerInstance = footerInstance.replace(/href="#about"/g, 'href="index.html#about"');
    footerInstance = footerInstance.replace(/href="#contact"/g, 'href="index.html#contact"');
  } else {
    // For home page, ensure logo stays at scroll top
    headerInstance = headerInstance.replace('href="index.html" class="nav-logo"', 'href="#" class="nav-logo"');
  }

  // Robust Replacement using regex that captures the entire header/mobile-nav/footer blocks
  const headerRegex = /<header>[\s\S]*?<\/header>/;
  const mobileNavRegex = /<!-- Mobile nav overlay -->[\s\S]*?<div class="mobile-nav"[\s\S]*?<\/div>/;
  const footerRegex = /<footer id="footer"[\s\S]*?<\/footer>/;

  let newContent = content;
  newContent = newContent.replace(headerRegex, headerInstance);
  
  // Find the mobile nav start and end indices manually for safety if regex fails
  const startIdx = newContent.indexOf('<div class="mobile-nav"');
  if (startIdx !== -1) {
     const nextSection = newContent.indexOf('<main');
     if (nextSection !== -1) {
         newContent = newContent.substring(0, startIdx).trimEnd() + "\n\n" + mobileInstance + "\n\n" + newContent.substring(nextSection);
     }
  }

  newContent = newContent.replace(footerRegex, footerInstance);

  if (newContent !== content) {
    fs.writeFileSync(path.join(dir, file), newContent, 'utf8');
    updatedTotal++;
  }
});

console.log(`Success: Standardized Navigation and Footer across ${updatedTotal} files.`);
