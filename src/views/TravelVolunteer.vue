<template>
  <div class="travel-volunteer-page">
    <!-- 头部区域 -->
    <header class="header">
      <div class="user-avatar">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTEuNSAxNC41YzAuNyAwIDEuMi0wLjUgMS4yLTEuMWMwLTIuNS0yLjUtMy45LTQuNS0zLjlDMTAuNiAyLjUgNy41IDMuNSA3LjUgMy41YzAtMS45IDEuNS0yLjUgMy41LTIuNUgxMS41YzIuNSAwIDQuNSAzLjUgNC41IDMuNWMwIDIuNS0yLjUgNC41LTQuNSA0LjVDMTAuNiAxOS41IDcuNSAxOC41IDcuNSAxOC41YzAtMS41IDEuNS0yLjUgMy41LTIuNVoiIGZpbGw9IiMzNDQwNTciLz48L3N2Zz4=" alt="用户" />
      </div>
      <div class="location">活动总览<br><span>江姐故里</span></div>
      <div class="settings">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2">
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          <path d="M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"/>
        </svg>
      </div>
    </header>

    <!-- 横幅广告 -->
    <div class="banner-card">
      <img 
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5OYXRpdGluZSBTYW1wbGU8L3RleHQ+PC9zdmc+" 
        alt="那时春里"
      />
    </div>

    <!-- 时间选择器 -->
    <div class="date-tabs">
      <div class="date-tab active">3月 2024</div>
      <div class="date-tab">9月 2024</div>
      <div class="date-tab">10月 2024</div>
      <div class="date-tab">11月 2024</div>
      <div class="date-tab">12月 2024</div>
    </div>

    <!-- 分类标签 -->
    <div class="tabs">
      <div class="tab-item active">全部</div>
      <div class="tab-item">进行中</div>
      <div class="tab-item">已结束</div>
      <div class="tab-item">即将开放</div>
    </div>

    <!-- 活动列表 -->
    <div class="activity-list">
      <!-- 进行中活动 -->
      <div class="activity-card">
        <span class="status-tag ongoing">进行中</span>
        <img 
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5QaG90byBTYW1wbGU8L3RleHQ+PC9zdmc+" 
          alt="活动封面"
          class="activity-img"
        />
        <div class="activity-info">
          <div class="activity-title">那时春里——公益讲解</div>
          <div class="countdown">01天 03:14后结束</div>
          <button class="join-btn">立即参与</button>
        </div>
      </div>

      <!-- 已结束活动 -->
      <div class="activity-card">
        <span class="status-tag ended">已结束</span>
        <img 
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5QaXhlbCBCYWNrZ3JvdW5kPC90ZXh0Pjwvc3ZnPg==" 
          alt="活动封面"
          class="activity-img"
        />
        <div class="activity-info">
          <div class="activity-title">红色记忆·志愿行</div>
          <div class="countdown">活动已结束</div>
          <button class="join-btn disabled" disabled>查看详情</button>
        </div>
      </div>

      <!-- 即将开放 -->
      <div class="activity-card">
        <span class="status-tag coming">即将开放</span>
        <img 
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5Gb3J0aGNvbWluZzwvdGV4dD48L3N2Zz4=" 
          alt="活动封面"
          class="activity-img"
        />
        <div class="activity-info">
          <div class="activity-title">国庆特别讲解计划</div>
          <div class="countdown">2024-10-01 开始</div>
          <button class="join-btn disabled" disabled>敬请期待</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 无复杂逻辑，仅展示
</script>

<style scoped>
/* 全局样式 */
.travel-volunteer-page {
  min-height: 100vh;
  background-color: #f5f0e6; /* 与 MinePage 一致 */
  font-family: 'Microsoft Yahei', sans-serif;
  padding: 16px;
  padding-bottom: calc(80px + env(safe-area-inset-bottom));
}

/* === 头部 === */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.user-avatar img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.location {
  font-size: 14px;
  text-align: center;
  color: #333;
}
.location span {
  font-size: 12px;
  color: #666;
}
.settings svg {
  width: 20px;
  height: 20px;
}

/* === 横幅 === */
.banner-card {
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.banner-card img {
  width: 100%;
  display: block;
  height: auto;
}

/* === 时间选择 === */
.date-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0 4px;
}
.date-tab {
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  cursor: pointer;
}
.date-tab.active {
  background: #c43e3a;
  color: white;
  font-weight: bold;
}

/* === 分类标签 === */
.tabs {
  display: flex;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 4px;
  margin-bottom: 16px;
}
.tab-item {
  flex: 1;
  padding: 8px 0;
  text-align: center;
  font-size: 15px;
  color: #666;
  border-radius: 16px;
  cursor: pointer;
}
.tab-item.active {
  background: white;
  color: #c43e3a;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* === 活动卡片 === */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.activity-card {
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.status-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  color: white;
}
.status-tag.ongoing { background: #4caf50; }
.status-tag.ended { background: #9e9e9e; }
.status-tag.coming { background: #ff9800; }

.activity-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
}

.activity-info {
  padding: 12px;
  position: relative;
}

.activity-title {
  font-size: 15px;
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
  line-height: 1.4;
}

.countdown {
  font-size: 13px;
  color: #888;
  margin-bottom: 24px;
}

.join-btn {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: #c43e3a;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 13px;
  cursor: pointer;
}
.join-btn.disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>