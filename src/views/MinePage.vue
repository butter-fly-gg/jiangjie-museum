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
// 引入Vue Router的useRouter方法
import { useRouter } from 'vue-router';

// 创建router实例
const router = useRouter();

// 菜单列表数据（包含图标样式类）
const menuList = ref([
  { title: '我的收藏', iconClass: 'icon-favorite' },
  { title: '出行预约', iconClass: 'icon-reserve', path: '/mine/book' }, // 新增path字段
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

// 菜单点击事件 - 新增路由跳转逻辑
const handleMenuClick = (item) => {
  console.log(`点击了${item.title}`);
  // 判断当前菜单是否有跳转路径，有则跳转
  if (item.path) {
    router.push(item.path);
  }
  // 可在此处添加其他菜单的跳转逻辑
};
</script>

<style scoped>
/* 全局页面样式 - 核心修改：移除最大宽度限制，让页面铺满 */
.profile-page {
  min-height: 100vh;
  background-color: #f5f0e6;
  font-family: 'Microsoft Yahei', sans-serif;
  padding-bottom: 20px;
  /* 移除 max-width: 800px; 取消宽度限制 */
  margin: 0; /* 移除 auto 边距，让页面贴边 */
  width: 100%; /* 强制铺满宽度 */
}

/* 头部弧形背景与信息 */
.profile-header {
  position: relative;
  width: 100%; /* 确保头部铺满宽度 */
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

/* 标签切换栏 - 优化：左右间距改为百分比，适配大屏 */
.tabs {
  display: flex;
  margin: 16px 2% 0; /* 原12px改为2%，适配不同宽度屏幕 */
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

/* 功能菜单区 - 基础样式 - 优化：左右间距改为百分比 */
.menu-list {
  margin: 12px 2%; /* 原12px改为2%，适配大屏 */
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  height: auto;
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

/* ========== 核心修改：网页版适配 ========== */
/* 当屏幕宽度大于768px（网页版）时生效 */
@media (min-width: 768px) {
  /* 1. 增高菜单项的内边距，提升整体高度 */
  .menu-item {
    padding: 24px 28px; /* 原16px 20px，增大上下/左右内边距 */
    font-size: 16px; /* 字体同步放大，视觉更协调 */
  }

  /* 2. 增大菜单图标尺寸，匹配增高后的菜单项 */
  .menu-icon {
    width: 24px;
    height: 24px; /* 原20px */
    margin-right: 16px; /* 原12px */
  }

  /* 3. 调整菜单列表的间距和尺寸，填充空白 */
  .menu-list {
    margin: 20px 2%; /* 原12px改为2%，保持左右间距适配 */
    border-radius: 16px; /* 圆角同步放大，更适配大屏 */
  }

  /* 4. 标签栏同步优化，匹配整体比例 */
  .tabs {
    margin: 24px 2% 0; /* 原16px改为2%，保持间距一致 */
    padding: 6px; /* 原4px，增大内边距 */
  }
  .tab-item {
    padding: 12px 0; /* 原8px，增高标签栏 */
    font-size: 16px; /* 原15px，字体放大 */
  }

  /* 5. 头部区域轻微调整，适配大屏比例 */
  .profile-header {
    height: 320px; /* 原280px，增高头部，整体更协调 */
  }
  .avatar {
    width: 90px;
    height: 90px; /* 原80px，头像放大 */
  }
  .stat-number {
    font-size: 18px; /* 原16px，统计数字放大 */
  }
  .stat-label {
    font-size: 14px; /* 原12px，统计标签放大 */
  }
}

/* 补充：超宽屏适配（可选），避免内容过度拉伸 */
@media (min-width: 1200px) {
  .profile-header {
    height: 380px; /* 进一步增高头部，适配超宽屏 */
  }
  .menu-item {
    padding: 28px 32px; /* 进一步增大菜单项内边距 */
    font-size: 18px;
  }
  .menu-icon {
    width: 28px;
    height: 28px;
  }
}
</style>