# FeaturePanel 功能面板 - GitHub Workflow Only 实现

## 最终交付目标
https://A-Sheng188.github.io/ui-feature-panel-training/

## 功能要求
- 顶部筛选：关键词搜索 + 状态筛选（All/Active/Disabled）
- 卡片列表：每个卡片含 title、description、status
- 交互：点击卡片打开右侧Drawer详情面板
- 四种状态：loading、error、empty、normal
- 可复用：支持外部数据、回调、样式定制

## 目录结构（强制）

ui-feature-panel-training/
├── .github/workflows/
│   ├── ci.yml          # CI门禁
│   ├── gen.yml         # 生成dist
│   ├── pages.yml       # 部署Pages
│   └── release.yml     # 发布审批
├── src/feature-panel/
│   ├── feature-panel.js
│   ├── feature-panel.css
│   └── types.md
├── demo/demo.config.json
├── dist/              # 禁止手工修改
├── tools/
│   ├── gen_dist.js
│   └── verify_contract.js
└── tests/feature-panel.spec.js

## 工作流程
1. 修改代码 → 提交到main分支
2. 手动运行gen.yml工作流
3. 等待CI门禁检查
4. 通过后自动部署到Pages

## 重要规则
- 禁止本地运行构建命令
- 禁止手工修改dist目录
- CI不绿 = 不存在
- Pages打不开 = 未交付

## 状态徽章
![CI](https://github.com/A-Sheng188/ui-feature-panel-training/actions/workflows/ci.yml/badge.svg)
![Pages](https://github.com/A-Sheng188/ui-feature-panel-training/actions/workflows/pages.yml/badge.svg)
