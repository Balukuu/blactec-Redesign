const fs = require('fs');
const path = require('path');

const files = ['index.html', 'web-hosting.html', 'google-workspace.html'];
const linkMaps = [
  {text: 'E-commerce Development', rep: 'ecommerce-development.html'},
  {text: 'WordPress Development', rep: 'wordpress-development.html'}
];

files.forEach(f => {
  const filePath = path.join(__dirname, f);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  linkMaps.forEach(m => {
    // Escape and search
    const escapedText = m.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('href=\"#services\"([^>]*>)[^<]*' + escapedText, 'g');
    content = content.replace(regex, 'href=\"' + m.rep + '\"$1' + m.text);
    
    // Also check for common placeholder variations
    const regex2 = new RegExp('href=\"#\"([^>]*>)[^<]*' + escapedText, 'g');
    content = content.replace(regex2, 'href=\"' + m.rep + '\"$1' + m.text);
  });
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated links in ${f}`);
  }
});
