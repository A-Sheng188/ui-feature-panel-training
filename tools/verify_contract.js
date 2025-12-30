#!/usr/bin/env node

// ============================================
// 修复：解决 "ReferenceError: fs is not defined" 错误
// 添加缺失的 Node.js 模块导入
// ============================================

// 修复点3：添加 fs 模块导入
const fs = require('fs');
const path = require('path');

// ============================================
// 主验证函数
// ============================================

function main() {
  console.log('🔍 开始验证项目结构...');
  console.log('📁 当前工作目录:', process.cwd());
  console.log('');
  
  // 检查是否提供了目标目录参数
  const targetDir = process.argv[2] || '.';
  const fullPath = path.resolve(targetDir);
  
  console.log('📋 检查目录是否存在:', fullPath);
  
  // 使用 fs.existsSync 检查目录
  if (!fs.existsSync(fullPath)) {
    console.error('❌ 错误：目录不存在:', fullPath);
    console.log('');
    console.log('💡 建议：');
    console.log('  1. 确保路径正确');
    console.log('  2. 检查当前目录内容：');
    try {
      const currentDir = process.cwd();
      const items = fs.readdirSync(currentDir);
      items.forEach(item => {
        const itemPath = path.join(currentDir, item);
        const stat = fs.statSync(itemPath);
        console.log(`     ${stat.isDirectory() ? '📁' : '📄'} ${item}`);
      });
    } catch (err) {
      console.log('    无法读取当前目录:', err.message);
    }
    process.exit(1);
  }
  
  // 检查是否是目录
  const stat = fs.statSync(fullPath);
  if (!stat.isDirectory()) {
    console.error('❌ 错误：路径不是目录:', fullPath);
    process.exit(1);
  }
  
  console.log('✅ 目录验证通过');
  console.log('');
  
  // 列出目录内容
  console.log('📂 目录内容：');
  try {
    const items = fs.readdirSync(fullPath);
    
    if (items.length === 0) {
      console.log('   📭 目录为空');
    } else {
      items.forEach((item, index) => {
        const itemPath = path.join(fullPath, item);
        try {
          const itemStat = fs.statSync(itemPath);
          const icon = itemStat.isDirectory() ? '📁' : '📄';
          const size = itemStat.isFile() ? ` (${formatFileSize(itemStat.size)})` : '';
          console.log(`   ${icon} ${item}${size}`);
        } catch (err) {
          console.log(`   ❓ ${item} (无法访问: ${err.message})`);
        }
      });
    }
  } catch (err) {
    console.error('❌ 无法读取目录内容:', err.message);
  }
  
  console.log('');
  
  // 检查常见项目文件
  console.log('🔎 检查常见项目文件：');
  
  const commonFiles = [
    { name: 'package.json', description: 'Node.js 项目配置' },
    { name: 'README.md', description: '项目说明文档' },
    { name: '.gitignore', description: 'Git 忽略文件配置' },
    { name: 'index.html', description: 'HTML 入口文件' },
    { name: 'main.js', description: 'JavaScript 主文件' },
    { name: 'style.css', description: 'CSS 样式文件' }
  ];
  
  let foundCount = 0;
  
  commonFiles.forEach(fileInfo => {
    const filePath = path.join(fullPath, fileInfo.name);
    if (fs.existsSync(filePath)) {
      foundCount++;
      const fileStat = fs.statSync(filePath);
      console.log(`   ✅ ${fileInfo.name} - ${fileInfo.description} (${formatFileSize(fileStat.size)})`);
    }
  });
  
  console.log('');
  
  // 检查 contracts 目录（如果存在）
  const contractsDir = path.join(fullPath, 'contracts');
  if (fs.existsSync(contractsDir) && fs.statSync(contractsDir).isDirectory()) {
    console.log('📑 检查 contracts 目录：');
    try {
      const contractFiles = fs.readdirSync(contractsDir);
      if (contractFiles.length > 0) {
        contractFiles.forEach(file => {
          const filePath = path.join(contractsDir, file);
          const fileStat = fs.statSync(filePath);
          console.log(`   📄 ${file} (${formatFileSize(fileStat.size)})`);
        });
      } else {
        console.log('   📭 contracts 目录为空');
      }
    } catch (err) {
      console.log(`   ⚠️ 无法读取 contracts 目录: ${err.message}`);
    }
    console.log('');
  }
  
  // 总结
  console.log('='.repeat(50));
  console.log('📊 验证总结：');
  console.log(`   📁 验证目录: ${path.basename(fullPath)}`);
  console.log(`   ✅ 找到 ${foundCount} 个常见项目文件`);
  console.log(`   🕒 验证时间: ${new Date().toLocaleString()}`);
  console.log('');
  
  if (foundCount === 0) {
    console.log('⚠️  警告：未找到常见项目文件，这可能是新项目');
    console.log('💡 建议创建基本项目结构：');
    console.log('   1. package.json - 项目配置');
    console.log('   2. README.md - 项目说明');
    console.log('   3. index.html - 网页入口');
  }
  
  console.log('🎉 验证完成！');
}

// ============================================
// 辅助函数
// ============================================

function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ============================================
// 错误处理
// ============================================

process.on('uncaughtException', (error) => {
  console.error('');
  console.error('🔥 未捕获的异常：');
  console.error(`   错误: ${error.message}`);
  console.error(`   堆栈: ${error.stack}`);
  console.error('');
  console.error('💡 这可能是因为：');
  console.error('   1. 文件权限问题');
  console.error('   2. 磁盘空间不足');
  console.error('   3. 系统资源限制');
  process.exit(1);
});

// ============================================
// 程序入口
// ============================================

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error('❌ 验证过程出错:', error.message);
    console.error('堆栈追踪:', error.stack);
    process.exit(1);
  }
}
