// 契约验证 - 仅信息性检查
const fs = require('fs');
const path = require('path');

console.log('📋 Project structure verification\n');

const dirs = ['src/feature-panel', 'demo', 'tools', 'tests', '.github/workflows', 'dist'];
const files = [
  'src/feature-panel/feature-panel.js',
  'src/feature-panel/feature-panel.css', 
  'src/feature-panel/types.md',
  'demo/demo.config.json',
  'tools/gen_dist.js',
  'tools/verify_contract.js',
  'tests/feature-panel.spec.js'
];

console.log('Directories:');
dirs.forEach(dir => {
  const exists = fs.existsSync(path.join(__dirname, '..', dir));
  console.log(`  ${exists ? '✅' : '⚠️'} ${dir}`);
});

console.log('\nFiles:');
files.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, '..', file));
  console.log(`  ${exists ? '✅' : '⚠️'} ${file}`);
});

console.log('\n📝 Verification complete (non-blocking)');
process.exit(0);
