const fs = require('fs');
const path = require('path');

const webHostingPath = path.join(__dirname, 'web-hosting.html');
let content;
try {
  content = fs.readFileSync(webHostingPath, 'utf8');
} catch(e) {
  console.log("Could not find web-hosting.html in " + __dirname);
  process.exit(1);
}

const headerEndIndex = content.indexOf('<main>');
const mainEndIndex = content.indexOf('</main>');

const headerTemplate = content.substring(0, headerEndIndex + 6);
const footerTemplate = content.substring(mainEndIndex);

// Generic HTML block generators
function genHero(title1, titleGradient, desc, price, featureTags) {
  return `
    <section id="hosting-hero">
      <div class="container">
        <div class="hero-split">
          <div class="hero-left animate-on-scroll">
            <h1 class="hero-title">${title1}<br><span class="gradient-text">${titleGradient}</span></h1>
            <p class="hero-desc">${desc}</p>
            <div class="hero-cta-group">
              <a href="#pricing" class="btn btn-primary btn-lg">View Plans</a>
              <div class="hero-trust-badge"><i class="check">✓</i> Trusted by African Businesses</div>
            </div>
            <div class="hero-trust-badges">
              ${featureTags.map(f => `<div class="hero-trust-badge">${f}</div>`).join('')}
            </div>
          </div>
          <div class="hero-right animate-on-scroll" style="transition-delay: 0.2s;">
            <div class="hero-timer">
              <div class="timer-title">Starting from:</div>
              <div style="font-size: 32px; font-weight: 900; color: #fff; font-family: 'Unbounded', sans-serif;">
                <span style="font-size: 20px; font-weight: 500;">$</span>${price}
              </div>
              <div style="margin-top: 10px; font-size: 14px; color: var(--color-text-secondary);">
                Secure via MTN MoMo / Airtel Money
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function genPricing(plans) {
  return `
    <section id="pricing" class="section">
      <div class="container">
        <div class="pricing-header animate-on-scroll">
          <h2 style="font-size: 36px; margin-bottom: 16px;">Pick Your <span class="gradient-text">Perfect Plan</span></h2>
        </div>
        <div class="pricing-grid">
          ${plans.map((p, i) => `
          <div class="plan-card ${p.popular ? 'popular' : ''} animate-on-scroll" style="transition-delay: ${0.1 * i}s;">
            ${p.popular ? '<div class="popular-ribbon">Most Popular</div>' : ''}
            <h3 class="plan-name">${p.name}</h3>
            <p class="plan-desc">${p.desc}</p>
            <div class="plan-price-wrap">
              <span class="plan-currency">$</span><span class="plan-price">${p.price}</span><span class="plan-period">${p.period || '/mo'}</span>
            </div>
            <a href="#" class="btn ${p.popular ? 'btn-primary' : 'btn-ghost'}" style="width: 100%;">Get Started</a>
            <div class="plan-features">
              ${p.features.map(f => `<div class="plan-feature-item"><i>✓</i> ${f}</div>`).join('')}
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>
  `;
}

function genFaq(faqs) {
  return `
    <section class="section">
      <div class="container">
        <div class="pricing-header animate-on-scroll">
          <h2 style="font-size: 32px;">Frequently Asked <span class="gradient-text">Questions</span></h2>
        </div>
        <div class="faq-grid animate-on-scroll">
          ${faqs.map(f => `
          <div class="faq-item">
            <div class="faq-question">${f.q} <span class="faq-icon-arrow">▼</span></div>
            <div class="faq-answer">${f.a}</div>
          </div>`).join('')}
        </div>
      </div>
    </section>
  `;
}

// Custom specialized blocks
function genWhoisSearch() {
  return `
    <section class="section" style="padding-top:160px; min-height:80vh;">
      <div class="container">
        <div class="pricing-header animate-on-scroll">
          <h1 style="font-size: 42px; margin-bottom: 16px;">Global <span class="gradient-text">WHOIS Lookup</span></h1>
          <p style="color: var(--color-text-secondary); max-width:600px; margin:0 auto;">Search the official WHOIS database to find registration details, ownership, and expiry dates for any domain.</p>
        </div>
        
        <div class="hosting-domain-search animate-on-scroll" style="max-width:800px; margin: 40px auto; padding: 40px;">
          <div class="domain-search-wrap" style="max-width: 100%;">
            <input type="text" class="domain-input" id="whoisInput" placeholder="e.g. blactec.ug or example.com">
            <button class="btn btn-primary" id="whoisBtn">Lookup</button>
          </div>
          
          <div class="domain-search-loading" id="whoisLoading">
            <span class="spinner"></span> Querying registry databases...
          </div>
          
          <div class="domain-results" id="whoisResults" style="padding: 24px; text-align: left; font-family: monospace; white-space: pre-wrap; font-size: 13px; color: var(--color-text-secondary); max-height: 500px; overflow-y: auto;">
            <!-- Results appear here -->
          </div>
        </div>
      </div>
    </section>
    
    <script>
      // WHOIS fetch logic
      var wBtn = document.getElementById('whoisBtn');
      var wInp = document.getElementById('whoisInput');
      var wRes = document.getElementById('whoisResults');
      var wLdr = document.getElementById('whoisLoading');
      
      function runWhois() {
        var raw = wInp.value.trim().toLowerCase();
        if(!raw) return;
        
        wRes.classList.remove('show');
        wRes.innerHTML = '';
        wLdr.classList.add('active');
        
        // Use RDAP API for gTLDs. For .ug, point to whois.co.ug manually.
        if (raw.endsWith('.ug')) {
            wLdr.classList.remove('active');
            wRes.innerHTML = 'For .UG domains, please check the official registry: <a href="https://whois.co.ug/?search='+encodeURIComponent(raw)+'" target="_blank" style="color:var(--color-primary)">whois.co.ug</a>';
            wRes.classList.add('show');
            return;
        }

        fetch('https://rdap.verisign.com/com/v1/domain/' + raw)
          .then(function(res) {
            if(!res.ok) throw new Error('Domain not found or no public RDAP available');
            return res.json();
          })
          .then(function(data) {
             wLdr.classList.remove('active');
             var events = data.events || [];
             var reg = events.find(e => e.eventAction === 'registration') || {};
             var exp = events.find(e => e.eventAction === 'expiration') || {};
             var text = "Domain: " + (data.ldhName || raw) + "\\n";
             text += "Status: " + (data.status ? data.status.join(', ') : 'Active') + "\\n";
             if(reg.eventDate) text += "Registered: " + new Date(reg.eventDate).toLocaleDateString() + "\\n";
             if(exp.eventDate) text += "Expires: " + new Date(exp.eventDate).toLocaleDateString() + "\\n";
             if(data.nameservers) {
               text += "Nameservers:\\n" + data.nameservers.map(ns => " - " + ns.ldhName).join("\\n") + "\\n";
             }
             text += "\\nFull JSON registry data retrieved successfully via RDAP.";
             wRes.innerHTML = text;
             wRes.classList.add('show');
          })
          .catch(function(err) {
             wLdr.classList.remove('active');
             wRes.innerHTML = "<span style='color:#f87171'>" + err.message + "</span><br><br>The domain is highly likely available for registration!";
             wRes.classList.add('show');
          });
      }
      wBtn.addEventListener('click', runWhois);
      wInp.addEventListener('keydown', function(e) { if(e.key==='Enter') runWhois(); });
    </script>
  `;
}

// Def
const pageConfigs = [
  // HOSTING ----------------------
  {
    path: 'wordpress-hosting.html', title: 'WordPress Hosting - BlacTec',
    html: genHero('Managed WordPress', 'Optimised for Speed', 'The world’s most popular CMS, supercharged with LiteSpeed, LSCache, and automatic updates. Ideal for bloggers and businesses.', '3.99', ['⚡ LiteSpeed Cache', '🛡️ Web App Firewall', '🔄 Auto Backups']) +
          genPricing([
            {name: 'WP Starter', desc: 'For small blogs', price: '3.99', features: ['1 WordPress Site', '50GB NVMe', 'Free SSL', 'Free Email']},
            {name: 'WP Business', popupar: true, desc: 'For WooCommerce', price: '6.99', popular: true, features: ['100 WordPress Sites', '200GB NVMe', 'Free Domain', 'Daily Backups', 'Object Cache']},
            {name: 'WP Pro', desc: 'Agencies & scaling', price: '12.99', features: ['300 WordPress Sites', '300GB NVMe', 'Free Domain', 'Dedicated IP']}
          ]) +
          genFaq([{q:'Is WordPress pre-installed?', a:'Yes, WordPress is automatically installed along with performance plugins.'}])
  },
  {
    path: 'vps-hosting.html', title: 'VPS Hosting - BlacTec',
    html: genHero('Virtual Private Servers', 'Unmanaged Power', 'Full root access, guaranteed resources, and ultimate flexibility. Built for developers and high-resource applications.', '5.99', ['🧠 Full Root Access', '⚡ NVMe Storage', '🌐 100Mb/s Network']) +
          genPricing([
            {name: 'KVM 1', desc: 'Entry VPS', price: '5.99', features: ['1 vCPU Core', '1 GB RAM', '20 GB NVMe', '1 TB Bandwidth']},
            {name: 'KVM 2', popular: true, desc: 'Most popular', price: '7.99', features: ['2 vCPU Cores', '4 GB RAM', '50 GB NVMe', '4 TB Bandwidth']},
            {name: 'KVM 4', desc: 'Heavy workloads', price: '15.99', features: ['4 vCPU Cores', '8 GB RAM', '100 GB NVMe', '8 TB Bandwidth']}
          ]) + genFaq([{q:'Is this managed or unmanaged?', a:'Our standard VPS is unmanaged, giving you full root access to install any OS or control panel you prefer.'}])
  },
  {
    path: 'cloud-hosting.html', title: 'Cloud Hosting - BlacTec',
    html: genHero('Scale Fast with', 'Cloud Infrastructure', 'Experience the power of a VPS combined with the simplicity of shared hosting. Fully managed cloud architecture.', '9.99', ['☁️ Fully Managed', '🔥 Dedicated Resources', '🚀 CDN Included']) +
          genPricing([
            {name: 'Cloud Startup', desc: 'Start scaling', price: '9.99', features: ['300 Websites', '200GB NVMe', '3GB RAM', '2 CPU Cores']},
            {name: 'Cloud Professional', popular: true, desc: 'Large traffic', price: '14.99', features: ['300 Websites', '250GB NVMe', '6GB RAM', '4 CPU Cores']},
            {name: 'Cloud Enterprise', desc: 'Maximum performance', price: '29.99', features: ['300 Websites', '300GB NVMe', '12GB RAM', '6 CPU Cores']}
          ]) + genFaq([{q:'Do I need technical knowledge?', a:'No, cloud hosting is fully managed and comes with cPanel just like our shared hosting.'}])
  },
  {
    path: 'reseller-hosting.html', title: 'Reseller Hosting - BlacTec',
    html: genHero('Start Your Own', 'Hosting Business', 'White-label hosting solutions with WHM/cPanel. Set your own prices, create packages, and manage your clients effortlessly.', '19.99', ['👔 Unbranded White-label', '🛡️ WHM Included', '🔄 Free Migrations']) +
          genPricing([
            {name: 'Reseller Basic', desc: 'Start small', price: '19.99', features: ['50 cPanel Accounts', '50GB NVMe', 'Unlimited Bandwidth', 'Free SSLs']},
            {name: 'Reseller Pro', popular: true, desc: 'Grow your business', price: '34.99', features: ['100 cPanel Accounts', '100GB NVMe', 'Custom Nameservers', 'Free WHMCS License']},
          ]) + genFaq([{q:'Is my hosting white-labeled?', a:'Yes, your clients will never see the BlacTec logo. You can use private nameservers (ns1.yourdomain.com).'}])
  },

  // DOMAINS ----------------------
  {
    path: 'domain-search.html', title: 'Domain Search - BlacTec',
    html: genHero('Find Your Perfect', 'Domain Name', 'Search and register from over 500 extensions including .ug, .com, and .africa. Build your brand today.', '9.99', ['🌍 500+ Extensions', '🔒 Free Privacy', '⚡ Instant Setup']) + 
          genFaq([{q:'Can I register a .ug domain here?', a:'Yes, BlacTec handles official .UG and .CO.UG domains directly.'}])
  },
  {
    path: 'ug-domains.html', title: '.UG Domains - BlacTec',
    html: genHero('Official .UG', 'Registrar', 'Secure your Ugandan identity online. .ug and .co.ug are the perfect extensions for businesses operating in Uganda.', '18.99', ['🇺🇬 Official Registry', '⚡ Instant Activation', '🛡️ Local Support']) +
          genFaq([{q:'Who can buy a .ug domain?', a:'Anyone! There are no restrictions on registering standard .ug or .co.ug domains.'}])
  },
  {
    path: 'domain-transfer.html', title: 'Domain Transfer - BlacTec',
    html: genHero('Transfer Your', 'Domain to Us', 'Consolidate all your digital assets under one roof. Save money on renewals and enjoy superior Africa-based support.', '8.99', ['🔄 Easy Transfer', '🔒 Free Status Lock', '⏱️ Zero Downtime']) +
          genPricing([
            {name: '.COM Transfer', desc: '1 year extension', price: '12.99', features: ['Free WHOIS Privacy', 'DNS Management']},
            {name: '.UG / .CO.UG Transfer', popular: true, desc: '1 year extension', price: '20.99', features: ['Instant Propagation', 'Full Control']},
          ]) + genFaq([{q:'Will my website go offline during transfer?', a:'No, domain transfers do not cause downtime as long as your DNS settings remain intact.'}])
  },
  {
    path: 'whois-privacy.html', title: 'WHOIS Privacy - BlacTec',
    html: genHero('Protect Your', 'Identity Online', 'Hide your personal contact information from public WHOIS databases to prevent spam, identity theft, and cold calls.', '0.00', ['🛡️ Free on gTLDs', '🕵️ Stops Spam', '🔒 Protects Data']) +
          genFaq([{q:'Is WHOIS Privacy free?', a:'Yes, it is entirely free for eligible extensions like .com, .net, and .org. However, some registries like .ug hide details by default.'}])
  },
  {
    path: 'whois.html', title: 'WHOIS Lookup - BlacTec',
    html: genWhoisSearch()
  },

  // SERVICES ----------------------
  {
    path: 'website-design.html', title: 'Website Design - BlacTec',
    html: genHero('Custom Mobile-Ready', 'Website Design', 'Beautiful, fast, and conversion-optimised websites built to elevate your brand. Tailored for African businesses.', '199', ['🎨 Custom UI/UX', '📱 Mobile Responsive', '🔍 SEO Friendly']) +
          genPricing([
            {name: 'Landing Page', desc: '1 Page', price: '149', period: 'one-off', features: ['Custom Design', 'Contact Form', 'Mobile Friendly']},
            {name: 'Corporate Site', popular: true, desc: 'Up to 5 Pages', period: 'one-off', price: '299', features: ['Custom Design', 'Blog Setup', 'Social Integration']},
            {name: 'Advanced', desc: 'Complex Logic', price: '599+', period: 'custom', features: ['Custom Portals', 'Advanced Functions', 'API Booking']}
          ]) + genFaq([{q:'How long does a website take?', a:'Typically, a corporate website takes 1-2 weeks depending on the promptness of content delivery.'}])
  },
  {
    path: 'website-modernisation.html', title: 'Website Modernisation - BlacTec',
    html: genHero('Revamp & Rebuild', 'Old Websites', 'Is your old site turning away customers? We rebuild slow, unresponsive sites into state-of-the-art web experiences.', '150', ['⚡ Faster Speeds', '🔄 Better UX', '📈 Higher Conversions']) +
          genFaq([{q:'Do you keep my existing content?', a:'Yes, we migrate your old content into the new structure seamlessly.'}])
  },
  {
    path: 'ecommerce-development.html', title: 'E-commerce Development - BlacTec',
    html: genHero('Sell Online with', 'E-commerce Stores', 'Launch your online shop equipped with local payment gateways like MTN MoMo, Airtel Money, and card processing.', '399', ['🛒 Local Payments', '📦 Inventory Management', '📱 WhatsApp Checkout']) +
          genPricing([
            {name: 'Basic Store', desc: 'Small catalog', price: '349', period: 'one-off', features: ['Up to 50 Products', 'Cart Setup', 'Basic Payment Gateways']},
            {name: 'Pro Store', popular: true, desc: 'Large catalog', price: '549', period: 'one-off', features: ['Unlimited Products', 'Advanced Filtering', 'MTN/Airtel Automated integration']},
          ]) + genFaq([{q:'Can I manage products myself?', a:'Yes, we provide a user-friendly dashboard (WordPress/WooCommerce) for easy management.'}])
  },
  {
    path: 'wordpress-development.html', title: 'WordPress Development - BlacTec',
    html: genHero('Expert WordPress', 'Development', 'Custom themes, plugin integrations, and CMS optimizations. Get the most out of the world’s leading platform.', '250', ['🔧 Custom Themes', '🔌 Plugin Creation', '🏎️ Speed Tuning']) +
          genFaq([{q:'Do you offer monthly maintenance?', a:'Yes, we have maintenance packages covering updates, security, and backups.'}])
  },
  {
    path: 'website-maintenance.html', title: 'Website Maintenance - BlacTec',
    html: genHero('Secure & Updated', 'Website Maintenance', 'Let our experts handle plugin updates, security patches, backups, and small edits so you can focus on your business.', '29.99', ['🔄 Weekly Updates', '🛡️ Security Scans', '📝 Content Edits']) +
          genPricing([
            {name: 'Basic Care', desc: 'Essential updates', price: '29.99', features: ['Weekly Plugin Updates', 'Daily Backups', 'Uptime Monitoring']},
            {name: 'Pro Care', popular: true, desc: 'Includes edits', price: '59.99', features: ['All Basic Care features', '2 Hrs of Content Edits', 'Monthly SEO Report']},
          ]) + genFaq([{q:'Can I cancel anytime?', a:'Yes, maintenance plans are month-to-month with no lock-in contracts.'}])
  },

  // SOLUTIONS ----------------------
  {
    path: 'business-email.html', title: 'Business Email - BlacTec',
    html: genHero('Look Professional with', 'Business Email', 'Build customer trust with an email matching your domain (e.g. info@yourcompany.ug). Secure, anti-spam, reliable.', '1.50', ['📧 Custom Domains', '🛡️ Anti-Spam', '📱 Mobile App Sync']) +
          genPricing([
            {name: 'Email Basic', desc: '10GB Storage', price: '1.50', features: ['10GB Storage per Mailbox', 'Antispam Guard', 'Webmail & IMAP']},
            {name: 'Email Pro', popular: true, desc: '50GB Storage', price: '2.50', features: ['50GB Storage per Mailbox', 'Advanced filtering', 'Calendar & Contacts sync']},
          ]) + genFaq([{q:'Can I use it on my phone?', a:'Yes, our business email works perfectly with Apple Mail, Outlook, and Android.'}])
  },
  {
    path: 'ssl-certificates.html', title: 'SSL Certificates - BlacTec',
    html: genHero('Secure Data with', 'Premium SSL Certificates', 'Encrypt customer data, boost Google rankings, and remove "Not Secure" warnings with Comodo and RapidSSL certificates.', '14.99', ['🔒 256-bit Encryption', '🏆 Boosts SEO', '💼 Warranty Included']) +
          genPricing([
            {name: 'Positive SSL', desc: 'Domain Validated', price: '14.99', period: '/yr', features: ['Domain Validated (DV)', 'Issues in minutes', '$10k Warranty', 'Comodo Trust Seal']},
            {name: 'Wildcard SSL', popular: true, desc: 'Secure subdomains', price: '69.99', period: '/yr', features: ['Unlimited Subdomains', 'Domain Validated (DV)', '$10k Warranty', 'Comodo Trust Seal']},
            {name: 'EV SSL', desc: 'Extended Validation', price: '129.99', period: '/yr', features: ['Extended Validation (EV)', 'Strict company check', '$1.75M Warranty', 'Highest trust level']}
          ]) + genFaq([{q:"Don't you offer free SSLs?", a:"Yes, all hosting plans include Free Let's Encrypt SSLs. Premium SSLs are for e-commerce or enterprise businesses needing warranties and higher trust indicators."}])
  },
  {
    path: 'seo-services.html', title: 'SEO Services - BlacTec',
    html: genHero('Rank Higher &', 'Get Found Online', 'Our localized and international SEO strategies will drive organic traffic to your website and increase leads.', '150', ['🔍 Keyword Research', '📈 Analytics Setup', '📝 Content Optimization']) +
          genFaq([{q:'How long until I see results?', a:'SEO is a long-term strategy. Typically, noticeable growth begins between months 3 and 6.'}])
  },
  {
    path: 'bulk-sms.html', title: 'Bulk SMS - BlacTec',
    html: genHero('Reach Customers via', 'Bulk SMS Marketing', 'High delivery rate SMS API and marketing portal. Send promotional texts, OTPs, and alerts instantly across Africa.', '0.015', ['📱 High Delivery', '🔌 API Access', '📊 Delivery Reports']) +
          genPricing([
            {name: 'Starter Pack', desc: 'Pay as you go', price: '15', period: '/1000 SMS', features: ['Standard Delivery Route', 'Sender ID registration', 'API Access']},
            {name: 'Pro Pack', popular: true, desc: 'High volume', price: '100', period: '/10000 SMS', features: ['Priority Delivery', 'Dedicated Account Manager', 'Advanced API Support']},
          ]) + genFaq([{q:'Can I customize the Sender ID?', a:'Yes, you can register a custom sender ID (e.g. YOURBRAND) subject to registry approval.'}])
  },
  {
    path: 'website-security.html', title: 'Website Security - BlacTec',
    html: genHero("Protect Your Site with", "Advanced Security", "Malware scanning, Web Application Firewalls (WAF), and DDoS protection. Don't let hackers ruin your brand.", "5.99", ["🛡️ Web Application Firewall", "🦠 Malware Removal", "🛑 DDoS Mitigation"]) +
          genFaq([{q:'What if my site is already hacked?', a:'We offer immediate malware cleaning and restoration services to sanitize your site.'}])
  }
];

let generatedPaths = [];

// Apply to all
pageConfigs.forEach(page => {
  let titleMatch = headerTemplate.match(/<title>.*?<\/title>/);
  let newHeader = headerTemplate;
  if(titleMatch) {
    newHeader = newHeader.replace(titleMatch[0], "<title>" + page.title + "</title>");
  }
  
  // Make sure nav highlights active link (rough logic)
  newHeader = newHeader.replace(/class="nav-link active"/g, 'class="nav-link"');
  
  const fullHtml = newHeader + '\\n  <main id="main-content">\\n' + page.html + '\\n  </main>\\n' + footerTemplate;
  const filePath = path.join(__dirname, page.path);
  fs.writeFileSync(filePath, fullHtml, 'utf8');
  generatedPaths.push(page.path);
  console.log("Generated: " + page.path);
});

console.log("All " + generatedPaths.length + " pages generated.");
