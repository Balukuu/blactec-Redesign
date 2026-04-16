const https = require('https');
const fs = require('fs');

const svgs = [
  { name: 'm365-word.svg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg' },
  { name: 'm365-excel.svg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg' },
  { name: 'm365-teams.svg', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg' },
  { name: 'm365-onedrive.svg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Microsoft_OneDrive_icon.svg' }
];

const fetchSvg = (item) => {
  return new Promise((resolve, reject) => {
    https.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BlacTec/1.0' } }, (res) => {
      if(res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BlacTec/1.0' } }, (res2) => {
          let data = '';
          res2.on('data', chunk => data += chunk);
          res2.on('end', () => resolve({name: item.name, data}));
        }).on('error', reject);
      } else {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({name: item.name, data}));
      }
    }).on('error', reject);
  });
};

Promise.all(svgs.map(fetchSvg))
  .then(results => {
    results.forEach(res => {
      fs.writeFileSync(res.name, res.data);
      console.log('Saved', res.name);
    });

    // Update microsoft-365.html
    let html = fs.readFileSync('microsoft-365.html', 'utf8');
    html = html.replace('https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg', 'm365-word.svg');
    html = html.replace('https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg', 'm365-excel.svg');
    html = html.replace('https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg', 'm365-teams.svg');
    html = html.replace('https://upload.wikimedia.org/wikipedia/commons/d/da/Microsoft_OneDrive_icon.svg', 'm365-onedrive.svg');
    fs.writeFileSync('microsoft-365.html', html);
    console.log('Updated HTML file.');
  })
  .catch(err => console.error(err));
