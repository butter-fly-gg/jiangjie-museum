<template>
  <div class="bottom-nav-container">
    <div class="nav-items">
      <div
        class="nav-item"
        :class="{ active: currentActive === 'home' }"
        @click="goToPage('home')"
      >
        <div class="nav-icon">
          <img src="../imgs/导航栏（首页）.png" alt="首页" class="nav-img">
        </div>
        <span>首页</span>
      </div>

      <div
        class="nav-item"
        :class="{ active: currentActive === 'travel' }"
        @click="goToPage('travel')"
      >
        <div class="nav-icon">
          <img src="../imgs/导航栏（游历）.png" alt="游历" class="nav-img">
        </div>
        <span>游历</span>
      </div>

      <div class="nav-item middle-placeholder"></div>

      <div
        class="nav-item"
        :class="{ active: currentActive === 'activity' }"
        @click="goToPage('activity')"
      >
        <div class="nav-icon">
          <img src="../imgs/导航栏（活动）.png" alt="活动" class="nav-img">
        </div>
        <span>活动</span>
      </div>

      <div
        class="nav-item"
        :class="{ active: currentActive === 'mine' }"
        @click="goToPage('mine')"
      >
        <div class="nav-icon">
          <img src="../imgs/导航栏（我的）.png" alt="我的" class="nav-img">
        </div>
        <span>我的</span>
      </div>
    </div>

    <div class="middle-btn" @click="goToPage('flower')">
      <img src="../imgs/导航栏（❀）.png" class="center-img">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const currentActive = ref('travel') // 测试游历激活状态

const goToPage = (page) => {
  currentActive.value = page
  switch (page) {
    case 'home':
      router.push('home')
      break
    case 'travel':
      router.push('/travel')
      break
    case 'activity':
      router.push('/activity')
      break
    case 'mine':
      router.push('/mine')
      break
    case 'flower':
      router.push('/flower')
      break
  }
}
</script>

<style scoped>
/* 底部导航整体容器 */
.bottom-nav-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px; 
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 999;
}

/* 导航栏主体 - 1:1复刻效果图宽幅U型凹陷 */
.nav-items {
  display: flex;
  width: 100%;
  height: 80px;
  background: #D2C19B;
  position: relative;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  /* 核心：宽幅外扩U型路径，左右开口外弯，底部圆润 */
  clip-path: polygon(
    0 0, 
    calc(50% - 65px) 0px,  /* 开口左起点（加宽，外扩） */
    calc(50% - 60px) 0px, /* 左外弯起点 */
    calc(50% - 50px) 8px, /* 左外弯过渡 */
    calc(50% - 40px) 30px, /* 左内弧过渡 */
    calc(50% - 25px) 45px, /* 左底部缓弧 */
    50% 53px, /* 凹陷最低点（更浅，底部更圆） */
    calc(50% + 25px) 45px, /* 右底部缓弧 */
    calc(50% + 40px) 30px, /* 右内弧过渡 */
    calc(50% + 50px) 8px, /* 右外弯过渡 */
    calc(50% + 60px) 0px, /* 右外弯起点 */
    calc(50% + 65px) 0,  /* 开口右起点（加宽，外扩） */
    100% 0, 
    100% 100%, 
    0 100%
  );
}

/* 导航项基础样式 */
.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000;
  text-decoration: none;
  font-size: 14px;
  position: relative;
  z-index: 1;
  height: 60px;
  border-radius: 50px;
  margin: 0 5px;
  transition: all 0.3s ease;
  padding: 0 10px;
  cursor: pointer;
  margin-top: 10px; /* 适配宽幅凹陷的位置 */
}

/* 激活状态 */
.nav-item.active {
  background: #c42021 !important;
  color: #ffffff !important;
  font-weight: bold;
}

.nav-icon {
  font-size: 24px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px; 
  height: 24px; 
}

.nav-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

/* 中间占位 */
.middle-placeholder {
  flex: 1;
  visibility: hidden;
}

/* 中间花朵按钮 - 匹配U型凹陷的位置 */
.middle-btn {
  position: absolute;
  bottom: 45px; /* 适配宽幅U型的空隙 */
  width: 70px;
  height: 70px;
  background: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  border: none;
  z-index: 2;
  cursor: pointer;
}

.center-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
</style>