# Figma 设计稿转代码工作流程

## 方法 1: 复制 CSS 规范（推荐）⭐

### 步骤：
1. 在 Figma 中选中要实现的组件/元素
2. 右侧面板切换到 **Inspect** 标签
3. 复制所有 CSS 属性和设计规范
4. 粘贴到对话中，并 @ 对应的组件文件

### 示例：
```
@webf-demo/code/src/components/my-component/index.tsx 

/* Frame 2147224166 */
display: flex;
flex-direction: column;
width: 375px;
height: 140px;
...
```

### 优点：
- ✅ 精确：包含所有设计细节
- ✅ 快速：直接复制粘贴
- ✅ 完整：包含颜色、间距、字体等所有信息

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

## 方法 3: Figma Dev Mode（需要付费）

Figma 的 Dev Mode 可以：
- 查看代码片段
- 查看组件属性
- 导出资源

### 链接格式：
```
https://www.figma.com/design/FILE_ID/DESIGN_NAME?node-id=NODE_ID
```

---

## 方法 4: Figma to Code 插件

### 推荐插件：
1. **Figma to Code (HTML, Tailwind, Flutter, SwiftUI)**
2. **Anima** - 导出 React/Vue 代码
3. **Builder.io** - 可视化编辑器

### 使用：
1. 安装插件
2. 选中元素
3. 运行插件
4. 复制生成的代码

---

## 方法 5: 设计系统文档化

创建设计 Token 文档：

### 文件结构：
```
webf-demo/
├── design-tokens/
│   ├── colors.json
│   ├── typography.json
│   ├── spacing.json
│   └── components.json
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

## 更新日志

- 2024-12-15: 创建文档，说明当前工作流程

