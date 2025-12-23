#!/bin/bash

# Figma 引用生成工具
# 用法: ./scripts/figma-ref.sh "Button-Primary" "https://figma.com/..."

LAYER_NAME=$1
FIGMA_URL=$2

if [ -z "$LAYER_NAME" ] || [ -z "$FIGMA_URL" ]; then
    echo "❌ 用法: ./scripts/figma-ref.sh \"Layer名称\" \"Figma链接\""
    echo ""
    echo "示例:"
    echo "./scripts/figma-ref.sh \"invite-card\" \"https://www.figma.com/design/...\""
    exit 1
fi

# 获取当前日期
DATE=$(date +"%Y-%m-%d")

# 生成 TypeScript 注释
cat << EOF

/**
 * ${LAYER_NAME} Component
 * 
 * @figma ${FIGMA_URL}
 * @figmaLayer ${LAYER_NAME}
 * @created ${DATE}
 */

EOF

echo "✅ Figma 引用已生成！请复制到组件文件中。"
echo ""
echo "📋 现在你可以在 Cursor 中使用以下提示："
echo ""
cat << EOF
@DESIGN_SPECS.md
@webf-demo/code/src/components/${LAYER_NAME}/index.tsx

请实现以下 Figma Layer:

**Figma 引用:**
${FIGMA_URL}

**Layer 名称:** ${LAYER_NAME}

[在这里粘贴 CSS 规范]
EOF









