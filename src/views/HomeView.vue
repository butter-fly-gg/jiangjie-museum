<template>
  <div class="home-page">
    <!-- 全屏背景图区域 -->
    <div class="hero-section">
      <img src="../imgs/Gamecover_1.png" alt="江姐故里数字文创启动页" class="bg-image">
      <!-- 居中的进入探索按钮 -->
      <div class="enter-btn-container">
        <button class="enter-btn" @click="goToModeSelect">
          <span class="btn-text">🌸进入探索🌸</span>
          <span class="btn-subtext">READY TO START</span>
        </button>
      </div>
      <!-- 右侧悬浮功能按钮（参考图样式） -->
     <div class="float-buttons">
        <button class="float-btn" title="设置">⚙️</button>
        <button class="float-btn" title="特殊功能">SP</button>
        <button class="float-btn" title="更多">⋮⋮</button>
        <button class="float-btn" title="返回首页" @click="goToHome">🏠</button>
    </div>
      <!-- 左下角版本信息（参考图样式） -->
      <div class="version-info">
        <p>VER: 1.0.00</p>
        <p class="agreement">故里红梅用户使用许可及用户协议</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 跳转到模式选择页
function goToModeSelect() {
  router.push('/mode-select')
}
function goToHome() {
  router.push('/home') // 跳转到 /home
}
</script>

<style scoped>
/* 全屏容器，占满整个视口 */
.home-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #000;
}

/* 背景图区域，全屏展示 */
.hero-section {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 背景图：全屏铺满，无拉伸 */
.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* 按钮容器：绝对定位在底部居中 */
.enter-btn-container {
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

/* 进入探索按钮：完全匹配参考图样式 */
.enter-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  transition: all 0.3s ease;
}

/* 按钮主文字 */
.btn-text {
  display: block;
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
  letter-spacing: 8px;
  margin-bottom: 4px;
}

/* 按钮英文副标题 */
.btn-subtext {
  display: block;
  font-size: 16px;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
  letter-spacing: 4px;
  opacity: 0.9;
}

/* 按钮hover效果 */
.enter-btn:hover .btn-text {
  color: #ffd700;
  transform: scale(1.05);
}

/* 右侧悬浮按钮组 */
.float-buttons {
  position: absolute;
  top: 5%;
  right: 2%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
}

.float-btn {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 2px solid rgba(255,255,255,0.8);
  background: rgba(0,0,0,0.2);
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.float-btn:hover {
  background: rgba(192, 57, 43, 0.8);
  border-color: #fff;
}

/* 左下角版本信息 */
.version-info {
  position: absolute;
  bottom: 2%;
  left: 2%;
  color: #fff;
  font-size: 12px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
  z-index: 10;
}

.agreement {
  margin-top: 4px;
  font-size: 10px;
  opacity: 0.8;
}

/* 响应式适配：手机端缩小字号 */
@media (max-width: 768px) {
  .btn-text {
    font-size: 24px;
    letter-spacing: 6px;
  }
  .btn-subtext {
    font-size: 14px;
    letter-spacing: 3px;
  }
  .float-btn {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
}
</style>