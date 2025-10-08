#!/usr/bin/env node

/**
 * Image Optimization Script for Blade and Barrel
 *
 * Generates responsive WebP and optimized JPG versions of hero image
 * Target sizes: mobile (640px), tablet (1024px), desktop (1920px)
 * Quality targets: WebP < 200KB, JPG < 300KB
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Configuration
const CONFIG = {
  inputDir: path.join(projectRoot, 'public', 'images'),
  outputDir: path.join(projectRoot, 'public', 'images'),
  sizes: {
    mobile: { width: 640, label: 'mobile' },
    tablet: { width: 1024, label: 'tablet' },
    desktop: { width: 1920, label: 'desktop' },
  },
  quality: {
    webp: 82, // Target: < 200KB
    jpeg: 87, // Target: < 300KB
  },
};

/**
 * Create directory structure
 */
async function createDirectoryStructure() {
  console.log('📁 Creating directory structure...');

  const dirs = [
    path.join(CONFIG.outputDir, 'hero'),
    path.join(CONFIG.outputDir, 'branding'),
    path.join(CONFIG.outputDir, 'icons'),
  ];

  for (const dir of dirs) {
    await fs.mkdir(dir, { recursive: true });
    console.log(`   ✓ Created ${path.relative(projectRoot, dir)}`);
  }
}

/**
 * Optimize and generate responsive images
 */
async function optimizeHeroImage() {
  console.log('\n🖼️  Optimizing hero image...');

  const inputPath = path.join(CONFIG.inputDir, 'hero.jpg');
  const outputDir = path.join(CONFIG.outputDir, 'hero');

  // Check if input file exists
  try {
    await fs.access(inputPath);
  } catch {
    console.error(`   ✗ Error: hero.jpg not found at ${inputPath}`);
    return;
  }

  const originalStats = await fs.stat(inputPath);
  console.log(`   Original size: ${(originalStats.size / 1024).toFixed(1)}KB`);

  // Generate responsive versions
  for (const [key, config] of Object.entries(CONFIG.sizes)) {
    const { width, label } = config;

    // Generate WebP version
    const webpPath = path.join(outputDir, `hero-${label}.webp`);
    await sharp(inputPath)
      .resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({
        quality: CONFIG.quality.webp,
        effort: 6, // Higher effort = better compression
      })
      .toFile(webpPath);

    const webpStats = await fs.stat(webpPath);
    console.log(`   ✓ ${label} WebP (${width}px): ${(webpStats.size / 1024).toFixed(1)}KB`);

    // Generate optimized JPG version
    const jpgPath = path.join(outputDir, `hero-${label}.jpg`);
    await sharp(inputPath)
      .resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .jpeg({
        quality: CONFIG.quality.jpeg,
        mozjpeg: true, // Use mozjpeg for better compression
      })
      .toFile(jpgPath);

    const jpgStats = await fs.stat(jpgPath);
    console.log(`   ✓ ${label} JPG (${width}px): ${(jpgStats.size / 1024).toFixed(1)}KB`);
  }

  // Copy original as fallback
  const fallbackPath = path.join(outputDir, 'hero.jpg');
  await sharp(inputPath)
    .jpeg({
      quality: CONFIG.quality.jpeg,
      mozjpeg: true,
    })
    .toFile(fallbackPath);

  const fallbackStats = await fs.stat(fallbackPath);
  console.log(`   ✓ fallback JPG (optimized): ${(fallbackStats.size / 1024).toFixed(1)}KB`);
}

/**
 * Move logo to branding folder
 */
async function organizeBrandingAssets() {
  console.log('\n🎨 Organizing branding assets...');

  const logoSrc = path.join(CONFIG.inputDir, 'logo.svg');
  const logoDest = path.join(CONFIG.outputDir, 'branding', 'logo.svg');

  try {
    await fs.access(logoSrc);
    await fs.copyFile(logoSrc, logoDest);
    console.log(`   ✓ Copied logo.svg to branding/`);
  } catch {
    console.log(`   ℹ️  logo.svg not found or already moved`);
  }
}

/**
 * Generate optimization report
 */
async function generateReport() {
  console.log('\n📊 Optimization Report:');
  console.log('='.repeat(50));

  const heroDir = path.join(CONFIG.outputDir, 'hero');
  const files = await fs.readdir(heroDir);

  let totalSize = 0;
  for (const file of files) {
    const filePath = path.join(heroDir, file);
    const stats = await fs.stat(filePath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    totalSize += stats.size;

    const status = file.endsWith('.webp')
      ? (stats.size < 200 * 1024 ? '✓' : '⚠️')
      : (stats.size < 300 * 1024 ? '✓' : '⚠️');

    console.log(`   ${status} ${file.padEnd(25)} ${sizeKB.padStart(8)}KB`);
  }

  console.log('='.repeat(50));
  console.log(`   Total: ${(totalSize / 1024).toFixed(1)}KB`);
  console.log('\n✅ Image optimization complete!\n');
}

/**
 * Main execution
 */
async function main() {
  console.log('\n🚀 Starting image optimization for Blade and Barrel\n');

  try {
    await createDirectoryStructure();
    await optimizeHeroImage();
    await organizeBrandingAssets();
    await generateReport();
  } catch (error) {
    console.error('\n❌ Error during optimization:', error);
    process.exit(1);
  }
}

main();
