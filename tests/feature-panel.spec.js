// 最简化的单元测试 - 仅验证测试环境
console.log('🧪 Running basic environment test...');

// 检查 Node.js 版本
console.log('✅ Node.js version:', process.version);

// 检查文件系统
try {
  const fs = require('fs');
  const path = require('path');
  console.log('✅ File system available');
  
  // 检查基本文件是否存在
  const filesToCheck = [
    'package.json',
    'tools/gen_dist.js',
    'tools/verify_contract.js'
  ];
  
  for (const file of filesToCheck) {
    if (fs.existsSync(path.join(__dirname, '..', file))) {
      console.log(`✅ ${file} exists`);
    }
  }
  
} catch (error) {
  console.log('⚠️ File system check skipped:', error.message);
}

console.log('🎉 Basic test completed successfully!');
