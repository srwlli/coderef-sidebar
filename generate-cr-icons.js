// Generate all required icon sizes from cr-logo.png
// Run with: node generate-cr-icons.js

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_LOGO = path.join(__dirname, 'cr-logo.png');

// Icon sizes needed
const SIZES = {
  // PWA icons
  pwa192: { width: 192, height: 192, output: 'public/icons/icon-192.png' },
  pwa512: { width: 512, height: 512, output: 'public/icons/icon-512.png' },

  // Apple touch icon
  apple180: { width: 180, height: 180, output: 'public/apple-touch-icon.png' },

  // App icon for Next.js
  appIcon: { width: 512, height: 512, output: 'src/app/icon.png' },

  // Favicon sizes
  favicon16: { width: 16, height: 16, output: 'public/icons/favicon-16.png' },
  favicon32: { width: 32, height: 32, output: 'public/icons/favicon-32.png' },
  favicon48: { width: 48, height: 48, output: 'public/icons/favicon-48.png' },
};

async function generateIcons() {
  console.log('Starting icon generation from cr-logo.png...\n');

  // Check if source exists
  if (!fs.existsSync(SOURCE_LOGO)) {
    console.error('Error: cr-logo.png not found in project root!');
    process.exit(1);
  }

  // Generate all sizes
  for (const [name, config] of Object.entries(SIZES)) {
    try {
      await sharp(SOURCE_LOGO)
        .resize(config.width, config.height, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .png()
        .toFile(path.join(__dirname, config.output));

      console.log(
        `✓ Generated ${config.output} (${config.width}x${config.height})`
      );
    } catch (error) {
      console.error(`✗ Failed to generate ${name}:`, error.message);
    }
  }

  // Generate favicon.ico from the 32x32 version
  try {
    // For ICO, we'll use the 32x32 PNG and rename it
    // (true .ico generation requires additional libraries)
    const favicon32Path = path.join(__dirname, 'public/icons/favicon-32.png');
    const faviconIcoPath = path.join(__dirname, 'src/app/favicon.ico');

    await sharp(SOURCE_LOGO)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .png()
      .toFile(faviconIcoPath);

    console.log(`✓ Generated src/app/favicon.ico (32x32)`);
  } catch (error) {
    console.error('✗ Failed to generate favicon.ico:', error.message);
  }

  console.log('\n✓ All icons generated successfully!');
  console.log('\nNext steps:');
  console.log('1. Update manifest.json with new icon paths');
  console.log('2. Verify icons appear correctly in browser and PWA');
}

generateIcons().catch(console.error);
