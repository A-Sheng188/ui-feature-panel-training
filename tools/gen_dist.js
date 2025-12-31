const fs = require('fs');
const path = require('path');

console.log('开始生成 dist 目录...');

const distDir = path.join(__dirname, '..', 'dist');

// 确保dist目录存在
if (!fs.existsSync(distDir)) {
  console.log('创建 dist 目录...');
  fs.mkdirSync(distDir, { recursive: true });
}

// 创建最简单的HTML文件
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>FeaturePanel - 测试页面</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }
        h1 { color: #333; }
        .card { border: 1px solid #ccc; padding: 15px; margin: 10px; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>FeaturePanel 功能面板</h1>
    <p>这是一个测试页面，证明dist目录可以正常生成。</p>
    
    <div class="card">
        <h3>测试卡片 1</h3>
        <p>状态: Active</p>
    </div>
    
    <div class="card">
        <h3>测试卡片 2</h3>
        <p>状态: Disabled</p>
    </div>
    
    <p>生成时间: ${new Date().toLocaleString('zh-CN')}</p>
</body>
</html>
`;

// 写入文件
fs.writeFileSync(path.join(distDir, 'index.html'), htmlContent);
fs.writeFileSync(path.join(distDir, 'app.js'), '// FeaturePanel JS');
fs.writeFileSync(path.join(distDir, 'app.css'), '/* FeaturePanel CSS */');

console.log('✅ 成功生成 dist 目录！');
console.log('生成了: index.html, app.js, app.css');
