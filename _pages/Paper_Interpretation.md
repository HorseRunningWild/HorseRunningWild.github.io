---
permalink: /Paper_Interpretation/
title: "Paper Interpretation"
author_profile: true
redirect_from: 
  - "/non-menu-page/"
  - "/non-menu-page.html"
  - "/nmp/"
  - "/nmp.html"
---

This section mainly consists of papers I read during my internship at CIBR to complete the project. These works focus on brain-inspired algorithms for **reasoning**, though there are also articles purely related to the field of artificial intelligence.
All entries in this section link directly to my Notion page. My paper interpretations generally follow this structure:
1. Motivation
2. Framework
3. Learning/Inferring Process
4. My Understanding
5. Reproduction
6. 
<!-- 只需要加这一段 CSS，后面的 HTML 结构直接套用即可 -->
<style>
/* 隐藏默认的复选框 */
.paper-toggle {
  display: none;
}

/* Toggle 标题栏样式 */
.paper-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f8f9fa; /* 浅灰背景，学术感 */
  border-radius: 8px;
  cursor: pointer;
  margin: 10px 0;
  transition: background 0.2s ease;
  font-size: 1em;
}

/* 鼠标悬停时的背景色变化 */
.paper-label:hover {
  background: #e9ecef;
}

/* 箭头图标（纯 CSS 绘制，不用图片） */
.paper-arrow {
  width: 10px;
  height: 10px;
  border-right: 2px solid #6c757d;
  border-bottom: 2px solid #6c757d;
  transform: rotate(-45deg); /* 默认箭头朝左 */
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: 10px;
}

/* 隐藏内容区域（默认不显示） */
.paper-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.3s ease;
  padding: 0 16px;
  background: #ffffff;
  border-radius: 0 0 8px 8px;
  border: 1px solid #f8f9fa;
  border-top: none;
}

/* 复选框选中时：展开内容、旋转箭头 */
.paper-toggle:checked ~ .paper-content {
  max-height: 300px; /* 足够容纳概括内容 */
  padding: 16px;
}
.paper-toggle:checked ~ .paper-label .paper-arrow {
  transform: rotate(45deg); /* 箭头朝下 */
}

/* 概括文字的样式 */
.paper-summary {
  margin: 0;
  color: #495057;
  line-height: 1.6;
}
.paper-summary strong {
  color: #212529;
}
</style>

---




### Bio-Inspired/Plausible

<!-- 第一篇：Hippo RAG (2024 NeurIPS) -->
<input type="checkbox" id="paper-1" class="paper-toggle">
<label for="paper-1" class="paper-label">
  <span><a href="https://laser-sleet-3b9.notion.site/HippoRAG-NIPS-2024-304ca7f3face80b89741f0889f51a91b" target="_blank" style="color: #0d6efd; text-decoration: none;">Hippo RAG (2024 NeurIPS)</a></span>
  <span class="paper-arrow"></span>
</label>
<div class="paper-content">
  <p class="paper-summary"><strong>核心概括：</strong>受海马体长时记忆机制启发，用图结构（KG）解决传统 RAG 无法跨段落关联信息的问题；但仅在多跳关联任务上有优势，基础问答效果反而不如普通 RAG。</p>
</div>

- [Hippo RAG (2024 NeurIPS)](https://laser-sleet-3b9.notion.site/HippoRAG-NIPS-2024-304ca7f3face80b89741f0889f51a91b)
- [Hippo RAG 2 (2025 ICML)](https://laser-sleet-3b9.notion.site/Hippo-RAG-2-ICML-2025-304ca7f3face802091fbf3efeb3727c1)
- [A Multi-Region Brain Model to Elucidate the Role of Hippocampus in Spatially Embedded Decision-Making (2025 ICML)](https://laser-sleet-3b9.notion.site/A-multi-region-brain-model-2b6ca7f3face80f395d1eb9c7d5d1750?source=copy_link)
- [The chicken and egg problem of grid cells and  place cells](https://laser-sleet-3b9.notion.site/The-chicken-and-egg-problem-of-grid-cells-and-place-cells-2f9ca7f3face801bae08c1fe55775ece?source=copy_link)
- [Predictive Attractor Models (2024 NeurIPS)](https://laser-sleet-3b9.notion.site/Predictive-Attractor-Models-2b5ca7f3face8056b114f8525d572f05?source=copy_link)

### All AI
- [Hopfield Network Is All You Need](https://laser-sleet-3b9.notion.site/Hopfield-Network-Is-All-You-Need-2f6ca7f3face80468dedef08947e9309?source=copy_link)
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (NeurIPS 2020)](https://laser-sleet-3b9.notion.site/Retrieval-Augmented-Generation-for-Knowledge-Intensive-NLP-Tasks-302ca7f3face805b9744f7ee4d03acbd?source=copy_link)
- [Bipartite expander Hopfield networks as self-decoding high-capacity error correcting codes (NeurIPS 2019)](https://laser-sleet-3b9.notion.site/ECC-Hopfield-264ca7f3face801b8b14da4933e46ba3?source=copy_link)

### Work With Swarma
