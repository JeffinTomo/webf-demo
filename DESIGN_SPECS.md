# 设计规范文档

> 本文档记录 Figma 设计中的关键组件和样式规范

## 链接
- [Figma 设计稿](https://www.figma.com/design/YvaX5joHmqZfcFSsHobQ4W/NEW--WLFI-App)

---

## 颜色系统

### 主色
```css
--primary: #EAAC08;
--primary-hover: #D49A07;
```

### 文字颜色
```css
--text-primary: #FAFAF9;
--text-secondary: #79716B;
--text-disabled: #57534E;
```

### 背景颜色
```css
--bg-primary: #0F0F0F;
--bg-secondary: #1C1917;
--bg-card: #292524;
```

### 边框颜色
```css
--border-default: #292524;
--border-light: #3F3F46;
```

---

## 排版

### 字体
```css
font-family: 'Sora', sans-serif;
```

### 字号
```css
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 32px;
```

### 字重
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## 间距系统

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 20px;
--spacing-2xl: 24px;
--spacing-3xl: 32px;
```

---

## 圆角

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-full: 9999px;
```

---

## 组件规范

### Button - Primary

**Figma Layer**: `Button/Primary`

```css
/* 样式 */
display: flex;
align-items: center;
justify-content: center;
padding: 16px 24px;
gap: 8px;
background: #EAAC08;
border-radius: 16px;
font-size: 16px;
font-weight: 600;
color: #1C1917;
cursor: pointer;
transition: all 0.2s;

/* Hover */
background: #D49A07;

/* Disabled */
opacity: 0.5;
cursor: not-allowed;
```

### Card Container

**Figma Layer**: `Card/Container`

```css
display: flex;
flex-direction: column;
padding: 20px;
gap: 16px;
background: #1C1917;
border-radius: 16px;
border: 1px solid #292524;
```

### Input Field

**Figma Layer**: `Input/Default`

```css
display: flex;
align-items: center;
padding: 12px 16px;
gap: 8px;
background: #292524;
border: 1px solid #3F3F46;
border-radius: 12px;
font-size: 14px;
color: #FAFAF9;

/* Focus */
border-color: #EAAC08;
outline: none;
```

---

## 图标规范

### 尺寸
- Small: 16x16px
- Medium: 20x20px
- Large: 24x24px
- XLarge: 32x32px

### 颜色
- Primary: `#EAAC08`
- Secondary: `#79716B`
- White: `#FAFAF9`

---

## 阴影

```css
--shadow-sm: 0px 1px 2px rgba(0, 0, 0, 0.1);
--shadow-md: 0px 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0px 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0px 20px 25px rgba(0, 0, 0, 0.15);
```

---

## 移动端适配

### 屏幕宽度
- Mobile: 375px (设计基准)
- Tablet: 768px
- Desktop: 1024px+

### 容器宽度
```css
max-width: 375px;
margin: 0 auto;
padding: 0 20px;
```

---

## 使用示例

### 如何在 Cursor 中使用

1. **引用整个规范**：
```
@DESIGN_SPECS.md 

请根据设计规范实现一个 Primary Button 组件
```

2. **引用特定组件**：
```
@DESIGN_SPECS.md 

查看 "Button - Primary" 规范，实现对应组件
```

3. **查询颜色/间距**：
```
@DESIGN_SPECS.md 

使用设计规范中的主色和间距系统
```

---

## 更新记录

- 2024-12-15: 创建设计规范文档

