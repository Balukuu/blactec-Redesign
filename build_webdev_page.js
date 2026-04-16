const fs = require('fs');

let html = fs.readFileSync('web-development.html', 'utf8');

// Replace the <title> and meta description
html = html.replace(/<title>.*?<\/title>/, '<title>Professional Web Design & Redesign - BlacTec Africa</title>');
html = html.replace(/<meta name="description" content=".*?">/, '<meta name="description" content="Expert web development services by BlacTec. Whether you need a brand new web application or a complete legacy redesign, we build high-converting platforms.">');

const newMainContent = `
<main id="main-content">

  <!-- HERO SECTION -->
  <section id="hosting-hero">
    <div class="hero-bg-accent"></div>
    <div class="container hero-content-wrap">
      <div class="animate-on-scroll">
        <h1 class="hero-title">End-to-End <span class="gradient-text">Web Development</span></h1>
        <p class="hero-desc">From complex, custom-built applications from scratch to complete overhauls of outdated legacy websites. We engineer digital solutions that drive real results.</p>
        <div class="hero-cta-group">
          <a href="#pricing" class="btn btn-primary btn-lg">View Development Packages</a>
          <a href="#solutions" class="btn btn-ghost btn-lg">Explore Our Solutions</a>
        </div>
        
        <div class="hero-trust-badges animate-on-scroll" style="transition-delay: 0.4s;">
          <div class="hero-trust-badge"><i>✓</i> 🎨 Custom UI/UX</div>
          <div class="hero-trust-badge"><i>✓</i> ⚡ Lightning Fast NVMe</div>
          <div class="hero-trust-badge"><i>✓</i> 📱 Mobile First</div>
        </div>
      </div>
    </div>
  </section>

  <!-- SOLUTIONS SPLIT SECTION -->
  <section id="solutions" class="section section-alt">
    <div class="container">
      <div class="pricing-header animate-on-scroll" style="text-align: center; margin-bottom: 60px;">
        <h2 style="font-size: 36px; margin-bottom: 16px;">Two Paths to a <span class="gradient-text">Stunning Website</span></h2>
        <p style="color: var(--color-text-secondary); max-width: 600px; margin: 0 auto;">Whether you are starting from zero or looking to revive a struggling platform, our engineering team has you covered.</p>
      </div>

      <div class="tech-grid">
        <!-- New Builds -->
        <div class="tech-card animate-on-scroll" style="flex-direction: column; gap: 16px; padding: 48px; border-color: var(--color-border); background: var(--color-bg-card);">
          <div class="tech-icon" style="background: rgba(124, 92, 252, 0.1); color: var(--color-primary); margin-bottom: 8px;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          </div>
          <h3 style="font-size: 24px;">Building New Websites</h3>
          <p style="font-size: 15px; color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 24px;">Starting a new business or bringing a brand online for the first time? We design and code mobile-responsive, highly optimized platforms tailored perfectly to your unique operations.</p>
          <ul style="color: var(--color-text-muted); font-size: 14px; display: flex; flex-direction: column; gap: 12px;">
            <li style="display:flex; gap:8px;"><span style="color:var(--color-primary);">✓</span> Zero-to-one custom layout design</li>
            <li style="display:flex; gap:8px;"><span style="color:var(--color-primary);">✓</span> Backend CMS configuration</li>
            <li style="display:flex; gap:8px;"><span style="color:var(--color-primary);">✓</span> Base SEO installation</li>
            <li style="display:flex; gap:8px;"><span style="color:var(--color-primary);">✓</span> Secure database architecture</li>
          </ul>
        </div>

        <!-- Redesigns -->
        <div class="tech-card animate-on-scroll" style="flex-direction: column; gap: 16px; padding: 48px; border-color: var(--color-primary); box-shadow: 0 10px 40px var(--color-primary-glow); background: var(--color-bg-card);" style="transition-delay: 0.2s;">
          <div class="tech-icon" style="background: rgba(0, 229, 255, 0.1); color: var(--color-accent); margin-bottom: 8px;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.13 15.57a9 9 0 1 0 3.84-10.36L2 8"></path></svg>
          </div>
          <h3 style="font-size: 24px;">Redesigning Legacy Sites</h3>
          <p style="font-size: 15px; color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 24px;">Is your old site driving customers away? Stop losing money to slow, unresponsive layouts. We comprehensively modernize, migrate, and optimize your existing content.</p>
          <ul style="color: var(--color-text-muted); font-size: 14px; display: flex; flex-direction: column; gap: 12px;">
            <li style="display:flex; gap:8px;"><span style="color:var(--color-accent);">✓</span> Non-destructive content migration</li>
            <li style="display:flex; gap:8px;"><span style="color:var(--color-accent);">✓</span> UX/UI structural modernization</li>
            <li style="display:flex; gap:8px;"><span style="color:var(--color-accent);">✓</span> Performance & speed overhaul</li>
            <li style="display:flex; gap:8px;"><span style="color:var(--color-accent);">✓</span> Mobile-first responsive patching</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- PRICING SECTION -->
  <section id="pricing" class="section">
    <div class="container">
      <div class="pricing-header animate-on-scroll" style="text-align: center;">
        <h2 style="font-size: 36px; margin-bottom: 16px;">Transparent <span class="gradient-text">Project Pricing</span></h2>
      </div>
      <div class="pricing-grid" style="grid-template-columns: repeat(2, 1fr); max-width: 800px; margin: 0 auto;">
        
        <!-- Redesign Plan -->
        <div class="plan-card animate-on-scroll" style="transition-delay: 0s;">
          <h3 class="plan-name">Legacy Redesign</h3>
          <p class="plan-desc">Revamp your existing web presence</p>
          <div class="plan-price-wrap">
            <span class="plan-currency">$</span><span class="plan-price">500</span><span class="plan-period">one-off</span>
          </div>
          <a href="https://wa.me/256750870755?text=Hi%2C%20I%20am%20interested%20in%20a%20Legacy%20Website%20Redesign%20for%20%24500." target="_blank" rel="noopener" class="btn btn-ghost" style="width: 100%;">Order Redesign</a>
          <div class="plan-features">
            <div class="plan-feature-item"><i>✓</i> Complete Mobile Optimization</div>
            <div class="plan-feature-item"><i>✓</i> Content Migration</div>
            <div class="plan-feature-item"><i>✓</i> SEO Preservation Hooks</div>
            <div class="plan-feature-item"><i>✓</i> Speed Architecture Overhaul</div>
            <div class="plan-feature-item"><i>✓</i> Modern Security Implementation</div>
          </div>
        </div>

        <!-- New Site Plan -->
        <div class="plan-card popular animate-on-scroll" style="transition-delay: 0.1s;">
          <div class="popular-ribbon">Premium</div>
          <h3 class="plan-name">New Website Build</h3>
          <p class="plan-desc">Engineered securely from scratch</p>
          <div class="plan-price-wrap">
            <span class="plan-currency">$</span><span class="plan-price">800</span><span class="plan-period">one-off</span>
          </div>
          <a href="https://wa.me/256750870755?text=Hi%2C%20I%20am%20interested%20in%20a%20New%20Website%20Build%20for%20%24800." target="_blank" rel="noopener" class="btn btn-primary" style="width: 100%;">Start Fresh Build</a>
          <div class="plan-features">
            <div class="plan-feature-item"><i>✓</i> Tailored UI/UX Wireframing</div>
            <div class="plan-feature-item"><i>✓</i> Custom Feature Integration</div>
            <div class="plan-feature-item"><i>✓</i> Business Logic Configuration</div>
            <div class="plan-feature-item"><i>✓</i> E-commerce Ready (MoMo/Airtel)</div>
            <div class="plan-feature-item"><i>✓</i> Up to 10 Crafted Core Pages</div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- FAQ SECTION -->
  <section class="section section-alt">
    <div class="container">
      <div class="pricing-header animate-on-scroll" style="text-align: center;">
        <h2 style="font-size: 32px;">Frequently Asked <span class="gradient-text">Questions</span></h2>
      </div>
      <div class="faq-grid animate-on-scroll">
        
        <div class="faq-item">
          <div class="faq-question">How exactly does a redesign work? Do I lose my data? <span class="faq-icon-arrow">▼</span></div>
          <div class="faq-answer">Absolutely not! A redesign is heavily front-end focused. We rebuild the theme, aesthetics, and structural HTML templates of your application without damaging your core database, keeping your posts, images, and users strictly intact.</div>
        </div>
        
        <div class="faq-item">
          <div class="faq-question">How long does a $800 custom build take? <span class="faq-icon-arrow">▼</span></div>
          <div class="faq-answer">Depending on your internal feature requirements and the speed at which you can provide branding assets (logos, raw copy), a premium new site generally takes 2 to 4 weeks from deposit to deployment.</div>
        </div>
        
        <div class="faq-item">
          <div class="faq-question">Does the $500 redesign include new hosting? <span class="faq-icon-arrow">▼</span></div>
          <div class="faq-answer">No, the redesign packages are primarily for overhauling the source code and design templates of your site. However, we highly recommend migrating to BlacTec's high-performance VPS or WordPress hosting to truly maximize the speed benefits of your new code.</div>
        </div>
        
      </div>
    </div>
  </section>

</main>
`;

const mStart = html.indexOf('<main id="main-content">');
const mEnd = html.lastIndexOf('</main>') + 7;

html = html.substring(0, mStart) + newMainContent + html.substring(mEnd);

fs.writeFileSync('web-development.html', html);
console.log("Successfully rebuilt web-development.html layout!");
