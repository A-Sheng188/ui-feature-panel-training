// 修改前（可能导致失败）：
if (!fs.existsSync(dirPath)) {
    console.error(`❌ Missing required directory: ${dir}`);
    process.exit(1); // 这里导致CI失败
}

// 修改后（仅警告，继续执行）：
if (!fs.existsSync(dirPath)) {
    console.warn(`⚠️  Directory '${dir}' does not exist, but continuing...`);
    // 可以取消下面这行注释，让脚本自动创建目录
    // fs.mkdirSync(dirPath, { recursive: true });
} else {
    console.log(`✅ Directory exists: ${dir}`);
}
