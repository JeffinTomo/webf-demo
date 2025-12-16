#!/usr/bin/env node

/**
 * Figma 辅助工具
 * 帮助生成 Cursor AI 可用的 Figma 引用
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function parseNodeId(url) {
  const match = url.match(/node-id=([\d-]+)/);
  return match ? match[1] : null;
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function generateComponentComment(layerName, figmaUrl, nodeId) {
  return `/**
 * ${layerName} Component
 * 
 * @figma ${figmaUrl}
 * @figmaLayer ${layerName}
 * @nodeId ${nodeId || 'N/A'}
 * @created ${getCurrentDate()}
 */`;
}

function generateCursorPrompt(layerName, figmaUrl, componentPath) {
  return `@DESIGN_SPECS.md
@${componentPath}

请实现以下 Figma Layer 的设计：

**📍 Figma 引用:**
${figmaUrl}

**🎨 Layer 信息:**
- Name: ${layerName}
- Node ID: ${parseNodeId(figmaUrl) || 'N/A'}

**📐 CSS 规范:**
\`\`\`css
[在这里粘贴从 Figma Inspect 面板复制的 CSS]
\`\`\`

**🎯 功能需求:**
1. 使用 DESIGN_SPECS.md 中的设计 token
2. 支持 TypeScript 类型定义
3. 响应式设计（移动端优先）
4. 使用 Tailwind CSS

**📦 Props 接口:**
- [定义组件 props]
`;
}

async function main() {
  console.log('\n🎨 Figma 辅助工具\n');
  console.log('帮助你快速生成 Cursor AI 可用的 Figma 引用\n');

  const layerName = await question('1️⃣  Figma Layer 名称 (例: invite-card): ');
  const figmaUrl = await question('2️⃣  Figma Layer 链接 (右键复制): ');
  const componentPath = await question('3️⃣  组件路径 (例: webf-demo/code/src/components/invite-card/index.tsx): ');

  console.log('\n' + '='.repeat(60) + '\n');

  const nodeId = parseNodeId(figmaUrl);
  const comment = generateComponentComment(layerName, figmaUrl, nodeId);
  const prompt = generateCursorPrompt(layerName, figmaUrl, componentPath);

  console.log('📝 1. 组件注释（复制到代码文件顶部）:\n');
  console.log(comment);
  
  console.log('\n' + '-'.repeat(60) + '\n');
  
  console.log('💬 2. Cursor AI 提示词（复制到对话框）:\n');
  console.log(prompt);

  console.log('\n' + '='.repeat(60) + '\n');

  const saveToFile = await question('💾 是否保存到文件？(y/n): ');
  
  if (saveToFile.toLowerCase() === 'y') {
    const outputDir = path.join(__dirname, '..', 'figma-refs');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const filename = `${layerName}-${getCurrentDate()}.md`;
    const filepath = path.join(outputDir, filename);
    
    const content = `# ${layerName}\n\n## 组件注释\n\n\`\`\`typescript\n${comment}\n\`\`\`\n\n## Cursor AI 提示词\n\n\`\`\`\n${prompt}\n\`\`\`\n`;
    
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ 已保存到: ${filepath}`);
  }

  console.log('\n✨ 完成！现在你可以在 Cursor 中使用了。\n');
  rl.close();
}

main().catch(console.error);


