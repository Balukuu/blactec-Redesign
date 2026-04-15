const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const replacements = [
  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>Web Hosting<\/strong>/g, replacement: 'web-hosting.html' },
  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>WordPress Hosting<\/strong>/g, replacement: 'wordpress-hosting.html' },
  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>VPS Hosting<\/strong>/g, replacement: 'vps-hosting.html' },
  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>Cloud Hosting<\/strong>/g, replacement: 'cloud-hosting.html' },
  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>Reseller Hosting<\/strong>/g, replacement: 'reseller-hosting.html' },

  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>Website Design<\/strong>/g, replacement: 'website-design.html' },
  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>Website Modernisation<\/strong>/g, replacement: 'website-modernisation.html' },
  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>E-commerce Development<\/strong>/g, replacement: 'ecommerce-development.html' },
  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>WordPress Development<\/strong>/g, replacement: 'wordpress-development.html' },
  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>Website Maintenance<\/strong>/g, replacement: 'website-maintenance.html' },

  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>Domain Search<\/strong>/g, replacement: 'domain-search.html' },
  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>\.UG Domains<\/strong>/g, replacement: 'ug-domains.html' },
  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>Domain Transfer<\/strong>/g, replacement: 'domain-transfer.html' },
  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>Free WHOIS Privacy<\/strong>/g, replacement: 'whois-privacy.html' },

  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>Business Email<\/strong>/g, replacement: 'business-email.html' },
  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>Google Workspace<\/strong>/g, replacement: 'google-workspace.html' },
  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>SSL Certificates<\/strong>/g, replacement: 'ssl-certificates.html' },
  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>SEO Services<\/strong>/g, replacement: 'seo-services.html' },
  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>Bulk SMS<\/strong>/g, replacement: 'bulk-sms.html' },
  { match: /<a href="[^"]*"[^>]*>\s*<span class="nav-dropdown-icon">[^<]+<\/span>\s*<div class="nav-dropdown-text"><strong>Website Security<\/strong>/g, replacement: 'website-security.html' }
];

let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let original = content;

  // Let's replace the hrefs inside the anchors for navbar structure
  // Because my regex matches the whole starting <a href...> up to <strong>...</strong> it's a bit rigid.
  // Instead, let's use a dynamic replacer function:
  
  replacements.forEach(r => {
    // we need to capture the exact structure and replace the href
    content = content.replace(r.match, (matchedStr) => {
      // matchedStr looks like: <a href="web-hosting.html" class="nav-dropdown-item"... > ... <div ...><strong>Web Hosting</strong>
      return matchedStr.replace(/href="[^"]*"/, 'href="' + r.replacement + '"');
    });
  });

  // Extra ones (like Mobile Menu links, footer links, index grid links)
  // Let's do a hard replace on the ones that use anchors IF they are simple:
  // e.g. `<a href="#design" class="mobile-sub-link">` -> `<a href="website-design.html" class="mobile-sub-link">` (We can do this precisely based on text)
  const mobileReplacements = [
    {text: 'Web Hosting', rep: 'web-hosting.html'},
    {text: 'WordPress Hosting', rep: 'wordpress-hosting.html'},
    {text: 'VPS Hosting', rep: 'vps-hosting.html'},
    {text: 'Cloud Hosting', rep: 'cloud-hosting.html'},
    {text: 'Reseller Hosting', rep: 'reseller-hosting.html'},
    {text: 'Website Design', rep: 'website-design.html'},
    {text: 'Website Modernisation', rep: 'website-modernisation.html'},
    {text: 'E-commerce Dev', rep: 'ecommerce-development.html'},
    {text: 'WordPress Dev', rep: 'wordpress-development.html'},
    {text: 'Website Maintenance', rep: 'website-maintenance.html'},
    {text: 'Domain Search', rep: 'domain-search.html'},
    {text: '.UG Domains', rep: 'ug-domains.html'},
    {text: 'Domain Transfer', rep: 'domain-transfer.html'},
    {text: 'Free WHOIS Privacy', rep: 'whois-privacy.html'},
    {text: 'Business Email', rep: 'business-email.html'},
    {text: 'Google Workspace', rep: 'google-workspace.html'},
    {text: 'SSL Certificates', rep: 'ssl-certificates.html'},
    {text: 'SEO Services', rep: 'seo-services.html'},
    {text: 'Bulk SMS', rep: 'bulk-sms.html'},
    {text: 'Website Security', rep: 'website-security.html'}
  ];

  mobileReplacements.forEach(r => {
      // Find mobile link: <a href="#target" class="mobile-sub-link">📅 Text</a>
      let mobileRegex = new RegExp('<a href="[^"]*" class="mobile-sub-link">([^<]*)' + r.text + '<\\/a>', "g");
      content = content.replace(mobileRegex, '<a href="' + r.rep + '" class="mobile-sub-link">$1' + r.text + '</a>');
  });

  // Update Footer links
  const footerReplacements = [
    {text: 'VPS Hosting', rep: 'vps-hosting.html'},
    {text: 'Cloud Hosting', rep: 'cloud-hosting.html'},
    {text: 'WordPress Hosting', rep: 'wordpress-hosting.html'},
    {text: 'Domain Registration', rep: 'domain-search.html'}
  ];
  footerReplacements.forEach(r => {
      let footerRegex = new RegExp('<li><a href="[^"]*">' + r.text + '<\\/a><\\/li>', "g");
      content = content.replace(footerRegex, '<li><a href="' + r.rep + '">' + r.text + '</a></li>');
  });

  // Save if changed
  if (content !== original) {
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    updatedCount++;
  }
});

console.log("Updated navigation links in " + updatedCount + " files.");
