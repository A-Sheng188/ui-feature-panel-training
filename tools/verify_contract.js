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
    
    console.log('✅ 目录和文件结构检查通过！');
    
    // 检查demo数据格式
    const demoContent = fs.readFileSync('demo/demo.config.json', 'utf8');
    console.log('读取demo.config.json文件内容...');
    
    // 清理可能的BOM头
    const cleanedContent = demoContent.replace(/^\uFEFF/, '');
    
    // 检查JSON格式
    let demoData;
    try {
      demoData = JSON.parse(cleanedContent);
    } catch (jsonError) {
      console.error('JSON解析错误详情：', jsonError.message);
      console.error('错误位置：', jsonError.position);
      console.error('错误附近内容：', cleanedContent.substring(Math.max(0, jsonError.position - 20), Math.min(cleanedContent.length, jsonError.position + 20)));
      throw new Error(`JSON解析失败: ${jsonError.message}`);
    }
    
    if (!demoData.items || !Array.isArray(demoData.items)) {
      throw new Error('demo.config.json必须包含items数组');
    }
    
    console.log(`✅ 找到 ${demoData.items.length} 个数据项`);
    
    // 检查每个item的格式
    demoData.items.forEach((item, index) => {
      if (!item.id) throw new Error(`items[${index}]缺少id字段`);
      if (!item.title) throw new Error(`items[${index}]缺少title字段`);
      if (!item.status || !['active', 'disabled'].includes(item.status)) {
        throw new Error(`items[${index}]的status必须是"active"或"disabled"，当前为：${item.status}`);
      }
    });
    
    console.log('✅ 所有数据项格式检查通过！');
    console.log('✅ 契约校验通过！');
    return true;
    
  } catch (error) {
    console.error('❌ 契约校验失败:', error.message);
    console.error('请检查相关文件格式是否正确。');
    return false;
  }
}

// 如果是直接运行此脚本
if (require.main === module) {
  const success = verifyContract();
  process.exit(success ? 0 : 1);
}

module.exports = { verifyContract };
