<template>
  <div class="travel-page">
    <!-- 1. 头部区域 -->
    <header class="header">
      <div class="user-avatar" @click="goToMine">
        <img src="../imgs/图层 26.png" alt="用户" />
      </div>
      
      <div class="location-info">
        <div class="location-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#c43e3a" stroke="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span>当前位置</span>
        </div>
        <div class="location-text">自贡市，沿滩区</div>
      </div>

      <div class="header-menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </div>
    </header>

    <!-- 2. 搜索框 -->
    <div class="search-container">
      <div class="search-bar">
        <input type="text" placeholder="搜索 江姐故里教育基地景区内部 或 自贡文旅" />
        <button class="search-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- 3. 广告横幅 -->
    <div class="banner-card">
      <img
        src="../imgs/t大美自贡.png" alt="大美自贡" class="banner-img"/>
      <div class="banner-content">
        <h2 class="banner-title">大美自贡</h2>
        <p class="banner-subtitle">定制属于您的个性化出游自贡行程</p>
      </div>
      <button class="banner-btn">立即前往</button>
    </div>

    <!-- 4. 导览入口 -->
    <div class="section-title">江姐故里园区导览</div>
    <div class="map-card">
      <img src="../imgs/t园区导览.png" alt="导览" />
       <button class="enter-guide-btn" @click="goToBeautifulAR">进入导览</button>
    </div>

    <!-- 5. 推荐功能模块 (仿截图布局) -->
    <div class="recommend-section">
      <div class="rec-grid">
        
        <!-- 左侧大卡片：故里游玩路线规划 -->
        <div class="rec-card large-card" @click="goToBeautifulMap">
          <img src="../imgs/t故里游玩路线规划.png" alt="路线规划" class="card-bg" />
          <div class="card-overlay">
          </div>
        </div>

        <!-- 右侧小卡片组 -->
        <div class="rec-cards-right">
          <!-- 上方：现场公益讲解 -->
          <div class="rec-card small-card" @click="goToVolunteer">
            <img src="../imgs/t现场公益讲解.png" alt="讲解" class="card-bg" />
          </div>
          <!-- 下方：文创产品选购 -->
          <div class="rec-card small-card" @click="goToShop">
            <img src="../imgs/t文创产品选购.png" alt="文创" class="card-bg" />
          </div>
        </div>
      </div>
    </div>

    <!-- 6. 全景故里 -->
    <div class="section-title panorama-title">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#c43e3a" stroke="none" style="margin-right: 8px; vertical-align: middle;">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      全景故里
    </div>
    
    <div class="panorama-container">
      <img src="../imgs/自贡mb.png" alt="全景" class="pano-img" />
      <div class="pano-footer">
        <div class="update-info">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          <span>每日更新实况</span>
        </div>
      </div>
    </div>

    <!-- 底部留白，防止被导航栏遮挡 -->
    <div style="height: 20px;"></div>
    </div>
    <div class="footer">
      <div class="footer-content">
        <div class="footer-logo">
        </div>
      </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 跳转到个人中心页面
const goToMine = () => {
  router.push({ name: 'Mine' })
}

// 跳转到志愿者讲解页面
const goToVolunteer = () => {
  router.push({ name: 'TravelVolunteer' })
}

// 跳转到文创商店页面
const goToShop = () => {
  router.push({ name: 'TravelShop' })
}


// 跳转到BeautifulAR页面
const goToBeautifulAR = () => {
  router.push({ name: 'BeautifulAR' })
}

// 跳转到美丽地图页面
const goToBeautifulMap = () => {
  router.push({ name: 'BeautifulMap' })
}
</script>

<style scoped>
.travel-page {
  min-height: 100vh;
  background-color: #fdf6f0; 
  font-family: 'Microsoft Yahei', sans-serif;
  padding: 16px;
  padding-bottom: calc(80px + env(safe-area-inset-bottom));
}

/* === 头部 & 搜索 & Banner 样式 (保持上一轮代码) === */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  background: linear-gradient(to right, #fff5f0, transparent);
  padding: 10px 5px;
  border-radius: 12px;
}
.user-avatar img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  object-fit: cover;
}
.location-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.location-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666;
  margin-bottom: 2px;
}
.location-text {
  font-size: 15px;
  font-weight: bold;
  color: #333;
}
.header-menu svg { cursor: pointer; opacity: 0.8; }

.search-container {
  margin-bottom: 16px;
}

/* 1. 搜索框容器：确保 Flex 垂直居中生效 */
.search-bar {
  display: flex;
  align-items: center; 
  justify-content: space-between; 
  height: 36px;
  border-radius: 18px;
  padding: 0 12px; /* 左右内边距，上下为 0 */
  background: rgba(255, 255, 255, 0.9); 
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  box-sizing: border-box; 
}

.search-bar input {
  flex: 1; 
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #333;
  height: 100%; 
  line-height: normal; 
  padding: 0 !important;
  margin: 0;
  -webkit-appearance: none; 
  appearance: none;
  display: block; 
}

.search-bar input::placeholder {
  color: #999;
}

.search-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; 
  flex-shrink: 0; 
}

.search-btn svg {
  width: 18px; 
  height: 18px;
  stroke: #999;
}

.banner-card {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 8px 20px rgba(196, 62, 58, 0.15);
}
.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9); 
}
.banner-content {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}
.banner-title {
  font-size: 50px;
  margin-top: 45px;
  font-weight: bold;
  background: linear-gradient(to bottom, #ffd700, #fdb931);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "Songti SC", "SimSun", serif;
  letter-spacing: 2px;
}
.banner-subtitle {
  font-size: 20px;
  margin-top: 10px;
  color: #eee;
  font-weight: normal;
  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
}
.banner-btn {
  position: absolute;
  bottom: 25px;
  right: 16px;
  background: #fff;
  color: #c43e3a;
  border: none;
  padding: 10px 30px;
  border-radius: 20px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  cursor: pointer;
  z-index: 2;
}

/* === 通用标题 === */
.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 24px 0 12px;
  padding-left: 8px;
  border-left: 4px solid #c43e3a;
  display: flex;
  align-items: center;
}

/* === 地图卡片 === */
.map-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: auto;
}
.enter-guide-btn {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: #c43e3a;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 32px;
  font-size: 28px;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(196, 62, 58, 0.3);
  cursor: pointer;
}

/* === 5. 推荐功能模块 (核心修改) === */
.recommend-section {
  margin-bottom: 24px;
}

.rec-grid {
  display: grid;
  grid-template-columns: 5.5fr 4.5fr; /* 两列布局 */
  gap: 12px;
}

/* 左侧大卡片 */
.large-card {
  grid-row: span 2; /* 占据两行高度 */
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 3/2; /* 竖长方形比例 */
}

/* 右侧容器 */
.rec-cards-right {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 右侧小卡片 */
.small-card {
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 3/1.2; /* 横长方形比例 */
}

/* 卡片通用图片样式 */
.card-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

/* 卡片悬停效果 */
.large-card:hover .card-bg,
.small-card:hover .card-bg {
  transform: scale(1.05);
}

.card-overlay h3 {
  font-size: 15px;
  font-weight: bold;
  margin: 0;
  line-height: 1.4;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
}

/* === 6. 全景故里 === */
.panorama-title {
  margin-top: 10px;
}

.panorama-container {
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.pano-img {
  width: 100%;
  height: auto;
  display: block;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.pano-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px 12px;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
  display: flex;
  justify-content: flex-end;
}

.update-info {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255,255,255,0.9);
  font-size: 12px;
  background: rgba(0,0,0,0.3);
  padding: 4px 8px;
  border-radius: 12px;
  backdrop-filter: blur(4px);
}
</style>