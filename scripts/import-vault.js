#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const matter = require('gray-matter');

/**
 * Import a vault zip file and extract to /vault folder
 * Usage: node scripts/import-vault.js path/to/vault.zip
 */

function isMarkdownFile(filePath) {
  const pathParts = filePath.split(path.sep);
  
  // Skip hidden files/folders
  if (pathParts.some(part => part.startsWith('.'))) {
    return false;
  }
  
  // Skip __MACOSX folder
  if (filePath.includes('__MACOSX')) {
    return false;
  }
  
  // Only process markdown files
  if (!filePath.endsWith('.md')) {
    return false;
  }
  
  return true;
}

function importVault(zipPath, outputDir = 'vault') {
  // Validate zip file exists
  if (!fs.existsSync(zipPath)) {
    console.error(`❌ Error: File not found: ${zipPath}`);
    process.exit(1);
  }

  console.log(`📦 Importing vault from: ${zipPath}`);
  console.log(`📁 Output directory: ${outputDir}`);
  console.log('');

  try {
    // Clear existing vault folder
    if (fs.existsSync(outputDir)) {
      console.log('🗑️  Clearing existing vault folder...');
      fs.rmSync(outputDir, { recursive: true });
    }

    // Create fresh vault directory
    fs.mkdirSync(outputDir, { recursive: true });

    // Extract zip
    const zip = new AdmZip(zipPath);
    const zipEntries = zip.getEntries();
    
    let imported = 0;
    let skipped = 0;

    console.log('📝 Processing markdown files...');
    console.log('');

    for (const entry of zipEntries) {
      // Skip directories
      if (entry.isDirectory) {
        continue;
      }

      // Skip non-markdown files
      if (!isMarkdownFile(entry.entryName)) {
        skipped++;
        continue;
      }

      // Get content
      const content = entry.getData().toString('utf8');
      
      // Parse frontmatter
      const { data, content: markdown } = matter(content);
      
      // Get filename
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
      
      // Write file
      fs.writeFileSync(outputPath, output, 'utf8');
      
      console.log(`  ✅ ${filename}`);
      imported++;
    }

    console.log('');
    console.log('─────────────────────────────────');
    console.log(`✅ Import complete!`);
    console.log(`   Imported: ${imported} files`);
    console.log(`   Skipped:  ${skipped} files`);
    console.log('─────────────────────────────────');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Review files:  ls vault/');
    console.log('  2. Test locally:  npm run dev');
    console.log('  3. Commit:        git add vault/');
    console.log('  4. Push:          git push');
    console.log('  5. Netlify auto-deploys!');
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Main
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node scripts/import-vault.js <path-to-vault.zip>');
  console.log('');
  console.log('Example:');
  console.log('  node scripts/import-vault.js ~/Downloads/MyVault.zip');
  console.log('');
  process.exit(1);
}

const zipPath = args[0];
importVault(zipPath);

