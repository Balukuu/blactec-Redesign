const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const scrollbarCSS = `
    /* Hide scrollbars site-wide while maintaining scroll functionality */
    *::-webkit-scrollbar { display: none; }
    * { -ms-overflow-style: none; scrollbar-width: none; }
`;

files.forEach(file => {
    // skip index.html as we handle it manually or specially
    if (file === 'index.html') return;

    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let newContent = content;

    // 1. Inject Scrollbar Hiding CSS before </style>
    if (newContent.includes('</style>') && !newContent.includes('-ms-overflow-style: none')) {
        newContent = newContent.replace('</style>', scrollbarCSS + '\n  </style>');
    }

    // 2. Remove Payment Badge CSS
    const paymentCSSRegex = /\.payment-badges\s*\{[\s\S]*?\}\s*\.payment-badge\s*\{[\s\S]*?\}\s*\.payment-badge:hover\s*\{[\s\S]*?\}\s*\.payment-badge\s*svg\s*\{[\s\S]*?\}/g;
    newContent = newContent.replace(paymentCSSRegex, '');

    // Backup regex for when spacing is different
    newContent = newContent.replace(/\.payment-badges\s*\{[^}]+\}/g, '');
    newContent = newContent.replace(/\.payment-badge\s*\{[^}]+\}/g, '');
    newContent = newContent.replace(/\.payment-badge:hover\s*\{[^}]+\}/g, '');
    newContent = newContent.replace(/\.payment-badge\s*svg\s*\{[^}]+\}/g, '');

    // 3. Remove Payment Badge HTML
    const paymentHTMLRegex = /<div class="payment-badges">[\s\S]*?<\/div>/g;
    newContent = newContent.replace(paymentHTMLRegex, '');

    if (newContent !== content) {
        fs.writeFileSync(path.join(dir, file), newContent, 'utf8');
        console.log(`Cleaned up ${file}`);
    }
});
