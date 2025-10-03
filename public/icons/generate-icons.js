// Simple script to generate PWA icons
// Run with: node public/icons/generate-icons.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create code brackets icon (< / >)
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#000000" rx="64"/>
  <!-- Code brackets icon - scaled for PWA -->
  <g fill="#ffffff" stroke="#ffffff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">
    <!-- Left bracket < -->
    <path d="M180 160 L100 256 L180 352" fill="none"/>
    <!-- Right bracket > -->
    <path d="M332 160 L412 256 L332 352" fill="none"/>
    <!-- Forward slash / -->
    <path d="M280 140 L232 372" fill="none"/>
  </g>
</svg>`;

// Save the SVG
fs.writeFileSync(path.join(__dirname, 'icon.svg'), svgIcon);

console.log('Generated icon.svg');
console.log('To generate PNG icons, you can:');
console.log('1. Open icon.svg in a browser');
console.log('2. Take screenshots at different sizes');
console.log('3. Or use online SVG to PNG converters');
console.log(
  '4. Generate these sizes: 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512'
);
