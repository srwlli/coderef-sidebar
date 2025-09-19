// Simple script to generate PWA icons
// Run with: node public/icons/generate-icons.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a simple SVG icon
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#000000" rx="64"/>
  <g fill="#ffffff">
    <!-- Note icon -->
    <path d="M128 96h256c17.7 0 32 14.3 32 32v256c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32z" stroke="#ffffff" stroke-width="8" fill="none"/>
    <line x1="176" y1="192" x2="336" y2="192" stroke="#ffffff" stroke-width="8"/>
    <line x1="176" y1="256" x2="336" y2="256" stroke="#ffffff" stroke-width="8"/>
    <line x1="176" y1="320" x2="272" y2="320" stroke="#ffffff" stroke-width="8"/>
    <!-- Pen tip -->
    <circle cx="304" cy="304" r="24" fill="#ffffff"/>
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
