const fs = require('fs');
const path = require('path');

function verifyContract() {
  console.log('开始契约校验...');
  
  try {
    // 检查目录结构
    const requiredDirs = [
      '.github/workflows',
      'src/feature-panel',
      'demo',
      'dist',
      'tools',
      'tests'
    ];
    
    for (const dir of requiredDirs) {
      if (!fs.existsSync(dir)) {
        throw new Error(`缺少必需目录: ${dir}`);
      }
    }
    
    // 检查必需文件
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
      if (!fs.existsSync(file)) {
        throw new Error(`缺少必需文件: ${file}`);
      }
    }
    
    // 检查demo数据格式
    const demoData = JSON.parse(fs.readFileSync('demo/demo.config.json', 'utf8'));
    
    if (!demoData.items || !Array.isArray(demoData.items)) {
      throw new Error('demo.config.json必须包含items数组');
    }
    
    // 检查每个item的格式
    demoData.items.forEach((item, index) => {
      if (!item.id) throw new Error(`items[${index}]缺少id字段`);
      if (!item.title) throw new Error(`items[${index}]缺少title字段`);
      if (!item.status || !['active', 'disabled'].includes(item.status)) {
        throw new Error(`items[${index}]的status必须是active或disabled`);
      }
    });
    
    console.log('✅ 契约校验通过！');
    return true;
    
  } catch (error) {
    console.error('❌ 契约校验失败:', error.message);
    return false;
  }
}

// 如果是直接运行此脚本
if (require.main === module) {
  const success = verifyContract();
  process.exit(success ? 0 : 1);
}

module.exports = { verifyContract };
