# FeaturePanel 契约说明

## 数据结构

### Item 对象
```javascript
{
  id: string | number,
  title: string,
  description?: string,
  status: 'active' | 'disabled'
}
