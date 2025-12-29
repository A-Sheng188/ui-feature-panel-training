// 基础单元测试
console.log('🧪 Running FeaturePanel tests...');

// 简单的测试框架
const test = (name, fn) => {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (error) {
    console.error(`❌ ${name}: ${error.message}`);
    process.exit(1);
  }
};

// 测试 FeaturePanel 是否存在
test('FeaturePanel class exists', () => {
  if (typeof FeaturePanel === 'undefined') {
    throw new Error('FeaturePanel class not defined');
  }
});

// 测试是否能创建实例
test('Can create FeaturePanel instance', () => {
  const panel = new FeaturePanel({ items: [] });
  if (!panel) {
    throw new Error('Failed to create instance');
  }
});

// 测试是否有 render 方法
test('FeaturePanel has render method', () => {
  const panel = new FeaturePanel({ items: [] });
  if (typeof panel.render !== 'function') {
    throw new Error('render method missing');
  }
});

console.log('🎉 All tests passed!');
