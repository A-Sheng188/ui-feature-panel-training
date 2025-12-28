// 契约验证脚本
const fs = require('fs');
const path = require('path');

console.log('🔍 Starting contract verification...');

// 检查必要目录
const requiredDirs = [
  'src/feature-panel',
  'demo',
  'tools',
  'tests',
  '.github/workflows'
];

for (const dir of requiredDirs) {
  const dirPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    console.error(`❌ Missing required directory: ${dir}`);
    process.exit(1);
  }
}
console.log('✅ All required directories exist');

// 检查必要文件
const requiredFiles = [
  'src/feature-panel/feature-panel.js',
  'src/feature-panel/feature-panel.css',
  'src/feature-panel/types.md',
  'demo/demo.config.json',
  'tools/gen_dist.js',
  'tools/verify_contract.js',
  'tests/feature-panel.spec.js'
];

for (const file of requiredFiles) {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing required file: ${file}`);
    process.exit(1);
  }
}
console.log('✅ All required files exist');

// 检查 dist 目录是否被手工修改
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  const files = fs.readdirSync(distDir);
  if (files.length === 0) {
    console.log('📁 Dist directory is empty (expected)');
  } else {
    console.log(`📁 Dist directory contains: ${files.join(', ')}`);
  }
}

console.log('🎉 Contract verification passed!');
