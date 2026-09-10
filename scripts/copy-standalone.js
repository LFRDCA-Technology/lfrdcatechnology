const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  if (fs.existsSync(src)) {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
      fs.readdirSync(src).forEach(child => copyRecursiveSync(path.join(src, child), path.join(dest, child)));
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

copyRecursiveSync('.next/static', '.next/standalone/.next/static');
copyRecursiveSync('public', '.next/standalone/public');
console.log('Successfully copied static assets to standalone directory.');
