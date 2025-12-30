#!/usr/bin/env node

/**
 * 合约验证脚本
 * 用于验证合约文件结构和内容
 * 修复：添加了缺少的fs模块导入
 */

// ========== 修复开始 ==========
// 修复ReferenceError: fs is not defined 错误
// 添加必要的Node.js模块导入
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
// ========== 修复结束 ==========

// 配置
const CONFIG = {
  requiredFiles: [
    { name: 'abi.json', description: '合约ABI接口定义' },
    { name: 'addresses.json', description: '合约地址配置' },
    { name: 'metadata.json', description: '合约元数据' }
  ],
  optionalFiles: [
    { name: 'README.md', description: '说明文档' },
    { name: 'LICENSE', description: '许可证文件' },
    { name: 'CHANGELOG.md', description: '变更日志' },
    { name: 'package.json', description: '项目配置' }
  ],
  allowedExtensions: ['.json', '.md', '.txt', '.js', '.ts', '.sol']
};

/**
 * 主验证函数
 */
async function main() {
  console.log('🔍 开始合约文件验证...\n');
  
  // 获取目标目录
  const targetDir = process.argv[2] || './contracts';
  const absolutePath = path.resolve(process.cwd(), targetDir);
  
  console.log(`📁 验证目录: ${absolutePath}`);
  
  // 检查目录是否存在
  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ 错误: 目录不存在: ${absolutePath}`);
    console.log('\n💡 建议:');
    console.log('   1. 创建 contracts 目录: mkdir contracts');
    console.log('   2. 或者在命令行指定目录: node verify_contract.js ./path/to/contracts');
    process.exit(1);
  }
  
  // 检查是否为目录
  const stats = fs.statSync(absolutePath);
  if (!stats.isDirectory()) {
    console.error(`❌ 错误: 路径不是目录: ${absolutePath}`);
    process.exit(1);
  }
  
  // 验证必需文件
  console.log('\n📋 验证必需文件:');
  const missingFiles = [];
  
  for (const fileInfo of CONFIG.requiredFiles) {
    const filePath = path.join(absolutePath, fileInfo.name);
    
    if (fs.existsSync(filePath)) {
      try {
        // 验证JSON文件格式
        if (filePath.endsWith('.json')) {
          const content = fs.readFileSync(filePath, 'utf8');
          const parsed = JSON.parse(content);
          
          console.log(`   ✅ ${fileInfo.name}`);
          console.log(`      📄 ${fileInfo.description}`);
          console.log(`      📊 包含 ${typeof parsed === 'object' ? Object.keys(parsed).length : 'N/A'} 个键`);
          
          // 特殊验证
          if (fileInfo.name === 'abi.json') {
            if (Array.isArray(parsed)) {
              console.log(`      🔧 ABI包含 ${parsed.length} 个函数/事件`);
            }
          }
        } else {
          console.log(`   ✅ ${fileInfo.name} (非JSON文件)`);
        }
      } catch (error) {
        console.error(`   ❌ ${fileInfo.name}: JSON解析错误 - ${error.message}`);
        missingFiles.push(fileInfo.name);
      }
    } else {
      console.error(`   ❌ ${fileInfo.name}: 文件缺失`);
      missingFiles.push(fileInfo.name);
    }
  }
  
  // 检查可选文件
  console.log('\n📄 可选文件检查:');
  let optionalCount = 0;
  
  for (const fileInfo of CONFIG.optionalFiles) {
    const filePath = path.join(absolutePath, fileInfo.name);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`   📄 ${fileInfo.name} (${(stats.size / 1024).toFixed(2)} KB)`);
      optionalCount++;
    }
  }
  
  if (optionalCount === 0) {
    console.log('   ℹ️ 未找到可选文件');
  }
  
  // 目录结构分析
  console.log('\n📂 目录结构分析:');
  try {
    const items = fs.readdirSync(absolutePath);
    console.log(`   总文件数: ${items.length}`);
    
    // 按类型分组
    const fileTypes = {};
    items.forEach(item => {
      const ext = path.extname(item).toLowerCase() || '无扩展名';
      fileTypes[ext] = (fileTypes[ext] || 0) + 1;
    });
    
    Object.entries(fileTypes).forEach(([ext, count]) => {
      console.log(`     ${ext}: ${count}个`);
    });
    
    // 列出所有文件
    if (items.length <= 20) {
      console.log('\n   文件列表:');
      items.forEach((item, index) => {
        const itemPath = path.join(absolutePath, item);
        const itemStats = fs.statSync(itemPath);
        const icon = itemStats.isDirectory() ? '📁' : '📄';
        console.log(`     ${icon} ${item}`);
      });
    }
  } catch (error) {
    console.error(`   ⚠️ 无法读取目录内容: ${error.message}`);
  }
  
  // 验证结果
  console.log('\n' + '='.repeat(50));
  
  if (missingFiles.length === 0) {
    console.log('🎉 验证成功! 所有必需文件都存在且格式正确。');
    console.log('\n下一步建议:');
    console.log('   1. 运行测试: npm test');
    console.log('   2. 构建项目: npm run build');
    console.log('   3. 部署到GitHub Pages');
    
    // 生成摘要
    console.log('\n📊 验证摘要:');
    console.log(`   ✅ 必需文件: ${CONFIG.requiredFiles.length}/${CONFIG.requiredFiles.length}`);
    console.log(`   📄 可选文件: ${optionalCount}/${CONFIG.optionalFiles.length}`);
    console.log(`   📁 目录大小: ${getDirectorySize(absolutePath)}`);
    
    process.exit(0);
  } else {
    console.error(`❌ 验证失败! 缺失 ${missingFiles.length} 个必需文件。`);
    console.log('\n缺失文件:');
    missingFiles.forEach(file => {
      console.log(`   - ${file}`);
    });
    
    console.log('\n🛠️ 修复建议:');
    console.log(`   1. 在 ${absolutePath} 目录中创建缺失文件`);
    console.log(`   2. 或运行初始化脚本: npm run init:contracts`);
    console.log(`   3. 检查文件权限: ls -la ${absolutePath}`);
    
    process.exit(1);
  }
}

/**
 * 获取目录大小
 */
function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  function scanDirectory(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    items.forEach(item => {
      const itemPath = path.join(currentPath, item);
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory()) {
        scanDirectory(itemPath);
      } else {
        totalSize += stats.size;
      }
    });
  }
  
  try {
    scanDirectory(dirPath);
    
    if (totalSize < 1024) {
      return `${totalSize} B`;
    } else if (totalSize < 1024 * 1024) {
      return `${(totalSize / 1024).toFixed(2)} KB`;
    } else {
      return `${(totalSize / (1024 * 1024)).toFixed(2)} MB`;
    }
  } catch (error) {
    return '无法计算';
  }
}

/**
 * 错误处理
 */
process.on('uncaughtException', (error) => {
  console.error('\n🔥 未处理的错误:');
  console.error(`   消息: ${error.message}`);
  console.error(`   堆栈: ${error.stack}`);
  console.log('\n💡 常见问题解决:');
  console.log('   1. 检查Node.js版本: node --version');
  console.log('   2. 检查文件权限');
  console.log('   3. 确保所有依赖已安装');
  process.exit(1);
});

// 运行主函数
if (require.main === module) {
  main().catch(error => {
    console.error('验证过程出错:', error);
    process.exit(1);
  });
}

module.exports = { main };
