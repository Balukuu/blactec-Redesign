const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');
let webDevHtml = fs.readFileSync('web-development.html', 'utf8');

// 1. Extract Master Stylesheet
const styleStart = indexHtml.indexOf('<style>');
const styleEnd = indexHtml.indexOf('</style>') + 8;
const masterStyle = indexHtml.substring(styleStart, styleEnd);

// 2. Extract Spotlight Section ("Get a Website That Converts...")
const sectionStart = indexHtml.indexOf('<section id="design"');
const sectionEnd = indexHtml.indexOf('</section>', sectionStart) + 10;
const spotlightSection = indexHtml.substring(sectionStart, sectionEnd);

// 3. Update Stylesheet globally in the new file to ensure complex CSS renders
const wdStyleStart = webDevHtml.indexOf('<style>');
const wdStyleEnd = webDevHtml.indexOf('</style>') + 8;
webDevHtml = webDevHtml.substring(0, wdStyleStart) + masterStyle + webDevHtml.substring(wdStyleEnd);

// 4. Inject Spotlight Section replacing the generic `solutions` block
const heroEnd = webDevHtml.indexOf('</section>', webDevHtml.indexOf('id="hosting-hero"')) + 10;
const solutionsStart = webDevHtml.indexOf('<section id="solutions"');
const solutionsEnd = webDevHtml.indexOf('</section>', solutionsStart) + 10;

// Replace the solutions section with the spotlight section
webDevHtml = webDevHtml.substring(0, solutionsStart) + spotlightSection + webDevHtml.substring(solutionsEnd);

// Ensure the ID of the spotlight section matches the jump link logic if needed, 
// actually the hero jump link was to #pricing which remains unchanged!

fs.writeFileSync('web-development.html', webDevHtml);
console.log("Spotlight mockups injected into Web Development page successfully!");
