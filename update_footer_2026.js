const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update copyright years
html = html.replace(/2025 BlacTec\. All rights reserved\./g, '2026 BlacTec. All rights reserved.');
html = html.replace(/2025 BlacTec Technologies Ltd/g, '2026 BlacTec Technologies Ltd');

// 2. Replace the payment badges div
const oldBadges = `<div class="payment-badges">
        <span class="pay-badge mtn">MTN MoMo</span>
        <span class="pay-badge airtel">Airtel Money</span>
        <span class="pay-badge">Visa</span>
        <span class="pay-badge">Mastercard</span>
      </div>`;

const newBadges = `<div class="payment-badges" style="display: flex; gap: 8px; align-items: center;">
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
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" height="24" width="60" style="border-radius:4px; box-shadow:0 1px 3px rgba(0,0,0,0.2);">
          <rect width="100" height="40" rx="4" fill="#141823"/>
          <circle cx="42" cy="20" r="11" fill="#eb001b"/>
          <circle cx="58" cy="20" r="11" fill="#f79e1b" fill-opacity="0.9"/>
        </svg>
      </div>`;

html = html.replace(oldBadges, newBadges);

// Also replace the footer copy year on line 2994 exactly if regex missed it for some spacing reason:
html = html.replace('© 2025 BlacTec Technologies Ltd. Kampala, Uganda.', '© 2026 BlacTec Technologies Ltd. Kampala, Uganda.');
html = html.replace('© 2025 BlacTec. All rights reserved.', '© 2026 BlacTec. All rights reserved.');

fs.writeFileSync('index.html', html);
console.log('Updated index.html footer');
