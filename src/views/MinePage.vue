<template>
  <div class="profile-page">
    <!-- 顶部弧形背景与个人信息 -->
    <div class="profile-header">
      <img src="../imgs/豆包.png" alt="背景图" class="header-bg">
      <div class="header-overlay"></div>

      <!-- 客服按钮 -->
      <div class="sign-btn1">
        <img src="../imgs/客服.png" alt="签到" >
      </div>
      <!-- 签到按钮 -->
      <div class="sign-btn">
        <img src="../imgs/minepage签到.png" alt="签到" >
      </div>

      <!-- 头像与状态 -->
      <div class="avatar-container">
        <img src="../imgs/图层 26.png" alt="头像" class="avatar">
        <div class="status-text">*对方正在使坏中*</div>
        <div class="uid">UID 24728499001</div>
      </div>

      <!-- 数据统计 -->
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-number">8</span>
          <span class="stat-label">关注</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">48</span>
          <span class="stat-label">粉丝</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">88</span>
          <span class="stat-label">获赞</span>
        </div>
      </div>
    </div>

    <!-- 标签切换栏 -->
    <div class="tabs">
      <div class="tab-item active" @click="switchTab('personal')">个人</div>
      <div class="tab-item" @click="switchTab('article')">文章</div>
      <div class="tab-item" @click="switchTab('like')">喜欢</div>
    </div>

    <!-- 功能菜单区 -->
    <div class="menu-list">
      <div class="menu-item" v-for="item in menuList" :key="item.title" @click="handleMenuClick(item)">
        <span class="menu-icon" :class="item.iconClass"></span>
        <span class="menu-title">{{ item.title }}</span>
        <span class="menu-arrow">→</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 菜单列表数据（包含图标样式类）
const menuList = ref([
  { title: '我的收藏', iconClass: 'icon-favorite' },
  { title: '出行预约', iconClass: 'icon-reserve' },
  { title: '历史订单', iconClass: 'icon-order' },
  { title: '我的活动', iconClass: 'icon-activity' },
  { title: '意见反馈', iconClass: 'icon-feedback' },
  { title: '设置', iconClass: 'icon-settings' }
]);

// 标签切换状态
const activeTab = ref('personal');

// 标签切换方法
const switchTab = (tabName) => {
  activeTab.value = tabName;
  console.log(`切换到${tabName}标签`);
};

// 菜单点击事件
const handleMenuClick = (item) => {
  console.log(`点击了${item.title}`);
  // 可在此处添加路由跳转逻辑
};
</script>

<style scoped>
/* 全局页面样式 */
.profile-page {
  min-height: 100vh;
  background-color: #f5f0e6;
  font-family: 'Microsoft Yahei', sans-serif;
  padding-bottom: 20px;
}

/* 头部弧形背景与信息 */
.profile-header {
  position: relative;
  width: 100%;
  height: 280px;
  border-bottom-left-radius: 70px;
  border-bottom-right-radius: 50px;
  overflow: hidden;
}
.header-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.85);
}
.header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.15);
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
}

/* 客服按钮 */
.sign-btn1 {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 10;
}
.sign-btn1 img {
  width: 30px;
  height: 30px;
  object-fit: contain; /* 保持图片比例，避免拉伸 */
}
/* 签到按钮 */
.sign-btn {
  position: absolute;
  top: 30px;
  right: 25px;
  width:80px;
  height:30px;
}

/* 头像与状态 */
.avatar-container {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -20%);
  text-align: center;
  color: #fff;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #fff;
  margin-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.status-text {
  font-size: 14px;
  margin-bottom: 4px;
  color: #ffe082;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.uid {
  font-size: 12px;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* 数据统计 */
.stats-bar {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 40px;
  color: #fff;
}
.stat-item {
  text-align: center;
}
.stat-number {
  display: block;
  font-size: 16px;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.stat-label {
  font-size: 12px;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* 标签切换栏 */
.tabs {
  display: flex;
  margin: 16px 12px 0;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 4px;
}
.tab-item {
  flex: 1;
  padding: 8px 0;
  text-align: center;
  font-size: 15px;
  color: #666;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
}
.tab-item.active {
  background-color: #fff;
  color: #c43e3a;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 功能菜单区 */
.menu-list {
  margin: 12px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0e8e0;
  font-size: 15px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s;
}
.menu-item:last-child {
  border-bottom: none;
}
.menu-item:active {
  background-color: #f8f5f0;
}

/* 菜单图标 */
.menu-icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  display: inline-block;
}
.icon-favorite {
  background: url('../imgs/图层\ 16.png') no-repeat center;
  background-size: contain;
}
.icon-reserve {
  background: url('../imgs/图层\ 17.png') no-repeat center;
  background-size: contain;
}
.icon-order {
  background: url('../imgs/图层\ 18.png') no-repeat center;
  background-size: contain;
}
.icon-activity {
  background: url('../imgs/图层\ 19.png') no-repeat center;
  background-size: contain;
}
.icon-feedback {
  background: url('../imgs/图层\ 20.png') no-repeat center;
  background-size: contain;
}
.icon-settings {
  background: url('../imgs/图层\ 21.png') no-repeat center;
  background-size: contain;
}

.menu-arrow {
  margin-left: auto;
  color: #999;
  font-size: 12px;
}
</style>