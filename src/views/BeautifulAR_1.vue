<template>
  <div class="ar-page">
    <!-- 模拟状态栏 -->
    <div class="status-bar">
      <div class="signal">●●●○○</div>
      <div class="carrier">VIRGIN</div>
      <div class="time">4:21 PM</div>
      <div class="battery">95%</div>
    </div>

    <!-- 顶部导航栏 -->
    <div class="header">
      <button class="menu-btn" @click="toggleSidebar">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      
      <div class="title">奔赴下川东</div>
      
      <button class="close-btn" @click="closePage">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- 顶部提示文字 -->
    <div class="top-info">
      <div class="vr-status">VR体验 进行中</div>
      <div class="description">
        抗日战争全面爆发后，为疏散转移，南岸中学迁到将近，江竹筠并没有随学校迁移。1938年，她主动订阅《新华日报》，开始认识了解共产党。
      </div>
    </div>

    <!-- 主标题区域 -->
    <div class="main-title-section">
      <div class="title-container">
        <h1 class="main-title">舍家别子</h1>
        <div class="chapter-tag">CHAP 第五章 第一节</div>
      </div>
    </div>

    <!-- 图片展示区 -->
    <div class="image-section">
      <div class="image-row">
        <div class="image-item">
          <img src="@/assets/images/beautiful/wananqiao.jpg" alt="1946年的万安桥" class="historical-image" />
          <div class="image-caption">• 1946年的万安桥</div>
        </div>
        <div class="image-item">
          <img src="@/assets/images/beautiful/mountain-river.jpg" alt="山水地貌图" class="historical-image" />
        </div>
      </div>
      <div class="image-description">
        作为川东临委会和下川东地工委的联络员，江竹筠沿途思考并精心设点布线。行船抵达万县后，入驻万安桥东的涤尘茶社并将此处设为联络点。
      </div>
    </div>

    <!-- 第二张图片 -->
    <div class="second-image-section">
      <img src="@/assets/images/beautiful/chuandong-guerrilla.jpg" alt="川东游击队合影" class="large-historical-image" />
      <div class="scroll-indicator" @click="scrollDown">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        <div class="scroll-text">下滑可继续阅读</div>
      </div>
      <div class="guerrilla-name">川东游击队</div>
    </div>

    <!-- 底部按钮 -->
    <div class="bottom-section">
      <button class="collect-btn" @click="addToCollection">
        <div class="plus-icon">+</div>
        <div class="collect-text">加入旅程收藏</div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const toggleSidebar = () => {
  console.log('打开侧边栏');
  // 这里可以添加侧边栏逻辑
};

const closePage = () => {
  router.go(-1); // 返回上一页
};

const scrollDown = () => {
  console.log('滑动页面');
  // 这里可以添加滚动逻辑
};

const addToCollection = () => {
  alert('已添加至收藏');
};
</script>

<style scoped>
.ar-page {
  min-height: 100vh;
  background: 
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('@/assets/images/beautiful/history-bg.jpg') no-repeat center center;
  background-size: cover;
  color: white;
  font-family: 'Microsoft YaHei', sans-serif;
  padding: 0;
  margin: 0;
  position: relative;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 12px;
  color: white;
  background: rgba(0, 0, 0, 0.3);
}

.signal, .carrier, .time, .battery {
  display: flex;
  align-items: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  margin-bottom: 20px;
}

.menu-btn, .close-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  flex: 1;
  margin: 0 20px;
}

.top-info {
  text-align: center;
  padding: 0 20px 20px;
}

.vr-status {
  font-size: 14px;
  color: #ccc;
  margin-bottom: 8px;
}

.description {
  font-size: 12px;
  color: #aaa;
  line-height: 1.5;
}

.main-title-section {
  padding: 20px;
  text-align: center;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.main-title {
  font-size: 48px;
  font-family: 'KaiTi', 'SimSun', serif;
  font-weight: bold;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.chapter-tag {
  background: #B22234;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-family: sans-serif;
  font-weight: bold;
  white-space: nowrap;
}

.image-section {
  padding: 20px;
}

.image-row {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.image-item {
  flex: 1;
}

.historical-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  filter: grayscale(100%) contrast(1.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.image-caption {
  font-size: 12px;
  color: #ccc;
  margin-top: 8px;
  text-align: center;
}

.image-description {
  font-size: 14px;
  color: #ddd;
  line-height: 1.6;
  text-align: center;
  margin-top: 15px;
}

.second-image-section {
  padding: 20px;
  text-align: center;
}

.large-historical-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 8px;
  filter: grayscale(100%) contrast(1.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  margin: 0 auto 20px;
}

.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
}

.scroll-text {
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
}

.guerrilla-name {
  font-size: 14px;
  color: #ccc;
}

.bottom-section {
  padding: 30px 20px;
  text-align: center;
}

.collect-btn {
  width: 60px;
  height: 60px;
  background: #B22234;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(178, 34, 52, 0.4);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
}

.plus-icon {
  font-size: 32px;
  font-weight: bold;
}

.collect-text {
  font-size: 14px;
  color: white;
}

/* 响应式设计 */
@media (min-width: 768px) {
  .ar-page {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .main-title {
    font-size: 60px;
  }
  
  .image-row {
    gap: 30px;
  }
  
  .historical-image {
    max-width: 200px;
  }
  
  .large-historical-image {
    max-width: 400px;
  }
}
</style>