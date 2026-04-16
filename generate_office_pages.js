const fs = require('fs');
const path = require('path');

const baseHtml = fs.readFileSync('google-workspace.html', 'utf8');
const mainStart = baseHtml.indexOf('<main>');
const mainEnd = baseHtml.indexOf('</main>') + 7;

const headerPart = baseHtml.substring(0, mainStart);
const footerPart = baseHtml.substring(mainEnd);

// ---------------------------------------------------------
// ZOHO MAIL
// ---------------------------------------------------------
let zohoHeader = headerPart
  .replace(/<title>.*?<\/title>/, '<title>Zoho Mail & Workplace | BlacTec</title>')
  .replace(/--color-primary: #4285f4;/g, '--color-primary: #e63946;') // Zoho reddish
  .replace(/--gw-blue: #4285f4;/g, '--gw-blue: #e63946;')
  .replace(/linear-gradient\(135deg, #4285f4 0%, #34A853 50%, #FBBC05 100%\)/gi, 'linear-gradient(135deg, #e63946 0%, #fca311 50%, #ffb703 100%)');

const zohoMain = `
<main>
  <style>
    .gw-hero-dashboard { box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(230, 57, 70, 0.15); }
    .gemini-sparkle-icon { display: none; } /* hide gemini */
    .fa-gmail { background: #e63946 !important; color: white; border-radius: 8px; }
    .fa-drive { background: #fca311 !important; color: white; border-radius: 8px; }
    .fa-docs { background: #14213d !important; color: white; border-radius: 8px; }
    .fa-gemini { display: none; }
    .gw-sc-mail-avatar { background: #14213d; }
  </style>

  <!-- Hero Section -->
  <section class="section" style="padding-top: 180px; padding-bottom: 80px; overflow: visible; position: relative;">
    <div class="container">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.05); padding: 6px 14px; border-radius: 50px; border: 1px solid var(--color-border); margin-bottom: 24px;">
            <span style="font-size: 16px;">📧</span>
            <span style="font-size: 12px; font-weight: 600; color: var(--color-text); letter-spacing: 0.05em; text-transform: uppercase;">Secure Business Email</span>
          </div>
          <h1 style="font-family: 'Unbounded', sans-serif; font-size: clamp(36px, 5vw, 56px); font-weight: 800; color: var(--color-text); line-height: 1.1; margin-bottom: 24px; letter-spacing: -1px;">
            Ad-free, secure email with <span style="background: var(--gradient-brand); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Zoho Mail</span>
          </h1>
          <p style="font-size: 18px; color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 40px; max-width: 480px;">
            Experience unparalleled privacy with Zoho Mail and collaborate seamlessly with Zoho Workplace. Affordable, secure, and reliable email plans for businesses of all sizes.
          </p>
          <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
            <a href="#gw-pricing" class="btn btn-primary" style="padding: 16px 32px; font-size: 15px;">View Zoho Plans</a>
            <p style="font-size: 13px; color: var(--color-text-muted); display: flex; align-items: center; gap: 6px;"><span class="gw-plan-check">✓</span> Guaranteed Ad-Free</p>
            <p style="font-size: 13px; color: var(--color-text-muted); display: flex; align-items: center; gap: 6px;"><span class="gw-plan-check">✓</span> Privacy First</p>
          </div>
        </div>

        <div class="gw-hero-dashboard">
          <div class="gw-dash-header">
            <div class="gw-mockup-dots" style="display:flex;gap:6px;">
              <span class="gw-mockup-dot" style="width:10px;height:10px;border-radius:50%;background:#FF5F57;"></span>
              <span class="gw-mockup-dot" style="width:10px;height:10px;border-radius:50%;background:#FFBD2E;"></span>
              <span class="gw-mockup-dot" style="width:10px;height:10px;border-radius:50%;background:#28C940;"></span>
            </div>
            <div class="gw-mockup-address">mail.zoho.com</div>
          </div>
          <div class="gw-dash-body">
            <div class="gw-dash-sidebar">
              <span style="font-size: 20px; color: var(--color-primary);">✉️</span>
              <span style="font-size: 20px; color: var(--color-text-muted);">📅</span>
              <span style="font-size: 20px; color: var(--color-text-muted);">📋</span>
              <span style="font-size: 20px; color: var(--color-text-muted);">📁</span>
            </div>
            <div class="gw-dash-main">
              <div class="dash-email-sub">Inbox (12)</div>
              
              <!-- Email 1 -->
              <div class="gw-email-row unread" style="display:flex; gap:16px; align-items:center; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:12px;">
                <div class="gw-email-avatar-sm" style="background:var(--color-primary);">K</div>
                <div class="gw-email-info">
                  <span class="gw-sender">Kevin Mgongo</span>
                  <span class="gw-subject">Q3 Marketing Report & Analytics...</span>
                </div>
                <div class="gw-email-time">10:42 AM</div>
              </div>

              <!-- Email 2 -->
              <div class="gw-email-row" style="display:flex; gap:16px; align-items:center;">
                <div class="gw-email-avatar-sm" style="background:#fca311;">A</div>
                <div class="gw-email-info">
                  <span class="gw-sender">Alice Security</span>
                  <span class="gw-subject">Your monthly security report is ready</span>
                </div>
                <div class="gw-email-time">Yesterday</div>
              </div>
            </div>
          </div>
          <div class="gw-mockup-compose">✏️ Compose</div>

          <!-- Floating App Icons -->
          <div class="gw-floating-app fa-gmail" style="font-weight:bold;">Z</div>
          <div class="gw-floating-app fa-drive" style="font-weight:bold;">W</div>
          <div class="gw-floating-app fa-docs" style="font-size:24px;">📝</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Tools Grid Section -->
  <section class="section section-alt">
    <div class="container">
      <div class="section-header">
        <h2>Unmatched Privacy & Tools</h2>
        <p>Everything your business needs to communicate, collaborate, and manage data securely under one roof.</p>
      </div>

      <div class="gw-tools-grid">
        <div class="gw-tool-card">
          <div class="gw-tool-icon">✉️</div>
          <h3>Zoho Mail</h3>
          <p>Enterprise-grade, secure, and ad-free email with custom domains.</p>
        </div>
        <div class="gw-tool-card">
          <div class="gw-tool-icon">📁</div>
          <h3>WorkDrive</h3>
          <p>A secure hub for your team to store, share, and manage workplace files.</p>
        </div>
        <div class="gw-tool-card">
          <div class="gw-tool-icon">💬</div>
          <h3>Zoho Cliq</h3>
          <p>Instant messaging, group chats, and unified business communication.</p>
        </div>
        <div class="gw-tool-card">
          <div class="gw-tool-icon">📝</div>
          <h3>Zoho Office</h3>
          <p>Collaborative word processor, spreadsheets, and presentation software.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section class="section" id="gw-pricing">
    <div class="container">
      <div class="section-header">
        <h2>Simple, Powerful Pricing</h2>
        <p>Choose the Zoho plan that perfectly aligns with your team’s size and collaboration needs.</p>
      </div>

      <div class="gw-pricing-grid">
        <!-- Mail Lite -->
        <div class="gw-plan-card">
          <div class="gw-plan-icon">✉️</div>
          <h3 class="gw-plan-name">Mail Lite</h3>
          <p class="gw-plan-tagline">Essential custom email</p>
          <div class="gw-plan-price-wrap">
            <span class="gw-plan-price-cur">$</span>
            <span class="gw-plan-price">1.00</span>
          </div>
          <p class="gw-plan-period">per user / month (annually)</p>
          <a href="#services" class="btn btn-outline gw-plan-cta">Select Mail Lite</a>
          <ul class="gw-plan-features">
            <li><span class="gw-plan-check">✓</span> <strong>5GB to 10GB</strong> mail storage</li>
            <li><span class="gw-plan-check">✓</span> Enterprise-grade custom email</li>
            <li><span class="gw-plan-check">✓</span> Shared calendars & contacts</li>
            <li><span class="gw-plan-check">✓</span> Mobile & Desktop Apps</li>
            <li><span class="gw-plan-check">✓</span> Aliases & group routing</li>
          </ul>
        </div>

        <!-- Mail Premium -->
        <div class="gw-plan-card popular">
          <span class="gw-popular-badge">High Limit</span>
          <div class="gw-plan-icon">⭐</div>
          <h3 class="gw-plan-name">Mail Premium</h3>
          <p class="gw-plan-tagline">Advanced email archiving</p>
          <div class="gw-plan-price-wrap">
            <span class="gw-plan-price-cur">$</span>
            <span class="gw-plan-price">4.00</span>
          </div>
          <p class="gw-plan-period">per user / month (annually)</p>
          <a href="#services" class="btn btn-primary gw-plan-cta">Select Premium</a>
          <ul class="gw-plan-features">
            <li><span class="gw-plan-check">✓</span> <strong>50GB</strong> mail storage</li>
            <li><span class="gw-plan-check">✓</span> Email Retention & eDiscovery</li>
            <li><span class="gw-plan-check">✓</span> S-MIME & Encryption</li>
            <li><span class="gw-plan-check">✓</span> Huge Attachments feature</li>
            <li><span class="gw-plan-check">✓</span> Account backup & recovery</li>
          </ul>
        </div>

        <!-- Workplace Standard -->
        <div class="gw-plan-card">
          <div class="gw-plan-icon">🏢</div>
          <h3 class="gw-plan-name">Workplace Standard</h3>
          <p class="gw-plan-tagline">Complete collaboration suite</p>
          <div class="gw-plan-price-wrap">
            <span class="gw-plan-price-cur">$</span>
            <span class="gw-plan-price">3.00</span>
          </div>
          <p class="gw-plan-period">per user / month (annually)</p>
          <a href="#services" class="btn btn-outline gw-plan-cta">Select Workplace</a>
          <ul class="gw-plan-features">
            <li><span class="gw-plan-check">✓</span> <strong>30GB</strong> mail storage per user</li>
            <li><span class="gw-plan-check">✓</span> <strong>100GB</strong> shared WorkDrive storage</li>
            <li><span class="gw-plan-check">✓</span> Zoho Cliq for team chat</li>
            <li><span class="gw-plan-check">✓</span> Zoho Writer, Sheet, & Show</li>
            <li><span class="gw-plan-check">✓</span> Video meetings via Zoho Meeting</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</main>
`;
fs.writeFileSync('zoho-mail.html', zohoHeader + zohoMain + footerPart);


// ---------------------------------------------------------
// MICROSOFT 365
// ---------------------------------------------------------
let m365Header = headerPart
  .replace(/<title>.*?<\/title>/, '<title>Microsoft 365 | BlacTec</title>')
  .replace(/--color-primary: #4285f4;/g, '--color-primary: #0078D4;') // Microsoft blue
  .replace(/--gw-blue: #4285f4;/g, '--gw-blue: #0078D4;')
  .replace(/linear-gradient\(135deg, #4285f4 0%, #34A853 50%, #FBBC05 100%\)/gi, 'linear-gradient(135deg, #0078D4 0%, #00A4EF 50%, #FFB900 100%)');

const m365Main = `
<main>
  <style>
    .gw-hero-dashboard { box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0, 120, 212, 0.15); }
    .gemini-sparkle-icon { display: none; } /* hide gemini */
    .fa-gmail { background: #0078D4 !important; color: white; border-radius: 8px; }
    .fa-drive { background: #107C41 !important; color: white; border-radius: 8px; }
    .fa-docs { background: #4B53BC !important; color: white; border-radius: 8px; }
    .fa-gemini { display: none; }
    .gw-sc-mail-avatar { background: #0078D4; }
  </style>

  <!-- Hero Section -->
  <section class="section" style="padding-top: 180px; padding-bottom: 80px; overflow: visible; position: relative;">
    <div class="container">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.05); padding: 6px 14px; border-radius: 50px; border: 1px solid var(--color-border); margin-bottom: 24px;">
            <span style="font-size: 16px;">🏢</span>
            <span style="font-size: 12px; font-weight: 600; color: var(--color-text); letter-spacing: 0.05em; text-transform: uppercase;">Cloud Productivity</span>
          </div>
          <h1 style="font-family: 'Unbounded', sans-serif; font-size: clamp(36px, 5vw, 56px); font-weight: 800; color: var(--color-text); line-height: 1.1; margin-bottom: 24px; letter-spacing: -1px;">
            Work brilliantly with <span style="background: var(--gradient-brand); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Microsoft 365</span>
          </h1>
          <p style="font-size: 18px; color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 40px; max-width: 480px;">
            Connect your team with industry-leading business apps like Word, Excel, Teams, and Outlook. Built-in, enterprise-grade security included.
          </p>
          <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
            <a href="#gw-pricing" class="btn btn-primary" style="padding: 16px 32px; font-size: 15px;">View Business Plans</a>
            <p style="font-size: 13px; color: var(--color-text-muted); display: flex; align-items: center; gap: 6px;"><span class="gw-plan-check">✓</span> Outlook Exchange</p>
            <p style="font-size: 13px; color: var(--color-text-muted); display: flex; align-items: center; gap: 6px;"><span class="gw-plan-check">✓</span> 1TB OneDrive Storage</p>
          </div>
        </div>

        <div class="gw-hero-dashboard">
          <div class="gw-dash-header">
            <div class="gw-mockup-dots" style="display:flex;gap:6px;">
              <span class="gw-mockup-dot" style="width:10px;height:10px;border-radius:50%;background:#FF5F57;"></span>
              <span class="gw-mockup-dot" style="width:10px;height:10px;border-radius:50%;background:#FFBD2E;"></span>
              <span class="gw-mockup-dot" style="width:10px;height:10px;border-radius:50%;background:#28C940;"></span>
            </div>
            <div class="gw-mockup-address">outlook.office.com</div>
          </div>
          <div class="gw-dash-body">
            <div class="gw-dash-sidebar">
              <span style="font-size: 20px; color: var(--color-primary);">✉️</span>
              <span style="font-size: 20px; color: var(--color-text-muted);">📅</span>
              <span style="font-size: 20px; color: var(--color-text-muted);">👥</span>
              <span style="font-size: 20px; color: var(--color-text-muted);">📁</span>
            </div>
            <div class="gw-dash-main">
              <div class="dash-email-sub">Inbox</div>
              
              <div class="gw-email-row unread" style="display:flex; gap:16px; align-items:center; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:12px;">
                <div class="gw-email-avatar-sm" style="background:#0078D4;">T</div>
                <div class="gw-email-info">
                  <span class="gw-sender">Teams Notification</span>
                  <span class="gw-subject">You have a new message in Marketing Channel...</span>
                </div>
                <div class="gw-email-time">09:15 AM</div>
              </div>

              <div class="gw-email-row" style="display:flex; gap:16px; align-items:center;">
                <div class="gw-email-avatar-sm" style="background:#107C41;">X</div>
                <div class="gw-email-info">
                  <span class="gw-sender">Excel Online</span>
                  <span class="gw-subject">Financial Projections Q4 has been updated</span>
                </div>
                <div class="gw-email-time">Yesterday</div>
              </div>
            </div>
          </div>
          <div class="gw-mockup-compose" style="background:#0078D4;">➕ New Mail</div>

          <!-- Floating App Icons -->
          <div class="gw-floating-app fa-gmail" style="font-size:24px;">W</div>
          <div class="gw-floating-app fa-drive" style="font-size:24px;">X</div>
          <div class="gw-floating-app fa-docs" style="font-size:24px;">T</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Tools Grid Section -->
  <section class="section section-alt">
    <div class="container">
      <div class="section-header">
        <h2>Industry Standard Tools</h2>
        <p>Empower your team with applications they already know and love, backed by Microsoft's secure cloud.</p>
      </div>

      <div class="gw-tools-grid">
        <div class="gw-tool-card">
          <div class="gw-tool-icon" style="color:#0078D4;">W</div>
          <h3>Microsoft Word</h3>
          <p>The global standard for document creation, now better with cloud collaboration.</p>
        </div>
        <div class="gw-tool-card">
          <div class="gw-tool-icon" style="color:#107C41;">X</div>
          <h3>Microsoft Excel</h3>
          <p>Unmatched spreadsheet power for financial modeling and data analysis.</p>
        </div>
        <div class="gw-tool-card">
          <div class="gw-tool-icon" style="color:#4B53BC;">T</div>
          <h3>Microsoft Teams</h3>
          <p>The ultimate hub for teamwork, bringing chat, meetings, and apps together.</p>
        </div>
        <div class="gw-tool-card">
          <div class="gw-tool-icon" style="color:#0078D4;">☁️</div>
          <h3>OneDrive & SharePoint</h3>
          <p>1TB of secure storage per user plus powerful intranet file sharing sites.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section class="section" id="gw-pricing">
    <div class="container">
      <div class="section-header">
        <h2>Microsoft 365 Business Plans</h2>
        <p>Flexible plans tailored for your growing business operations.</p>
      </div>

      <div class="gw-pricing-grid">
        <!-- Business Basic -->
        <div class="gw-plan-card">
          <div class="gw-plan-icon" style="color:#0078D4;">☁️</div>
          <h3 class="gw-plan-name">Business Basic</h3>
          <p class="gw-plan-tagline">Web and mobile apps only</p>
          <div class="gw-plan-price-wrap">
            <span class="gw-plan-price-cur">$</span>
            <span class="gw-plan-price">6.00</span>
          </div>
          <p class="gw-plan-period">per user / month (annually)</p>
          <a href="#services" class="btn btn-outline gw-plan-cta">Select Basic</a>
          <ul class="gw-plan-features">
            <li><span class="gw-plan-check" style="color:#0078D4;">✓</span> Web & mobile versions of Word, Excel, PPT</li>
            <li><span class="gw-plan-check" style="color:#0078D4;">✓</span> <strong>50 GB</strong> Exchange mailbox</li>
            <li><span class="gw-plan-check" style="color:#0078D4;">✓</span> <strong>1 TB</strong> OneDrive cloud storage</li>
            <li><span class="gw-plan-check" style="color:#0078D4;">✓</span> Microsoft Teams chat and meetings</li>
            <li><span class="gw-plan-check" style="color:#0078D4;">✓</span> Standard Microsoft security</li>
          </ul>
        </div>

        <!-- Business Standard -->
        <div class="gw-plan-card popular" style="border-color:#0078D4;">
          <span class="gw-popular-badge" style="background:#0078D4;">Most Popular</span>
          <div class="gw-plan-icon" style="color:#0078D4;">💻</div>
          <h3 class="gw-plan-name">Business Standard</h3>
          <p class="gw-plan-tagline">Includes Premium Desktop Apps</p>
          <div class="gw-plan-price-wrap">
            <span class="gw-plan-price-cur">$</span>
            <span class="gw-plan-price">12.50</span>
          </div>
          <p class="gw-plan-period">per user / month (annually)</p>
          <a href="#services" class="btn btn-primary gw-plan-cta" style="background:#0078D4; border-color:#0078D4;">Select Standard</a>
          <ul class="gw-plan-features">
            <li><span class="gw-plan-check" style="color:#0078D4;">✓</span> Everything in Business Basic</li>
            <li><span class="gw-plan-check" style="color:#0078D4;">✓</span> <strong>Desktop apps</strong> with premium features</li>
            <li><span class="gw-plan-check" style="color:#0078D4;">✓</span> Easily host webinars in Teams</li>
            <li><span class="gw-plan-check" style="color:#0078D4;">✓</span> Attendee registration and reporting</li>
            <li><span class="gw-plan-check" style="color:#0078D4;">✓</span> Microsoft Loop collaborative workspaces</li>
          </ul>
        </div>

        <!-- Business Premium -->
        <div class="gw-plan-card">
          <div class="gw-plan-icon" style="color:#0078D4;">🛡️</div>
          <h3 class="gw-plan-name">Business Premium</h3>
          <p class="gw-plan-tagline">Advanced security & management</p>
          <div class="gw-plan-price-wrap">
            <span class="gw-plan-price-cur">$</span>
            <span class="gw-plan-price">22.00</span>
          </div>
          <p class="gw-plan-period">per user / month (annually)</p>
          <a href="#services" class="btn btn-outline gw-plan-cta">Select Premium</a>
          <ul class="gw-plan-features">
            <li><span class="gw-plan-check" style="color:#0078D4;">✓</span> Everything in Business Standard</li>
            <li><span class="gw-plan-check" style="color:#0078D4;">✓</span> Advanced cyber threat protection</li>
            <li><span class="gw-plan-check" style="color:#0078D4;">✓</span> PC and mobile device management</li>
            <li><span class="gw-plan-check" style="color:#0078D4;">✓</span> Information protection & encryption</li>
            <li><span class="gw-plan-check" style="color:#0078D4;">✓</span> Microsoft Defender for Business</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</main>
`;
fs.writeFileSync('microsoft-365.html', m365Header + m365Main + footerPart);

console.log("Pages zoho-mail.html and microsoft-365.html successfully created.");
