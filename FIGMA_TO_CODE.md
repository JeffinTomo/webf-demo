# Figma 设计稿转代码工作流程

## 🚀 快速参考

| 方法 | 精确度 | 速度 | 适用场景 |
|-----|--------|------|----------|
| [复制 CSS 规范](#方法-1-复制-css-规范推荐) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 精确实现单个组件 |
| [截图 + 描述](#方法-2-截图--ai-视觉分析) | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 快速原型，整体布局 |
| [复制 Layer 链接](#方法-3-获取-layer-的唯一链接) | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 团队协作，设计追溯 |
| [Figma Dev Mode](#方法-4-figma-dev-mode需要付费) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 专业开发，代码片段 |
| [Figma to Code 插件](#方法-5-figma-to-code-插件) | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 快速生成初始代码 |
| [设计系统文档](#方法-6-设计系统文档化) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 大型项目，保持一致性 |

---

## 方法 1: 复制 CSS 规范（推荐）⭐

### 步骤：
1. 在 Figma 中选中要实现的**特定 Layer**
2. 右侧面板切换到 **Inspect** 标签（如果看不到，点击右上角 `<>` 图标）
3. 复制所有 CSS 属性和设计规范
4. 同时记录 **Layer 名称**和**父级结构**
5. 粘贴到 Cursor 对话中，并 @ 对应的组件文件

### 示例：
```
@webf-demo/code/src/components/my-component/index.tsx 

请实现以下 Layer 的设计：

**Layer Info:**
- Name: invite-card-header
- Parent: invite-section > Frame 2147224113
- Type: Auto Layout (Horizontal)

**CSS 规范:**
/* Frame 2147224166 */
display: flex;
flex-direction: column;
width: 375px;
height: 140px;
padding: 20px;
gap: 16px;
background: #1C1917;
border-radius: 16px;

**子元素:**
1. Icon (24x24px) - color: #EAAC08
2. Title (font-size: 16px, weight: 600)
3. Description (font-size: 14px, color: #79716B)
```

### 优点：
- ✅ 精确：包含所有设计细节
- ✅ 快速：直接复制粘贴
- ✅ 完整：包含颜色、间距、字体等所有信息
- ✅ 结构清晰：包含层级关系

---

## 方法 2: 截图 + AI 视觉分析

### 步骤：
1. 在 Figma 中截取设计稿
2. 直接上传图片到对话
3. @ 对应的组件文件并说明需求

### 示例：
```
[上传设计图]
@webf-demo/code/src/components/button/index.tsx 
请根据设计图实现这个按钮组件
```

### 优点：
- ✅ 直观：能看到完整效果
- ✅ 简单：不需要复制规范
- ⚠️ 精度：AI 需要推断某些细节

---

## 方法 3: 获取 Layer 的唯一链接 ⭐⭐⭐

### 步骤：
1. 在 Figma 中**右键点击要实现的 Layer**
2. 选择 **"Copy link to selection"** 或 **"Copy/Paste as" > "Copy link"**
3. 粘贴到 Cursor 对话中

### 示例：
```
@webf-demo/code/src/components/invite-card/index.tsx

请实现这个 Figma Layer:
https://www.figma.com/design/YvaX5joHmqZfcFSsHobQ4W/NEW--WLFI-App?node-id=2147-224113&m=dev

Layer 名称: invite-friends-card
功能需求:
- 显示邀请信息
- 包含分享按钮
- 响应式布局
```

### 链接格式说明：
```
https://www.figma.com/design/FILE_ID/DESIGN_NAME?node-id=NODE_ID
                                ^^^^^^^^              ^^^^^^^^
                            文件唯一标识           Layer 的节点 ID
```

### 优点：
- ✅ 精准定位：团队成员可以直接跳转到该 Layer
- ✅ 可追溯：后续可以回溯设计源
- ✅ 方便协作：设计师和开发者使用同一个引用

### 注意：
- ⚠️ Cursor AI 目前无法直接打开 Figma 链接
- ✅ 但可以配合**方法 1**一起使用，链接用于引用，CSS 用于实现

---

## 方法 4: Figma Dev Mode（需要付费）

Figma 的 Dev Mode 可以：
- 查看代码片段
- 查看组件属性
- 导出资源
- 查看 CSS/iOS/Android 代码

---

## 方法 5: Figma to Code 插件

### 推荐插件：
1. **Figma to Code (HTML, Tailwind, Flutter, SwiftUI)** ⭐⭐⭐⭐⭐
2. **Anima** - 导出 React/Vue 代码
3. **Builder.io** - 可视化编辑器
4. **Design Tokens** - 导出设计变量

### 使用步骤：
1. 在 Figma 中打开 **Plugins** 菜单
2. 搜索并运行 **"Figma to Code"**
3. 选中要转换的 **Layer**
4. 选择目标框架（React/HTML/Tailwind）
5. 复制生成的代码
6. 粘贴到 Cursor 中并优化

### 示例：
```jsx
// Figma to Code 生成的代码
<div className="flex flex-col w-[335px] h-[140px] p-5 gap-4 bg-[#1C1917] rounded-2xl">
  <div className="flex items-center gap-3">
    <Icon size={24} color="#EAAC08" />
    <h3 className="text-base font-semibold text-[#FAFAF9]">Title</h3>
  </div>
</div>
```

### 在 Cursor 中优化：
```
@webf-demo/code/src/components/card/index.tsx

以下是 Figma to Code 生成的代码，请优化：
1. 替换硬编码颜色为设计 token
2. 提取可复用组件
3. 添加 TypeScript 类型
4. 优化响应式设计

[粘贴插件生成的代码]
```

---

## 方法 6: 设计系统文档化 ⭐⭐⭐⭐⭐

创建统一的设计规范文档，让 AI 始终参考：

### 文件结构：
```
webf-demo/
├── DESIGN_SPECS.md          # 设计规范主文档（已创建）
└── design-tokens/
    ├── colors.json
    ├── typography.json
    ├── spacing.json
    └── components.json
```

### 使用方式：
```
@DESIGN_SPECS.md 
@webf-demo/code/src/components/button/index.tsx

请根据设计规范中的 "Button - Primary" 实现按钮组件
```

### colors.json 示例：
```json
{
  "primary": "#EAAC08",
  "text": {
    "primary": "#FAFAF9",
    "secondary": "#79716B"
  },
  "background": {
    "primary": "#0f0f0f",
    "secondary": "#201D1B"
  }
}
```

### 优点：
- ✅ 一次整理，多次使用
- ✅ 保证设计一致性
- ✅ 减少重复工作
- ✅ 方便团队协作

---

## 最佳实践 🎯

### 1. 命名规范一致
- Figma 图层名 = 组件文件名
- 例：`Button-Primary` → `button-primary/index.tsx`

### 2. 使用组件库
- Figma 中创建 Component
- 代码中对应创建可复用组件

### 3. 设计规范文档
- 在项目中维护 `DESIGN_SPECS.md`
- 记录颜色、字体、间距等设计规范

### 4. 定期同步
- 设计更新时，更新对应的代码组件
- 使用版本控制跟踪设计变更

---

## 当前项目工作流程

我们目前使用的是 **方法 1 + 方法 2** 的组合：

1. **复制 CSS 规范**用于精确实现
2. **截图参考**用于理解整体布局
3. **@ 组件文件**直接修改

### 示例对话：
```
[上传设计截图]

@webf-demo/code/src/components/invite-friends/index.tsx 

/* Frame 2147224113 */
display: flex;
padding: 20px;
width: 335px;
...

请根据 Figma 设计规范实现这个邀请好友组件
```

---

## 常用设计规范对照表

| Figma 属性 | CSS/React |
|-----------|-----------|
| `display: flex` | `display: 'flex'` |
| `flex-direction: column` | `flexDirection: 'column'` |
| `gap: 20px` | `gap: '20px'` |
| `padding: 16px 20px` | `padding: '16px 20px'` |
| `font-family: 'Sora'` | Already set globally |
| `font-weight: 600` | `fontWeight: 600` |
| `font-size: 16px` | `fontSize: '16px'` |
| `color: #FAFAF9` | `color: '#FAFAF9'` |

---

## 工具推荐

1. **Figma Desktop App** - 更好的性能
2. **Figma Mirror** - 移动端预览
3. **Zeplin** - 设计交接平台（可选）
4. **Storybook** - 组件文档和预览

---

## 问题排查

### 样式不准确？
- ✅ 检查是否复制了完整的 CSS 规范
- ✅ 检查字体是否正确加载
- ✅ 对比截图确认视觉效果

### 间距不对？
- ✅ Figma 中检查 padding vs margin
- ✅ 检查 box-sizing 设置
- ✅ 使用浏览器开发工具调试

### 颜色不一致？
- ✅ 使用 Figma 的 Color Picker
- ✅ 复制 HEX/RGB 值
- ✅ 创建颜色常量统一管理

---

## 相关链接

- [Figma 设计稿](https://www.figma.com/design/YvaX5joHmqZfcFSsHobQ4W/NEW--WLFI-App)
- [Figma Dev Mode 文档](https://help.figma.com/hc/en-us/articles/360055203533-Use-Dev-Mode)
- [Tailwind CSS](https://tailwindcss.com/)
- [React 文档](https://react.dev/)

---

---

## 🎬 完整工作流程示例

### 场景：实现一个邀请卡片组件

#### Step 1: 在 Figma 中定位 Layer
1. 打开设计稿：https://www.figma.com/design/YvaX5joHmqZfcFSsHobQ4W
2. 找到 **"Invite Friends Card"** Layer
3. 右键 > **"Copy link to selection"**

#### Step 2: 收集设计信息
1. 选中 Layer，打开右侧 **Inspect** 面板
2. 复制所有 CSS 规范
3. 截取设计图（可选，用于视觉参考）
4. 查看 Layers 面板，了解层级结构

#### Step 3: 在 Cursor 中创建 Prompt

```
@DESIGN_SPECS.md
@webf-demo/code/src/components/invite-card/index.tsx

请实现以下 Figma Layer 的设计：

**📍 Figma 引用:**
https://www.figma.com/design/YvaX5joHmqZfcFSsHobQ4W?node-id=2147-224113

**🎨 Layer 信息:**
- Name: invite-friends-card
- Parent: home-screen > invite-section
- Type: Auto Layout (Vertical)

**📐 CSS 规范:**
```css
/* Container */
display: flex;
flex-direction: column;
width: 335px;
padding: 20px;
gap: 16px;
background: #1C1917;
border: 1px solid #292524;
border-radius: 16px;

/* Header */
.header {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Icon */
.icon {
  width: 24px;
  height: 24px;
  color: #EAAC08;
}

/* Title */
.title {
  font-size: 16px;
  font-weight: 600;
  color: #FAFAF9;
}

/* Description */
.description {
  font-size: 14px;
  color: #79716B;
  line-height: 1.5;
}

/* Button */
.button {
  padding: 12px 20px;
  background: #EAAC08;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #1C1917;
}
```

**🎯 功能需求:**
1. 使用 DESIGN_SPECS.md 中的设计 token
2. 支持点击分享按钮
3. 响应式设计（移动端优先）
4. 添加 TypeScript 类型定义
5. 使用 Tailwind CSS

**📦 Props 接口:**
- title: string
- description: string
- onShare: () => void
```

#### Step 4: AI 生成代码

Cursor AI 会：
1. 读取 `DESIGN_SPECS.md` 了解设计系统
2. 根据 CSS 规范生成组件
3. 应用 Tailwind 类名
4. 添加 TypeScript 类型
5. 实现交互逻辑

#### Step 5: 验证和调整
```
在浏览器中预览组件，对比 Figma 设计稿：
- ✅ 颜色是否一致
- ✅ 间距是否准确
- ✅ 字体大小和粗细
- ✅ 圆角和边框
- ✅ 交互效果
```

---

## 🔥 快速模板

### 模板 1: 简单组件
```
@DESIGN_SPECS.md
@webf-demo/code/src/components/[COMPONENT_NAME]/index.tsx

Figma Layer: [LAYER_NAME]
Link: [FIGMA_LINK]

[粘贴 CSS 规范]

请实现这个组件，使用设计系统中的 token。
```

### 模板 2: 复杂页面
```
@DESIGN_SPECS.md
@webf-demo/code/src/pages/[PAGE_NAME]/index.tsx

Figma Page: [PAGE_NAME]
Link: [FIGMA_LINK]

**布局结构:**
1. Header
2. Main Content
   - Section 1: [description]
   - Section 2: [description]
3. Footer

**主要 Layers:**
- [Layer 1]: [CSS 规范]
- [Layer 2]: [CSS 规范]

请分步实现这个页面，先创建布局，再逐个实现组件。
```

### 模板 3: 样式调整
```
[上传对比截图：Figma vs 当前实现]

@webf-demo/code/src/components/[COMPONENT_NAME]/index.tsx

当前实现与 Figma 设计有以下差异：
1. 间距不一致：[具体说明]
2. 颜色偏差：[具体说明]
3. 字体大小：[具体说明]

请调整为与 Figma 完全一致。
```

---

## 💡 Pro Tips

### 1. 在代码中标记 Figma 引用
```tsx
/**
 * Invite Friends Card Component
 * 
 * @figma https://www.figma.com/design/YvaX5joHmqZfcFSsHobQ4W?node-id=2147-224113
 * @figmaLayer invite-friends-card
 * @updated 2024-12-15
 */
export const InviteCard: React.FC<InviteCardProps> = ({ title, description }) => {
  // ...
}
```

### 2. 使用 Layer 名称作为组件名
- Figma: `invite-friends-card` → 代码: `invite-card/index.tsx`
- Figma: `Button/Primary` → 代码: `button/primary.tsx`

### 3. 建立设计 Token 映射
```tsx
// ❌ 不要硬编码
<div style={{ background: '#1C1917' }}>

// ✅ 使用设计 token
<div style={{ background: 'var(--bg-secondary)' }}>
// 或
<div className="bg-secondary">
```

### 4. 保持同步检查清单
- [ ] Layer 名称匹配
- [ ] 颜色使用 token
- [ ] 间距使用设计系统
- [ ] 圆角符合规范
- [ ] 字体大小和粗细一致
- [ ] 截图对比验证

### 5. 使用版本标记
```tsx
/* Figma v2.3 - Updated 2024-12-15 */
/* Changes: Updated button padding from 16px to 20px */
```

---

## 🛠️ 推荐工具链

### Figma 工具
1. **Figma Desktop App** - 更快的复制粘贴
2. **Figma to Code 插件** - 快速生成初始代码
3. **Design Tokens 插件** - 导出设计变量

### 浏览器工具
4. **ColorZilla 插件** - 验证颜色准确性
5. **PixelSnap** - 测量屏幕上的像素

### 开发工具
6. **Storybook** - 组件预览和文档
7. **本项目提供的辅助脚本** ⭐

---

## 🎁 项目辅助工具

我们提供了两个实用脚本帮助你快速生成 Figma 引用：

### 1. Figma Helper (推荐)

**使用方法：**
```bash
cd webf-demo
node scripts/figma-helper.js
```

**功能：**
- 📝 自动生成组件注释
- 💬 生成 Cursor AI 提示词
- 💾 可选保存到文件
- 🔍 自动提取 node-id

**示例输出：**
```typescript
/**
 * invite-card Component
 * 
 * @figma https://www.figma.com/design/...?node-id=2147-224113
 * @figmaLayer invite-card
 * @nodeId 2147-224113
 * @created 2024-12-15
 */
```

### 2. Figma Ref (简单版)

**使用方法：**
```bash
./scripts/figma-ref.sh "invite-card" "https://figma.com/..."
```

**功能：**
- 快速生成基本注释
- 适合简单场景

---

---

## 📚 相关文件

- **[DESIGN_SPECS.md](./DESIGN_SPECS.md)** - 设计规范主文档
- **[scripts/figma-helper.js](./scripts/figma-helper.js)** - Figma 辅助工具
- **[scripts/figma-ref.sh](./scripts/figma-ref.sh)** - 快速引用生成脚本

---

## 🎓 学习资源

- [Figma for Developers](https://www.figma.com/developers)
- [Figma REST API](https://www.figma.com/developers/api)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [React TypeScript 最佳实践](https://react-typescript-cheatsheet.netlify.app/)

---

## ❓ 常见问题

### Q: Cursor AI 能直接访问 Figma 吗？
A: 不能。Cursor AI 无法直接打开 Figma 链接，但你可以：
- 复制 CSS 规范
- 截图设计稿
- 使用插件生成代码
- 保存链接用于追溯

### Q: 如何保证设计还原 100% 准确？
A: 
1. 使用方法 1（复制 CSS 规范）
2. 创建设计 token 系统
3. 使用浏览器开发工具对比
4. 截图叠加对比

### Q: 多人协作时如何保持一致？
A:
1. 维护 DESIGN_SPECS.md 文档
2. 在代码中添加 Figma 引用
3. 定期设计评审
4. 使用 Storybook 预览

### Q: 设计更新了怎么办？
A:
1. 更新代码中的 `@updated` 标记
2. 在注释中说明变更内容
3. 通知团队成员
4. 更新 DESIGN_SPECS.md

---

## ✅ 最佳实践总结

### ✨ DO - 应该做的
- ✅ 在代码中添加 Figma 链接引用
- ✅ 使用设计 token 而非硬编码
- ✅ 保持组件名称与 Layer 名称一致
- ✅ 定期同步设计和代码
- ✅ 使用 DESIGN_SPECS.md 作为单一真实来源
- ✅ 截图对比验证实现效果

### ❌ DON'T - 不应该做的
- ❌ 直接硬编码颜色值（用 token）
- ❌ 忽略设计规范自行调整
- ❌ 不添加 Figma 引用注释
- ❌ 组件命名与设计不一致
- ❌ 设计更新后不同步代码

---

## 更新日志

- 2024-12-15: 创建文档，说明当前工作流程
- 2024-12-15: 添加完整工作流程示例和快速模板
- 2024-12-15: 创建 DESIGN_SPECS.md 设计规范文档
- 2024-12-15: 添加 figma-helper.js 和 figma-ref.sh 辅助工具
- 2024-12-15: 添加常见问题和最佳实践总结

