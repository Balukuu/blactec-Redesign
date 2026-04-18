/**
 * build_production.js (Enhanced)
 * 
 * Compiles the BlacTec Redesign project for production deployment on GCP/Nginx.
 * 1. Collects all production HTML files and assets.
 * 2. Refactors internal links for CLEAN URLs (removes .html).
 * 3. Minifies HTML/CSS/JS (internal) to maximize speed.
 * 4. Includes a production-ready nginx.conf with Clean URLs support.
 * 5. Outputs a 'prod_build' folder and a final ZIP bundle.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = __dirname;
const buildDir = path.join(rootDir, 'prod_build');

console.log('Starting BlacTec Production Build...');

// 1. Setup Build Directory
if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true, force: true });
}
fs.mkdirSync(buildDir);
fs.mkdirSync(path.join(buildDir, 'assets'), { recursive: true });

// 2. Define Nginx Config
const nginxConfig = `
server {
    listen 80;
    server_name blactec.ug www.blactec.ug;
    root /var/www/html;
    index index.html;

    # Clean URLs: Serve .html files without the extension
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }

    # Redirect .html requests to clean URLs
    if ($request_uri ~ ^/(.*)\\.html$) {
        return 301 /$1;
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

    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml;
    gzip_disable "MSIE [1-6]\\.";
}
`;

fs.writeFileSync(path.join(buildDir, 'nginx.conf'), nginxConfig.trim());

// 3. Minifier & Link Refactorer
function processContent(content) {
    // A. Refactor links for Clean URLs: change href="page.html" to href="page"
    // We only target local links (not starting with http/https/mailto/tel)
    let processed = content.replace(/href="([^"\\/][^":]*)\.html(#?[^"]*)"/g, 'href="$1$2"');
    
    // B. Fix index.html links to point to /
    processed = processed.replace(/href="index"/g, 'href="/"');

    // C. Minify
    return processed
        .replace(/<!--[\\s\\S]*?-->/g, '') // Remove HTML comments
        .replace(/\\>\\s+\\</g, '><')          // Remove space between tags
        .replace(/\\s+/g, ' ')               // Collapse multiple spaces/newlines
        .trim();
}

// 4. Copy and Process HTML Files
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
htmlFiles.forEach(file => {
    let content = fs.readFileSync(path.join(rootDir, file), 'utf8');
    content = processContent(content);
    fs.writeFileSync(path.join(buildDir, file), content);
    console.log(`✓ Processed & Minified: ${file}`);
});

// 5. Copy Assets
const assetDir = path.join(rootDir, 'assets');
if (fs.existsSync(assetDir)) {
    const assets = fs.readdirSync(assetDir);
    assets.forEach(asset => {
        const fullPath = path.join(assetDir, asset);
        if (fs.lstatSync(fullPath).isFile()) {
            fs.copyFileSync(fullPath, path.join(buildDir, 'assets', asset));
            console.log(`✓ Copied Asset: assets/${asset}`);
        }
    });
}

// 6. Copy Root SVG and Image Files
const rootAssets = fs.readdirSync(rootDir).filter(f => f.endsWith('.svg') || f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.ico'));
rootAssets.forEach(asset => {
    fs.copyFileSync(path.join(rootDir, asset), path.join(buildDir, asset));
    console.log(`✓ Copied Root Asset: ${asset}`);
});

console.log('\\nBuild folder created in ./prod_build');

// 7. Create ZIP Bundle (Windows PowerShell)
try {
    console.log('Creating ZIP bundle...');
    const zipName = 'blactec_clean_urls_deploy.zip';
    // Remove existing zip if any
    if (fs.existsSync(path.join(rootDir, zipName))) {
        fs.unlinkSync(path.join(rootDir, zipName));
    }
    
    // Command to zip the contents of prod_build
    const cmd = `powershell -Command "Compress-Archive -Path '${buildDir}\\*' -DestinationPath '${path.join(rootDir, zipName)}' -Force"`;
    execSync(cmd);
    console.log(`\\n🚀 SUCCESS! Deployment package created: ${zipName}`);
} catch (err) {
    console.error('Error creating ZIP bundle:', err.message);
}
