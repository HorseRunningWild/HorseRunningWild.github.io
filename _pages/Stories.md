---
permalink: /Stories/
title: "Stories"
redirect_from:
  - /terms/
  - /terms.html
---

{% include base_path %}
{% include toc %}

<!-- 深色科技风样式 -->
<style>
/* 页面全局深色背景 */
body {
  background: #0a0a0a;
  color: #ffffff;
}

/* 筛选按钮组 */
.filter-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 30px 0;
  max-width: 900px;
}
.filter-btn {
  padding: 8px 16px;
  background: #1a1a1a;
  border: 1px solid #00ff88;
  color: #00ff88;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}
.filter-btn.active, .filter-btn:hover {
  background: #00ff88;
  color: #0a0a0a;
}

/* 时间线容器 */
.timeline-container {
  width: 100%;
  max-width: 900px;
  margin: 30px auto;
  position: relative;
}
.timeline-container::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: 100%;
  background: #00ff88;
  transform: translateX(-50%);
}

/* 时间线项 */
.timeline-item {
  margin: 30px 0;
  padding-left: 40px;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  display: block;
}
/* 筛选隐藏 */
.timeline-item.hidden {
  display: none;
}

/* 时间线节点 */
.timeline-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 18px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #0a0a0a;
  border: 3px solid #00ff88;
  transform: translateX(-50%);
  z-index: 10;
}
.timeline-item.achievement::before {
  border-color: #ffd700;
}
.timeline-item.milestone::before {
  border-color: #00ff88;
}

/* 卡片样式 */
.timeline-card {
  padding: 20px;
  background: #121212;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
}
.card-tag {
  display: inline-block;
  padding: 4px 8px;
  background: #1e1e1e;
  color: #ffd700;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.timeline-item.milestone .card-tag {
  color: #00ff88;
}

.card-date {
  color: #aaaaaa;
  font-size: 0.9em;
  margin-bottom: 12px;
}
.card-title {
  font-size: 1.4em;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #00ccff;
}
.card-desc {
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 16px;
}
.card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.card-tags .tag {
  padding: 4px 10px;
  background: #1e1e1e;
  color: #00ff88;
  border-radius: 4px;
  font-size: 0.85em;
  border: 1px solid #2a2a2a;
}
</style>

<!-- 筛选按钮组 -->
<div class="filter-group">
  <button class="filter-btn active" data-filter="all">All</button>
  <button class="filter-btn" data-filter="work">Work</button>
  <button class="filter-btn" data-filter="education">Education</button>
  <button class="filter-btn" data-filter="project">Project</button>
  <button class="filter-btn" data-filter="achievement">Achievement</button>
  <button class="filter-btn" data-filter="milestone">Milestone</button>
</div>

<!-- 时间线内容 -->
<div class="timeline-container">
  <div class="timeline-item achievement">
    <div class="timeline-card">
      <span class="card-tag">ACHIEVEMENT</span>
      <div class="card-date">📅 2026年2月18日</div>
      <h3 class="card-title">CVPR 一作论文发表（WebChain）</h3>
      <p class="card-desc">WebChain 于 2026 年 2 月 18 日完成发表，聚焦大规模真实网页交互轨迹数据集与训练范式。</p>
      <div class="card-tags">
        <span class="tag">CVPR</span>
        <span class="tag">FIRST AUTHOR</span>
        <span class="tag">GUI AGENT</span>
      </div>
    </div>
  </div>

  <div class="timeline-item achievement">
    <div class="timeline-card">
      <span class="card-tag">ACHIEVEMENT</span>
      <div class="card-date">📅 2026年1月5日</div>
      <h3 class="card-title">ICLR 一作论文发表（WebFactory）</h3>
      <p class="card-desc">WebFactory 于 2026 年 1 月 5 日完成发表，聚焦自动化 GUI Agent 强化学习训练工厂。</p>
      <div class="card-tags">
        <span class="tag">ICLR</span>
        <span class="tag">FIRST AUTHOR</span>
        <span class="tag">GUI AGENT</span>
      </div>
    </div>
  </div>

  <div class="timeline-item milestone">
    <div class="timeline-card">
      <span class="card-tag">MILESTONE</span>
      <div class="card-date">📅 2025年12月</div>
      <h3 class="card-title">搭建自己的数字空间</h3>
      <p class="card-desc">拥有了属于自己的一片赛博空间，搭建了这个个人网站，开始记录技术探索与人生思考。</p>
      <div class="card-tags">
        <span class="tag">NEXT.JS</span>
        <span class="tag">REACT</span>
        <span class="tag">个人网站</span>
      </div>
    </div>
  </div>
</div>

<!-- 极简筛选JS -->
<script>
const filterBtns = document.querySelectorAll('.filter-btn');
const timelineItems = document.querySelectorAll('.timeline-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // 切换按钮激活状态
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    // 筛选时间项
    timelineItems.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});
</script>


