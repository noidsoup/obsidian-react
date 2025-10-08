#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const matter = require('gray-matter');

/**
 * Prebuild script - runs before Next.js build
 * Automatically imports vault.zip if it exists
 */

function isMarkdownFile(filePath) {
  const pathParts = filePath.split(path.sep);
  if (pathParts.some(part => part.startsWith('.'))) return false;
  if (filePath.includes('__MACOSX')) return false;
  if (!filePath.endsWith('.md')) return false;
  return true;
}

function importVault() {
  const zipPath = path.join(process.cwd(), 'vault.zip');
  const outputDir = path.join(process.cwd(), 'vault');

  // Check if vault.zip exists
  if (!fs.existsSync(zipPath)) {
    console.log('⚠️  No vault.zip found - using existing vault folder');
    
    // Check if vault folder exists and has files
    if (fs.existsSync(outputDir)) {
      const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.md'));
      console.log(`✅ Found ${files.length} existing markdown files in vault/`);
    } else {
      console.log('⚠️  No vault/ folder found - will create empty site');
      fs.mkdirSync(outputDir, { recursive: true });
    }
    return;
  }

  console.log('📦 Found vault.zip - importing...');

  try {
    // Clear existing vault folder
    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });

    // Extract zip
    const zip = new AdmZip(zipPath);
    const zipEntries = zip.getEntries();
    
    let imported = 0;

    for (const entry of zipEntries) {
      if (entry.isDirectory) continue;
      if (!isMarkdownFile(entry.entryName)) continue;

      const content = entry.getData().toString('utf8');
      const { data, content: markdown } = matter(content);
      
      const filename = path.basename(entry.entryName);
      const outputPath = path.join(outputDir, filename);
      
      // Reconstruct file with frontmatter
      let output = '';
      if (Object.keys(data).length > 0) {
        output += '---\n';
        for (const [key, value] of Object.entries(data)) {
          if (Array.isArray(value)) {
            output += `${key}: [${value.join(', ')}]\n`;
          } else {
            output += `${key}: ${value}\n`;
          }
        }
        output += '---\n\n';
      }
      output += markdown;
      
      fs.writeFileSync(outputPath, output, 'utf8');
      imported++;
    }

    console.log(`✅ Imported ${imported} markdown files from vault.zip`);
    console.log(`📁 Files ready in vault/ folder`);

  } catch (error) {
    console.error('❌ Error importing vault:', error.message);
    process.exit(1);
  }
}

// Run import
importVault();

