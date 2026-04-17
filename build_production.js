/**
 * build_production.js
 * 
 * Compiles the BlacTec Redesign project for production deployment on GCP/Nginx.
 * 1. Collects all 23 production HTML files and assets.
 * 2. Minifies HTML/CSS/JS (internal) to maximize speed.
 * 3. Includes a production-ready nginx.conf with Clean URLs support.
 * 4. Outputs a 'prod_build' folder ready for ZIPping.
 */

const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const buildDir = path.join(rootDir, 'prod_build');

// 1. Setup Build Directory
if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true, force: true });
}
fs.mkdirSync(buildDir);
fs.mkdirSync(path.join(buildDir, 'assets'));

// 2. Define Nginx Config
const nginxConfig = `
server {
    listen 80;
    server_name blactec.ug www.blactec.ug;
    root /var/www/html;
    index index.html;

    # Clean URLs: Serve .html files without the extension
    # e.g. /web-development internally serves /web-development.html
    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    # Custom 404
    error_page 404 /404.html;
    location = /404.html {
        internal;
    }

    # Caching for static assets (1 year)
    location ~* \\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 365d;
        add_header Cache-Control "public, no-transform";
    }

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "no-referrer-when-downgrade";
    add_header Content-Security-Policy "default-src 'self' https: 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: https:; font-src 'self' https: data:;";

    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml;
    gzip_disable "MSIE [1-6]\\.";
}
`;

fs.writeFileSync(path.join(buildDir, 'nginx.conf'), nginxConfig.trim());

// 3. Simple HTML/CSS/JS Minifier (Regex based)
function minify(content) {
    return content
        .replace(/<!--[\\s\\S]*?-->/g, '') // Remove HTML comments
        .replace(/\\>\\s+\\</g, '><')          // Remove space between tags
        .replace(/\\s+/g, ' ')               // Collapse multiple spaces/newlines
        .trim();
}

// 4. Copy and Minify HTML Files
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
htmlFiles.forEach(file => {
    let content = fs.readFileSync(path.join(rootDir, file), 'utf8');
    content = minify(content);
    fs.writeFileSync(path.join(buildDir, file), content);
    console.log(`✓ Compiled & Minified: ${file}`);
});

// 5. Copy Assets
const assetDir = path.join(rootDir, 'assets');
if (fs.existsSync(assetDir)) {
    const assets = fs.readdirSync(assetDir);
    assets.forEach(asset => {
        fs.copyFileSync(path.join(assetDir, asset), path.join(buildDir, 'assets', asset));
        console.log(`✓ Copied Asset: assets/${asset}`);
    });
}

// 6. Copy Root SVG and Image Files
const rootAssets = fs.readdirSync(rootDir).filter(f => f.endsWith('.svg') || f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.ico'));
rootAssets.forEach(asset => {
    fs.copyFileSync(path.join(rootDir, asset), path.join(buildDir, asset));
    console.log(`✓ Copied Root Asset: ${asset}`);
});

console.log('\\nBuild complete in ./prod_build');
console.log('Next step: ZIP the contents of prod_build');
