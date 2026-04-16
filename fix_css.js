const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const webHostingHtml = fs.readFileSync('web-hosting.html', 'utf8');
let webDevHtml = fs.readFileSync('web-development.html', 'utf8');

// 1. Get the original base styles that work for Hero and Pricing Grids!
const whStyleStart = webHostingHtml.indexOf('<style>');
const whStyleEnd = webHostingHtml.indexOf('</style>', whStyleStart);
const baseStyles = webHostingHtml.substring(whStyleStart + 7, whStyleEnd);

// 2. Extract Spotlight CSS from index.html
// Looking for `/* DESIGN SPOTLIGHT (ALTERNATING) */` or similar
const spotlightBlockStart = indexHtml.indexOf('/* ============================================================');
const targetCSSStart = indexHtml.indexOf('DESIGN SPOTLIGHT (ALTERNATING)', spotlightBlockStart);
const cssStart = indexHtml.lastIndexOf('/*', targetCSSStart);
const cssEnd = indexHtml.indexOf('/* ============================================================', targetCSSStart + 40);

const spotlightCSS = indexHtml.substring(cssStart, cssEnd);

// 3. Rebuild the <style> block in web-development.html
const mergedStyle = `\n<style>\n${baseStyles}\n\n${spotlightCSS}\n</style>\n`;

const wdStyleStart = webDevHtml.indexOf('<style>');
const wdStyleEnd = webDevHtml.indexOf('</style>') + 8;

webDevHtml = webDevHtml.substring(0, wdStyleStart) + mergedStyle + webDevHtml.substring(wdStyleEnd);

fs.writeFileSync('web-development.html', webDevHtml);
console.log("Restored base layout styles and appended structural mockup CSS!");
