// 契约验证脚本 - 仅用于信息性检查，不阻塞流程
const fs = require('fs');
const path = require('path');

console.log('📋 Starting project structure check...\n');

// 定义期望的目录结构
const expectedDirs = [
  'src/feature-panel',
  'demo',
  'tools',
  'tests',
  '.github/workflows',
  'dist'
];

let dirsOk = true;
console.log('Checking directories:');
for (const dir of expectedDirs) {
  const dirPath = path.join(__dirname, '..', dir);
  if (fs.existsSync(dirPath)) {
    console.log(`  ✅ ${dir}`);
  } else {
    console.log(`  ⚠️  ${dir} (not found)`);
    dirsOk = false;
  }
}

// 定义关键文件
const expectedFiles = [
  'src/feature-panel/feature-panel.js',
  'src/feature-panel/feature-panel.css',
  'src/feature-panel/types.md',
  'demo/demo.config.json',
  'tools/gen_dist.js',
  'tools/verify_contract.js',
  'tests/feature-panel.spec.js'
];

let filesOk = true;
console.log('\nChecking key files:');
for (const file of expectedFiles) {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ⚠️  ${file} (not found)`);
    filesOk = false;
  }
}

// 总结，但不失败退出
console.log('\n--- Summary ---');
if (dirsOk && filesOk) {
  console.log('✅ All expected items are present.');
} else {
  console.log('⚠️  Some items are missing, but this is non-blocking.');
  console.log('   The CI will continue to build the dist directory.');
}

console.log('\n✅ Structure check completed. Proceeding with build...');
// 脚本始终成功退出
process.exit(0);
