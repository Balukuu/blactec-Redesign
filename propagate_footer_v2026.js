const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// Master Footer Block
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
          <li><a href="index.html#about">About BlacTec</a></li>
          <li><a href="index.html#contact">Our Portfolio</a></li>
          <li><a href="https://wa.me/256750870755">Help Center</a></li>
          <li><a href="index.html#contact">Privacy Policy</a></li>
          <li><a href="index.html#contact">Terms of Service</a></li>
          <li><a href="index.html#contact">Contact Us</a></li>
        </ul>
      </div>
    </div>

    <!-- Footer bottom -->
    <div class="footer-bottom">
      <span class="footer-copy">© 2026 BlacTec Technologies Ltd. Kampala, Uganda.</span>
      <div class="footer-bottom-links">
        <a href="index.html#contact">Privacy Policy</a>
        <a href="index.html#contact">Terms of Service</a>
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
</footer>

<!-- Scroll to Top -->
<button id="scrollTop" aria-label="Scroll to top" title="Back to top">↑</button>

<!-- WhatsApp FAB -->
<a id="whatsappFab"
   href="https://wa.me/256750870755?text=Hi%20BlacTec%2C%20I%27m%20interested%20in%20your%20services"
   target="_blank"
   rel="noopener noreferrer"
   aria-label="Chat on WhatsApp"
   title="Chat with us on WhatsApp"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.127.554 4.195 1.604 6.015L.135 23.39l5.485-1.439a11.986 11.986 0 0 0 6.411 1.84h.005c6.645 0 12.03-5.385 12.03-12.03 0-3.218-1.254-6.248-3.533-8.528A12.001 12.001 0 0 0 12.031 0zm0 21.785h-.003a9.986 9.986 0 0 1-5.088-1.385l-.364-.216-3.784.992.997-3.69-.236-.375A9.957 9.957 0 0 1 2.016 12.03c0-5.525 4.496-10.021 10.017-10.021 2.678 0 5.195 1.042 7.087 2.936a10.018 10.018 0 0 1 2.932 7.085c-.001 5.523-4.498 10.02-10.02 10.02zm5.495-7.51c-.302-.15-1.787-.882-2.062-.982-.275-.1-.475-.15-.675.15-.201.3-.775.981-.95 1.182-.176.2-.351.225-.652.075-2.01-1.008-3.356-2.046-4.321-3.673-.102-.175.049-.247.199-.396.126-.126.275-.326.401-.501.126-.175.176-.3.251-.5.075-.2.038-.376-.038-.526-.075-.15-.675-1.626-.925-2.226-.244-.585-.492-.505-.675-.514-.175-.01-.375-.01-.575-.01s-.526.075-.801.375c-.275.3-1.051 1.026-1.051 2.502s1.076 2.898 1.226 3.098c.15.2 2.115 3.226 5.12 4.526 2.052.887 2.87.973 3.993.826 1.003-.131 3.078-1.258 3.504-2.472.426-1.215.426-2.257.301-2.472-.125-.215-.475-.34-.776-.49z"/></svg></a>
`;

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Find everything between the start of footer and the end of WhatsApp FAB or ScrollTop
  // Using a simpler approach: replace the footer and the trailing buttons
  const footerRegex = /<footer[\s\S]*?<\/footer>/;
  const scrollTopRegex = /<button id="scrollTop"[\s\S]*?<\/button>/;
  const whatsappRegex = /<a id="whatsappFab"[\s\S]*?<\/a>/;

  let newContent = content;
  newContent = newContent.replace(footerRegex, 'MASTER_FOOTER_PLACEHOLDER');
  newContent = newContent.replace(scrollTopRegex, '');
  newContent = newContent.replace(whatsappRegex, '');
  
  // Replace the placeholder with the new combined block
  newContent = newContent.replace('MASTER_FOOTER_PLACEHOLDER', masterFooter);

  if (newContent !== content) {
    fs.writeFileSync(path.join(dir, file), newContent, 'utf8');
  }
});

console.log(`Propagated footer and FABs to all pages.`);
