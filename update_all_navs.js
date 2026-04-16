const fs = require('fs');

const idxHtml = fs.readFileSync('index.html', 'utf8');

// The nav block starts around `<header` and ends just before `<main>`
let hStart = idxHtml.indexOf('<header');
let mStart = idxHtml.indexOf('<main>');
const navBlock = idxHtml.substring(hStart, mStart);

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  if (file === 'index.html') return;
  
  let content = fs.readFileSync(file, 'utf8');
  let fhStart = content.indexOf('<header');
  let fmStart = content.indexOf('<main>');
  
  if (fhStart !== -1 && fmStart !== -1) {
    let updated = content.substring(0, fhStart) + navBlock + content.substring(fmStart);
    fs.writeFileSync(file, updated);
    console.log('Successfully injected top navigation and mobile header into', file);
  } else {
    // maybe it misses a main or header?
    console.log("Skipping", file, "- could not locate <header> or <main>");
  }
});

console.log('Nav fully propagated to all pages successfully!');
