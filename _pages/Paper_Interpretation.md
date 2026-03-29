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

<!-- 样式单独格式化书写，无单行挤压，完全适配模板 -->
<style>
/* 隐藏details原生默认箭头 */
details {
  width: 100%;
  margin: 10px 0;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
}

details > summary {
  /* 清除原生样式 */
  list-style: none;
  cursor: pointer;
  /* 自定义标题栏样式 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: background 0.2s ease;
  font-size: 1em;
  box-sizing: border-box;
}

/* 鼠标悬停效果 */
details > summary:hover {
  background: #e9ecef;
}

/* 隐藏webkit内核浏览器的原生箭头 */
details > summary::-webkit-details-marker {
  display: none;
}

/* 自定义箭头，和之前效果完全一致 */
.details-arrow {
  width: 10px;
  height: 10px;
  border-right: 2px solid #6c757d;
  border-bottom: 2px solid #6c757d;
  transform: rotate(-45deg);
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: 10px;
}

/* 展开时箭头旋转朝下 */
details[open] > summary .details-arrow {
  transform: rotate(45deg);
}

/* 内容区域，平滑展开动画 */
.details-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.3s ease;
  padding: 0 16px;
  background: #ffffff;
  border: 1px solid #f8f9fa;
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-sizing: border-box;
}

/* 展开时显示内容 */
details[open] .details-content {
  max-height: 300px;
  padding: 16px;
}

/* 概括文本样式，适配模板字体 */
.paper-summary {
  margin: 0;
  color: #495057;
  font-size: 0.85em !important;
  line-height: 1.5 !important; /* 中文推荐 1.4–1.6 */
}
.paper-summary strong {
  color: #212529;
}

/* 链接样式和模板原生蓝色保持一致 */
summary a {
  color: #0d6efd;
  text-decoration: none;
}
summary a:hover {
  text-decoration: underline;
}
</style>

---

### Bio-Inspired/Plausible

<details>
<summary>
  <span><a href="https://laser-sleet-3b9.notion.site/HippoRAG-NIPS-2024-304ca7f3face80b89741f0889f51a91b" target="_blank">Hippo RAG (2024 NeurIPS)</a></span>
  <span class="details-arrow"></span>
</summary>
<div class="details-content">
  <p class="paper-summary"><strong>Brief Intro：</strong>受海马体-皮层的Key-Value机制启发，用图结构（KG）解决传统 RAG 无法跨段落关联信息的问题。最有意思的点在于其思路是把模型结构和大脑结构对齐，如“皮层-LLM；海马旁回-Retrieve Encoders；海马体-KG+PPR算法”。但仅在多跳关联任务上有优势，基础问答效果反而不如普通 RAG。</p>
</div>
</details>

<details>
<summary>
  <span><a href="https://laser-sleet-3b9.notion.site/Hippo-RAG-2-ICML-2025-304ca7f3face802091fbf3efeb3727c1" target="_blank">Hippo RAG 2 (2025 ICML)</a></span>
  <span class="details-arrow"></span>
</summary>
<div class="details-content">
  <p class="paper-summary"><strong>核心概括：</strong>针对 HippoRAG“实体中心导致上下文丢失、NER 依赖鲁棒性差、全场景泛化失衡”三大缺陷，引入“稠密-稀疏集成（Dense-Sparse Integration）”机制，平衡概念与语境的 trade-off。</p>
</div>
</details>

<details>
<summary>
  <span><a href="https://laser-sleet-3b9.notion.site/A-multi-region-brain-model-2b6ca7f3face80f395d1eb9c7d5d1750?source=copy_link" target="_blank">A Multi-Region Brain Model (2025 ICML)</a></span>
  <span class="details-arrow"></span>
</summary>
<div class="details-content">
  <p class="paper-summary"><strong>核心概括：</strong>构建多脑区计算模型，探究海马体在空间嵌入决策中的作用，为理解生物智能的空间认知与推理机制提供计算框架。</p>
</div>
</details>

<details>
<summary>
  <span><a href="https://laser-sleet-3b9.notion.site/The-chicken-and-egg-problem-of-grid-cells-and-place-cells-2f9ca7f3face801bae08c1fe55775ece?source=copy_link" target="_blank">The chicken and egg problem of grid cells and place cells</a></span>
  <span class="details-arrow"></span>
</summary>
<div class="details-content">
  <p class="paper-summary"><strong>核心概括：</strong>挑战“网格细胞先于位置细胞生成、主导位置细胞”的经典假设，提出 SCAN 模型：位置细胞由内嗅皮层非网格细胞驱动，网格细胞反而由位置细胞的活动团驱动，与“位置细胞发育更早、海马失活破坏网格细胞”的实验证据一致。</p>
</div>
</details>

<details>
<summary>
  <span><a href="https://laser-sleet-3b9.notion.site/Predictive-Attractor-Models-2b5ca7f3face8056b114f8525d572f05?source=copy_link" target="_blank">Predictive Attractor Models (2024 NeurIPS)</a></span>
  <span class="details-arrow"></span>
</summary>
<div class="details-content">
  <p class="paper-summary"><strong>核心概括：</strong>提出满足序列记忆 5 大约束的预测吸引子模型，通过扩展 latent state 维度将高阶 Markov Chain 降为一阶，结合吸引子去噪能力实现流式学习（无需反向传播），能处理多可能性预测、噪声鲁棒等场景。</p>
</div>
</details>

---

### All AI

<details>
<summary>
  <span><a href="https://laser-sleet-3b9.notion.site/Hopfield-Network-Is-All-You-Need-2f6ca7f3face80468dedef08947e9309?source=copy_link" target="_blank">Hopfield Network Is All You Need</a></span>
  <span class="details-arrow"></span>
</summary>
<div class="details-content">
  <p class="paper-summary"><strong>核心概括：</strong>建立现代 Hopfield 网络与 Transformer Attention 的完全等价性——Hopfield 更新规则就是 Attention 机制，β 参数对应注意力缩放因子；提供三种可直接作为深度学习层的实现，兼具生物合理性与工程实用性。</p>
</div>
</details>

<details>
<summary>
  <span><a href="https://laser-sleet-3b9.notion.site/Retrieval-Augmented-Generation-for-Knowledge-Intensive-NLP-Tasks-302ca7f3face805b9744f7ee4d03acbd?source=copy_link" target="_blank">Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (NeurIPS 2020)</a></span>
  <span class="details-arrow"></span>
</summary>
<div class="details-content">
  <p class="paper-summary"><strong>核心概括：</strong>经典 RAG 开山之作，提出“检索+生成”的两阶段框架，用非参数化检索增强大模型的知识密集型任务能力，缓解幻觉问题。</p>
</div>
</details>

<details>
<summary>
  <span><a href="https://laser-sleet-3b9.notion.site/ECC-Hopfield-264ca7f3face801b8b14da4933e46ba3?source=copy_link" target="_blank">Bipartite expander Hopfield networks (NeurIPS 2019)</a></span>
  <span class="details-arrow"></span>
</summary>
<div class="details-content">
  <p class="paper-summary"><strong>核心概括：</strong>结合纠错码（ECC）的指数级存储容量与 Hopfield 网络的强鲁棒性，构建二部图结构的 ECC-Hopfield：用稀疏 expander 图细化错误定位，能量函数定义为“违反约束的数量”，通过动力学翻转输入使约束满足，实现自解码。</p>
</div>
</details>

---

### Work With Swarma
