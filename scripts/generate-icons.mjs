import sharp from "sharp";
import { writeFileSync } from "fs";

// Base SVG: dark background, amber accent "MB" monogram
// 512x512 canvas
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="64" fill="#111111"/>
  <text
    x="256"
    y="300"
    font-family="Georgia, serif"
    font-size="220"
    font-weight="700"
    text-anchor="middle"
    fill="#d97706"
    letter-spacing="-8"
  >MB</text>
</svg>`.trim();

// Maskable: full bleed background, content in safe zone (center 80%)
// Safe zone = inner 80% = content radius ~205px, so font-size scaled down
const maskableSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#111111"/>
  <text
    x="256"
    y="300"
    font-family="Georgia, serif"
    font-size="180"
    font-weight="700"
    text-anchor="middle"
    fill="#d97706"
    letter-spacing="-6"
  >MB</text>
</svg>`.trim();

// Favicon 32x32: simpler, single letter or smaller text
const faviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#111111"/>
  <text
    x="16"
    y="22"
    font-family="Georgia, serif"
    font-size="16"
    font-weight="700"
    text-anchor="middle"
    fill="#d97706"
  >M</text>
</svg>`.trim();

async function generate() {
  const iconBuf = Buffer.from(iconSvg);
  const maskableBuf = Buffer.from(maskableSvg);
  const faviconBuf = Buffer.from(faviconSvg);

  await sharp(iconBuf)
    .resize(512, 512)
    .png()
    .toFile("public/icons/icon-512.png");
  console.log("✓ icon-512.png");

  await sharp(iconBuf)
    .resize(192, 192)
    .png()
    .toFile("public/icons/icon-192.png");
  console.log("✓ icon-192.png");

  await sharp(maskableBuf)
    .resize(512, 512)
    .png()
    .toFile("public/icons/icon-maskable-512.png");
  console.log("✓ icon-maskable-512.png");

  // Apple touch icon: 180x180
  await sharp(iconBuf)
    .resize(180, 180)
    .png()
    .toFile("public/apple-touch-icon.png");
  console.log("✓ apple-touch-icon.png");

  // Favicon 32x32
  await sharp(faviconBuf)
    .resize(32, 32)
    .png()
    .toFile("public/favicon-32x32.png");
  console.log("✓ favicon-32x32.png");

  console.log("\nAll icons generated.");
}

generate().catch((e) => {
  console.error(e);
  process.exit(1);
});
