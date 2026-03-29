---
permalink: /Timeline/
title: "Timeline"
redirect_from:
  - /terms/
  - /terms.html
---

{% include base_path %}
{% include toc %}

<!-- 1. 核心样式：完全匹配你的页面UI，包含筛选隐藏逻辑 -->
<style>
/* 筛选按钮组：和你的页面样式完全对齐 */
.filter-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 0 0 30px 0;
  max-width: 900px;
}
.filter-btn {
  padding: 8px 18px;
  background: #121212;
  border: 1px solid #00ff88;
  color: #00ff88;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 1em;
}
/* 按钮选中/激活样式：绿底黑字，和你的截图一致 */
.filter-btn.active, .filter-btn:hover {
  background: #00ff88;
  color: #0a0a0a;
}

/* 时间线容器 */
.timeline-container {
  width: 100%;
  max-width: 900px;
  margin: 30px 0;
  position: relative;
}
/* 左侧垂直时间线（绿色） */
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

/* 单个时间线项：核心筛选控制 */
.timeline-item {
  margin: 30px 0;
  padding-left: 40px;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  display: block;
}
/* 筛选隐藏：强制优先级，确保能真正隐藏 */
.timeline-item.hidden {
  display: none !important;
}

/* 时间线节点（黄色圆点，和你的截图一致） */
.timeline-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 18px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #0a0a0a;
  border: 3px solid #ffd700;
  transform: translateX(-50%);
  z-index: 10;
}
/* 不同分类的节点配色 */
.timeline-item.milestone::before {
  border-color: #00ff88;
}
.timeline-item.work::before {
  border-color: #dc3545;
}
.timeline-item.education::before {
  border-color: #6610f2;
}
.timeline-item.project::before {
  border-color: #17a2b8;
}

/* 卡片主体样式：匹配你的深色UI */
.timeline-card {
  padding: 24px;
  background: #171717;
  border: 1px solid #252525;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
}
/* 卡片顶部分类标签 */
.card-tag {
  display: inline-block;
  padding: 4px 8px;
  background: #ffd700;
  color: #0a0a0a;
  border-radius: 4px;
  font-size: 0.85em;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.timeline-item.milestone .card-tag {
  background: #00ff88;
  color: #0a0a0a;
}
.timeline-item.work .card-tag {
  background: #dc3545;
  color: #fff;
}
.timeline-item.education .card-tag {
  background: #6610f2;
  color: #fff;
}
.timeline-item.project .card-tag {
  background: #17a2b8;
  color: #fff;
}

/* 日期样式 */
.card-date {
  color: #aaaaaa;
  font-size: 0.95em;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}
/* 卡片标题 */
.card-title {
  font-size: 1.5em;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #00ccff;
}
/* 卡片描述文本 */
.card-desc {
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 18px;
  font-size: 1.05em;
}
/* 底部标签组 */
.card-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.card-tags .tag {
  padding: 5px 12px;
  background: #121212;
  color: #00ff88;
  border-radius: 4px;
  font-size: 0.9em;
  border: 1px solid #252525;
}
</style>

<!-- 2. 筛选按钮组：data-filter和下方timeline-item的class完全对应 -->
<div class="filter-group">
  <button class="filter-btn active" data-filter="all">All</button>
  <button class="filter-btn" data-filter="work">Work</button>
  <button class="filter-btn" data-filter="education">Education</button>
  <button class="filter-btn" data-filter="project">Project</button>
  <button class="filter-btn" data-filter="achievement">Achievement</button>
  <button class="filter-btn" data-filter="milestone">Milestone</button>
</div>

<!-- 3. 时间线内容区：每个item的class必须和按钮的data-filter对应 -->
<div class="timeline-container">

  <!-- 成就项：class加achievement，对应Achievement按钮 -->
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

  <!-- 成就项：class加achievement -->
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

  <!-- 里程碑项：class加milestone，对应Milestone按钮 -->
  <div class="timeline-item milestone">
    <div class="timeline-card">
      <span class="card-tag">MILESTONE</span>
      <div class="card-date">📅 2025年12月</div>
      <h3 class="card-title">搭建自己的数字空间</h3>
      <p class="card-desc">拥有了属于自己的一片赛博空间，搭建了这个个人网站，开始记录技术探索与人生思考。</p>
      <div class="card-tags">
        <span class="tag">NEXT.JS</span>
        <span class="tag">REACT</span>
      </div>
    </div>
  </div>

  <!-- 示例：工作项（你后续可以自己加）class加work，对应Work按钮 -->
  <div class="timeline-item work hidden">
    <div class="timeline-card">
      <span class="card-tag">WORK</span>
      <div class="card-date">📅 2025年9月</div>
      <h3 class="card-title">CIBR 实习</h3>
      <p class="card-desc">加入脑科学与人工智能实验室，开展脑启发算法相关研究。</p>
      <div class="card-tags">
        <span class="tag">CIBR</span>
        <span class="tag">脑启发AI</span>
      </div>
    </div>
  </div>

</div>

<!-- 4. 筛选JS：放在页面最底部，用DOMContentLoaded确保页面加载完再执行，100%能找到元素 -->
<script>
// 等待页面所有元素加载完成，再执行筛选逻辑
document.addEventListener('DOMContentLoaded', function() {
  // 获取所有按钮和时间线项
  const filterBtns = document.querySelectorAll('.filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  // 给每个按钮绑定点击事件
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // 1. 切换按钮激活状态：先移除所有按钮的active，给当前点击的加active
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // 2. 获取要筛选的分类
      const targetFilter = this.getAttribute('data-filter');

      // 3. 遍历所有时间线项，执行筛选
      timelineItems.forEach(item => {
        // All按钮：显示全部
        if (targetFilter === 'all') {
          item.classList.remove('hidden');
        } 
        // 其他分类：匹配class则显示，不匹配则隐藏
        else {
          if (item.classList.contains(targetFilter)) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        }
      });
    });
  });
});
</script>
