<template>
  <div class="travel-page">
    <!-- 头部区域 -->
    <header class="header">
      <div class="user-avatar">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTEuNSAxNC41YzAuNyAwIDEuMi0wLjUgMS4yLTEuMWMwLTIuNS0yLjUtMy45LTQuNS0zLjlDMTAuNiAyLjUgNy41IDMuNSA3LjUgMy41YzAtMS41IDEuNS0yLjUgMy41LTIuNUgxMS41YzIuNSAwIDQuNSAzLjUgNC41IDMuNWMwIDIuNS0yLjUgNC41LTQuNSA0LjVDMTAuNiAxOS41IDcuNSAxOC41IDcuNSAxOC41YzAtMS41IDEuNS0yLjUgMy41LTIuNVoiIGZpbGw9IiMzNDQwNTciLz48L3N2Zz4=" alt="用户" />
      </div>
      <div class="location">当前位置<br><span>自贡市, 沿滩区</span></div>
      <div class="settings">
        <img src="../imgs/客服.png" alt="设置" class="setting-icon" />
      </div>
    </header>

    <!-- 搜索框 -->
    <div class="search-bar">
      <input type="text" placeholder="搜索 江姐故里教育基地景区内部 或 自贡文旅" />
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
      </button>
    </div>

    <!-- 广告横幅 -->
    <div class="banner-card">
      <img 
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5EYW1lIFNldmljZTwvdGV4dD48L3N2Zz4=" 
        alt="大美自贡"
      />
      <button class="banner-btn">立即前往</button>
    </div>

    <!-- 导览区域标题 -->
    <div class="section-title">江姐故里园区导览</div>

    <!-- 地图容器 -->
    <div class="map-card">
      <img 
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMzAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2VlZWIwMCIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9Ijc1IiByPSIyMCIgZmlsbD0iI2Q0MDAwMCIvPjx0ZXh0IHg9IjE1MCIgeT0iODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPk1hcCBTaW11bGF0aW9uPC90ZXh0Pjwvc3ZnPg==" 
        alt="江姐故里地图"
      />
      <button class="enter-guide-btn">进入导览</button>
    </div>

    <!-- AR地图入口 -->
    <div class="ar-entry" @click="openAR">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M21 16V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8"/>
        <path d="M3 10h18"/>
        <path d="M16 21h-6"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
      <span>AR实景导览</span>
    </div>

    <!-- 推荐内容 -->
    <div class="section-title">推荐</div>
    <div class="recommend-grid">
      <div class="card" v-for="item in recommendList" :key="item.id">
        <div class="card-img-placeholder"></div>
        <div class="card-title">{{ item.title }}</div>
        <div class="card-desc">{{ item.desc }}</div>
      </div>
    </div>

    <!-- 全景展示 -->
    <div class="section-title">全景展示</div>
    <div class="panorama-list">
      <div class="pano-item" v-for="i in 3" :key="i">
        <div class="pano-thumb-placeholder"></div>
        <div class="pano-name">全景场景 {{ i }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TravelPage',
  data() {
    return {
      recommendList: [
        { id: 1, title: '江姐故居', desc: '了解革命先烈的生平事迹' },
        { id: 2, title: '红梅广场', desc: '纪念江姐精神的主题广场' },
        { id: 3, title: '教育展馆', desc: '沉浸式红色教育体验' },
        { id: 4, title: '烈士陵园', desc: '缅怀英烈，致敬英雄' }
      ]
    }
  },
  methods: {
    openAR() {
      alert('AR实景导览功能暂未开放')
    }
  }
}
</script>

<style scoped>
/* 继承 MinePage 的全局风格 */
.travel-page {
  min-height: 100vh;
  background-color: #f5f0e6; /* ← 关键：统一背景色 */
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
.setting-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

/* === 搜索框 === */
.search-bar {
  display: flex;
  margin-bottom: 16px;
  background: rgba(255, 255, 255, 0.8); /* ← 半透明背景 */
  border-radius: 20px;
  overflow: hidden;
}
.search-bar input {
  flex: 1;
  padding: 8px 16px;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
}
.search-bar button {
  width: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
}

/* === 通用卡片样式（对齐 MinePage）=== */
.banner-card,
.map-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.banner-card img,
.map-card img {
  width: 100%;
  display: block;
  height: auto;
}

/* === 按钮 === */
.banner-btn,
.enter-guide-btn {
  position: absolute;
  background: #c43e3a; /* ← 使用 MinePage 的主色 */
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  z-index: 2;
}
.banner-btn {
  bottom: 10px;
  right: 10px;
  padding: 4px 12px;
  font-size: 12px;
}
.enter-guide-btn {
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 20px;
  font-size: 14px;
}

/* === 区块标题（对齐 MinePage 的 tab 风格）=== */
.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 20px 0 12px;
  padding-left: 4px;
  border-left: 3px solid #c43e3a; /* ← 左侧色条，呼应 MinePage 主色 */
}

/* === AR入口 === */
.ar-entry {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #c43e3a;
  color: white;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 14px;
}
.ar-entry svg {
  width: 20px;
  height: 20px;
}

/* === 推荐卡片 === */
.recommend-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}
.card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}
.card-img-placeholder {
  width: 100%;
  height: 80px;
  background: #eee;
  border-radius: 8px;
  margin-bottom: 8px;
}
.card-title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 4px;
  color: #333;
}
.card-desc {
  font-size: 12px;
  color: #888;
}

/* === 全景展示 === */
.panorama-list {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 10px;
  -webkit-overflow-scrolling: touch;
}
.pano-item {
  flex: 0 0 auto;
  text-align: center;
  min-width: 90px;
}
.pano-thumb-placeholder {
  width: 90px;
  height: 90px;
  background: #eee;
  border-radius: 10px;
  margin-bottom: 8px;
}
.pano-name {
  font-size: 13px;
  color: #333;
}
</style>