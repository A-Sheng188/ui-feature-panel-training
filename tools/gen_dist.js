// 初始版本，只创建一个简单的HTML文件
const fs = require('fs');
const path = require('path');

const distDir = './dist';
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <title>FeaturePanel Training</title>
</head>
<body>
    <h1>FeaturePanel Project Initialized</h1>
    <p>CI/CD Pipeline is working. Next step: Implement the panel.</p>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'index.html'), htmlContent);
console.log('✅ dist/index.html generated');
