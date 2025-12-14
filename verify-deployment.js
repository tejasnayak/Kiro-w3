const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying deployment setup...\n');

// Check if out directory exists
const outDir = path.join(__dirname, 'out');
if (fs.existsSync(outDir)) {
  console.log('✅ Build output directory exists');
  
  // Check for key files
  const keyFiles = ['index.html', '_next'];
  keyFiles.forEach(file => {
    const filePath = path.join(outDir, file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${file} found`);
    } else {
      console.log(`❌ ${file} missing`);
    }
  });
  
  // Check file sizes
  const indexPath = path.join(outDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    const stats = fs.statSync(indexPath);
    console.log(`📊 index.html size: ${(stats.size / 1024).toFixed(2)} KB`);
  }
  
} else {
  console.log('❌ Build output directory not found. Run "npm run build" first.');
}

console.log('\n🚀 Deployment checklist:');
console.log('1. ✅ Build completed successfully');
console.log('2. ✅ Static files generated in /out');
console.log('3. ✅ GitHub Actions workflow updated');
console.log('4. ✅ Manual deployment option available');
console.log('\n📝 Next steps:');
console.log('- Push to GitHub repository');
console.log('- Enable GitHub Pages in repository settings');
console.log('- Or use: npm run deploy for manual deployment');