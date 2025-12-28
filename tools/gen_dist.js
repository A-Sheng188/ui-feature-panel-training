// 生成 dist 目录的工具脚本
const fs = require('fs');
const path = require('path');

// 确保 dist 目录存在
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 生成 index.html
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feature Panel Demo</title>
    <link rel="stylesheet" href="app.css">
    <style>
        body { font-family: sans-serif; padding: 20px; }
        .placeholder { border: 2px dashed #ccc; padding: 40px; text-align: center; }
    </style>
</head>
<body>
    <h1>Feature Panel Demo</h1>
    <div class="placeholder">
        <h2>🚧 Feature Panel Coming Soon</h2>
        <p>This is a placeholder. Feature Panel will be generated here.</p>
        <p>Commit SHA: <code id="commit-sha">main</code></p>
    </div>
    <script src="app.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(distDir, 'index.html'), html);

// 生成空的 CSS 和 JS 文件
fs.writeFileSync(path.join(distDir, 'app.css'), '/* Feature Panel Styles */');
fs.writeFileSync(path.join(distDir, 'app.js'), '// Feature Panel JavaScript');

console.log('✅ Dist directory generated successfully.');
