<template>
  <div class="beautiful-map-page">
    <!-- Hero 区域 -->
    <div class="hero">
      <img class="hero-bg" :src="require('@/assets/images/beautiful/bg-zigong.jpg')" alt="自贡地图背景" />
      <div class="hero-mask"></div>

      <div class="hero-title">
        <div class="hero-title-main">自贡游玩路线</div>
        <div class="hero-title-sub">
          <span class="hero-title-sub-text">江姐故里 → 东锅厂</span>
        </div>
      </div>

      <div class="hero-icon" aria-hidden="true">
        <div class="hero-icon-ring"></div>
      </div>
    </div>

    <!-- 地图内容区域 -->
    <div class="map-content-area">
      <!-- 路线信息卡片 -->
      <div class="route-info-card">
        <div class="route-header">
          <div class="route-title">江姐故里 → 东锅厂</div>
          <div class="route-subtitle">经典文化探索路线</div>
        </div>

        <div class="route-stats">
          <div class="stat-item">
            <div class="stat-value">4.2km</div>
            <div class="stat-label">总距离</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">25min</div>
            <div class="stat-label">预计时间</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">5</div>
            <div class="stat-label">途经点</div>
          </div>
        </div>

        <div class="transport-options">
          <button 
            v-for="mode in transportModes" 
            :key="mode.value"
            :class="['transport-btn', { active: selectedTransport === mode.value }]"
            @click="selectTransport(mode.value)"
          >
            {{ mode.label }}
          </button>
        </div>
      </div>

      <!-- 地图可视化区域 -->
      <div class="map-visual">
        <div class="map-background">
          <!-- 使用你的自贡背景图作为地图底图 -->
          <img :src="require('@/assets/images/beautiful/travel-sky.jpg')" alt="地图底图" class="map-image" />
          
          <!-- 路径线条 -->
          <svg class="route-path" viewBox="0 0 400 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:0.8" />
                <stop offset="100%" style="stop-color:#2196F3;stop-opacity:0.6" />
              </linearGradient>
            </defs>
            <!-- 简化的路线路径 -->
            <path 
              d="M 50 500 Q 100 400 150 350 T 250 300 T 300 200 T 350 100" 
              stroke="url(#pathGradient)" 
              stroke-width="6" 
              fill="none" 
              stroke-linecap="round"
              stroke-dasharray="10,5"
            />
            
            <!-- 起点标记 -->
            <circle cx="50" cy="500" r="8" fill="#FF5722" stroke="#fff" stroke-width="2"/>
            <text x="50" y="485" text-anchor="middle" class="marker-text">起点</text>
            
            <!-- 终点标记 -->
            <circle cx="350" cy="100" r="8" fill="#4CAF50" stroke="#fff" stroke-width="2"/>
            <text x="350" y="85" text-anchor="middle" class="marker-text">终点</text>
            
            <!-- 途经点标记 -->
            <circle cx="150" cy="350" r="5" fill="#FFC107" stroke="#fff" stroke-width="1"/>
            <circle cx="250" cy="300" r="5" fill="#FFC107" stroke="#fff" stroke-width="1"/>
            <circle cx="300" cy="200" r="5" fill="#FFC107" stroke="#fff" stroke-width="1"/>
          </svg>
        </div>

        <!-- 路线详情列表 -->
        <div class="route-details">
          <div class="detail-item">
            <div class="detail-step">1</div>
            <div class="detail-content">
              <div class="detail-title">江姐故里</div>
              <div class="detail-desc">参观革命烈士纪念馆，感受红色文化</div>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-step">2</div>
            <div class="detail-content">
              <div class="detail-title">自流井老街</div>
              <div class="detail-desc">体验千年盐都历史文化</div>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-step">3</div>
            <div class="detail-content">
              <div class="detail-title">燊海井</div>
              <div class="detail-desc">世界最古老的盐井，见证古代工艺</div>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-step">4</div>
            <div class="detail-content">
              <div class="detail-title">彩灯公园</div>
              <div class="detail-desc">欣赏自贡彩灯艺术</div>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-step">5</div>
            <div class="detail-content">
              <div class="detail-title">东锅厂</div>
              <div class="detail-desc">工业遗产，现代自贡的象征</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部导航按钮 -->
      <div class="nav-button-container">
        <button class="nav-button" @click="startNavigation">
          选定并开始导航
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeautifulMap',
  data() {
    return {
      selectedTransport: 'walking',
      transportModes: [
        { value: 'walking', label: '步行' },
        { value: 'bike', label: '骑行' },
        { value: 'bus', label: '公交' },
        { value: 'car', label: '驾车' }
      ]
    }
  },
  methods: {
    selectTransport(mode) {
      this.selectedTransport = mode;
    },
    startNavigation() {
      alert(`开始导航至东锅厂，路线：江姐故里 → 自流井老街 → 燊海井 → 彩灯公园 → 东锅厂`);
      // 这里可以跳转到真正的导航页面
    },
    goTo(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>
/* ========== 全局基础 ========== */
.beautiful-map-page {
  min-height: 100vh;
  background: #f3f3f3;
  font-family: 'Microsoft YaHei', sans-serif;
}

/* ========== Hero Banner ========== */
.hero {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.05) 40%, rgba(255, 255, 255, 0.65) 100%);
}

.hero-title {
  position: absolute;
  left: 24px;
  top: 70px;
  color: #fff;
  text-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
}

.hero-title-main {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: 1px;
}

.hero-title-sub {
  margin-top: 8px;
  position: relative;
  display: inline-block;
}

.hero-title-sub-text {
  position: relative;
  z-index: 2;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.95);
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(209, 64, 64, 0.75);
}

.hero-icon {
  position: absolute;
  right: 26px;
  top: 118px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  border: 2px solid rgba(255, 255, 255, 0.65);
  display: grid;
  place-items: center;
}

.hero-icon-ring {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.75);
}

/* ========== 地图内容区 ========== */
.map-content-area {
  margin-top: -120px;
  padding: 0 16px 24px;
}

/* ========== 路线信息卡片 ========== */
.route-info-card {
  background: rgba(255, 255, 255, 0.92);
  border-radius: 18px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.14);
  backdrop-filter: blur(8px);
}

.route-header {
  text-align: center;
  margin-bottom: 16px;
}

.route-title {
  font-size: 22px;
  font-weight: 800;
  color: #333;
  margin-bottom: 4px;
}

.route-subtitle {
  font-size: 14px;
  color: #666;
}

.route-stats {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 20px;
  font-weight: 800;
  color: #4CAF50;
}

.stat-label {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.transport-options {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.transport-btn {
  padding: 8px 16px;
  border: 2px solid #ddd;
  border-radius: 20px;
  background: white;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.transport-btn.active,
.transport-btn:hover {
  border-color: #4CAF50;
  background: #4CAF50;
  color: white;
}

/* ========== 地图可视化 ========== */
.map-visual {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.map-background {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}

.route-path {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.marker-text {
  font-size: 12px;
  fill: #fff;
  font-weight: bold;
}

/* ========== 路线详情列表 ========== */
.route-details {
  padding: 20px;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.detail-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.detail-step {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #4CAF50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  margin-right: 12px;
  flex-shrink: 0;
}

.detail-content {
  flex: 1;
}

.detail-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.detail-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
}

/* ========== 导航按钮 ========== */
.nav-button-container {
  padding: 0 16px;
}

.nav-button {
  width: 100%;
  height: 56px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  color: white;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
}

.nav-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(76, 175, 80, 0.4);
}

.nav-button:active {
  transform: translateY(0);
}

/* ========== 响应式断点 ========== */

/* 平板 & 桌面端 */
@media (min-width: 768px) {
  .hero { height: 380px; }
  .hero-title { left: 56px; top: 100px; }
  .hero-title-main { font-size: 42px; }
  
  .map-content-area { margin-top: -160px; padding: 0 28px 40px; }
  
  .route-info-card { padding: 28px; }
  .route-title { font-size: 26px; }
  
  .map-background { height: 400px; }
  
  .nav-button {
    height: 64px;
    font-size: 20px;
    border-radius: 20px;
  }
}

/* 大屏 PC */
@media (min-width: 1200px) {
  .hero { height: 480px; }
  .map-content-area { margin-top: -200px; }
}
</style>