import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);

// Configuration
const IMG_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/optimized-images');
const WIDTHS = [320, 480, 640, 768, 1024, 1280, 1536];

// Ensure output directory exists
async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

// Process a single image
async function processImage(filePath, outputDir) {
  const fileName = path.basename(filePath);
  const ext = path.extname(fileName).toLowerCase();
  const baseName = path.basename(fileName, ext);
  const outputExt = '.webp'; // Convert all to webp for better compression

  // Skip if not an image
  if (!['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
    return;
  }

  console.log(`Processing ${fileName}...`);

  // Process each width
  for (const width of WIDTHS) {
    const outputPath = path.join(
      outputDir,
      `${baseName}-${width}w${outputExt}`
    );

    try {
      await sharp(filePath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`  → Created ${path.basename(outputPath)}`);
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  }

  // Create a default size (original size)
  const defaultOutputPath = path.join(outputDir, `${baseName}${outputExt}`);
  try {
    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(defaultOutputPath);
    console.log(`  → Created ${path.basename(defaultOutputPath)}`);
  } catch (error) {
    console.error(`Error creating default size for ${filePath}:`, error);
  }
}

// Recursively process directory
async function processDirectory(dir, outputDir) {
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      const newOutputDir = path.join(outputDir, file);
      await ensureDir(newOutputDir);
      await processDirectory(filePath, newOutputDir);
    } else {
      await processImage(filePath, outputDir);
    }
  }
}

// Main function
async function main() {
  try {
    console.log('Starting image optimization...');
    await ensureDir(OUTPUT_DIR);
    await processDirectory(IMG_DIR, OUTPUT_DIR);
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error during image optimization:', error);
    process.exit(1);
  }
}

main();
