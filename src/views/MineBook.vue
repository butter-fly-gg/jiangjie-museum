<template>
  <div class="booking-page">
    <!-- 视频区域 -->
    <div class="video-section">
      <div class="back-btn" @click="$router.push('/mine')" title="返回我的页面">
        <img src="../imgs/返回.png" alt="返回" class="nav-icon">
      </div>
      <div class="share-btn" @click="handleShare" title="分享页面">
        <img src="../imgs/分享.png" alt="分享" class="nav-icon">
      </div>
      <video
        ref="videoPlayer"
        class="video-player"
        poster="../imgs/topmb.png"
        preload="metadata"
        @click="toggleVideoPlay"
        @ended="handleVideoEnd"
      >
        <source src="../imgs/video1.mp4" type="video/mp4">
        您的浏览器不支持HTML5视频播放
      </video>
      <div class="play-btn" @click="toggleVideoPlay" v-if="!videoPlaying">▶</div>
    </div>

    <!-- 标题栏 -->
    <div class="title-bar">
      <div class="title-content">
        <div class="main-title">江姐生平事迹陈列展主馆</div>
        <div class="tags">红色教育基地 · 沉浸式展馆 | 自贡名片</div>
      </div>
      <div class="rating"><img src="../imgs/图层 16.png" alt=""><img src="../imgs/图层 16.png" alt=""><img src="../imgs/图层 16.png" alt=""><img src="../imgs/图层 16.png" alt=""><img src="../imgs/图层 16.png" alt=""></div>
    </div>

    <!-- 新增：自贡名片+抢光体验功能栏 -->
    <div class="feature-bar">
      <div class="feature-tag">自贡名片</div>
      <div class="feature-label">第九批</div>
      <button class="experience-btn">抢先体验</button>
    </div>

    <!-- 优惠横幅 -->
    <div class="banner">
      <span>开通自贡文旅一卡通，预估此次出行共节省</span>
      <span class="discount">99元</span>
    </div>

    <!-- 预约卡片 -->
    <div class="booking-card">
      <!-- 原有预约卡片内容保持不变 -->
      <div class="card-header">
        <span class="main-title">预约详情</span>
        <span class="sub-header"><img src="../imgs/图层 16.png" >当前场馆:江姐生平事迹陈列展主馆</span>
      </div>
      <div class="tab-nav">
        <div class="tab active" @click="activeTab = 'date'">行程日期</div>
        <div class="tab" @click="activeTab = 'goods'">场馆商品</div>
        <div class="tab" @click="activeTab = 'other'">其他旅程</div>
      </div>

      <!-- 选择区域 -->
      <div class="select-area">
        <div class="date-select">
          <div class="date-header">
            <span>当前选择
              <img src="../imgs/日历.png" alt="日历" class="small-icon">
            </span>
            <select class="month-select">
              <option value="2024-10">2024-10月</option>
              <option value="2024-11" selected>2024-11月</option>
              <option value="2024-12">2024-12月</option>
              <option value="2025-01">2025-01月</option>
            </select>
          </div>
          <div class="date-grid">
            <div class="date-item sold-out">售罄</div>
            <div class="date-item" :class="{active: selectedDate === '10.04'}" @click="selectDate('10.04')">周五SAT<br />10.04</div>
            <div class="date-item" :class="{active: selectedDate === '10.05'}" @click="selectDate('10.05')">周六SAT<br />10.05</div>
            <div class="date-item" :class="{active: selectedDate === '10.06'}" @click="selectDate('10.06')">周日SUN<br />10.06</div>
            <div class="date-item" :class="{active: selectedDate === '10.07'}" @click="selectDate('10.07')">周一MON<br />10.07</div>
          </div>
        </div>

        <div class="time-select">
          <div class="time-label">
            预计时间
            <img src="../imgs/闹钟.png" alt="闹钟" class="small-icon">
          </div>
          <div class="time-grid">
            <div class="time-item" :class="{active: selectedTime === '10:00 am'}" @click="selectTime('10:00 am')">10:00 am</div>
            <div class="time-item" :class="{active: selectedTime === '11:00 am'}" @click="selectTime('11:00 am')">11:00 am</div>
            <div class="time-item" :class="{active: selectedTime === '12:00 pm'}" @click="selectTime('12:00 pm')">12:00 pm</div>
            <div class="time-item" :class="{active: selectedTime === '01:00 pm'}" @click="selectTime('01:00 pm')">01:00 pm</div>
            <div class="time-item" :class="{active: selectedTime === '02:00 pm'}" @click="selectTime('02:00 pm')">02:00 pm</div>
          </div>
        </div>

        <div class="person-select">
          <div class="person-label">
            同行人员
            <img src="../imgs/同行人员.png" alt="同行" class="small-icon">
          </div>
          <div class="person-grid">
            <div class="person-item" :class="{active: selectedPerson === 1}" @click="selectPerson(1)">1人</div>
            <div class="person-item" :class="{active: selectedPerson === 2}" @click="selectPerson(2)">2人</div>
            <div class="person-item" :class="{active: selectedPerson === 3}" @click="selectPerson(3)">3人</div>
            <div class="person-item" :class="{active: selectedPerson === 4}" @click="selectPerson(4)">4人</div>
            <div class="person-item" :class="{active: selectedPerson === 5}" @click="selectPerson(5)">5人</div>
          </div>
        </div>
      </div>

      <!-- 合计栏 -->
      <div class="total-bar">
        <div class="total-info">
          <div class="price">合计:¥{{ totalPrice.toFixed(2) }}</div>
          <div class="discount-text">优惠减:¥10.00 <a href="#" class="detail">优惠明细</a></div>
        </div>
        <button class="booking-btn" @click="showModal = true">立即预约({{ selectedPerson }})</button>
      </div>
    </div>

    <!-- 预约成功弹窗 -->
    <div class="modal" v-if="showModal" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-icon"><img src="../imgs/预约成功.png" alt=""></div>
        <div class="modal-title">恭喜您,预约成功</div>
        <div class="modal-buttons">
          <button class="modal-btn primary" @click="$router.push('/mine/book/detail')"  title="查看" >前去查看</button>
          <button class="modal-btn secondary" @click="closeModal">取消预约</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookingPage",
  data() {
    return {
      showModal: false,
      activeTab: "date",
      selectedDate: "10.04",
      selectedTime: "12:00 pm",
      selectedPerson: 4,
      basePrice: 30.00,
      discount: 10.00,
      videoPlaying: false
    };
  },
  computed: {
    totalPrice() {
      return this.selectedPerson * this.basePrice - this.discount;
    }
  },
  methods: {
    toggleVideoPlay() {
      const video = this.$refs.videoPlayer;
      if (video) {
        this.videoPlaying ? video.pause() : video.play();
        this.videoPlaying = !this.videoPlaying;
      }
    },
    handleVideoEnd() {
      this.videoPlaying = false;
      this.$refs.videoPlayer.currentTime = 0;
    },
    handleShare() {
      if (navigator.share) {
        navigator.share({
          title: "江姐生平事迹陈列展主馆",
          text: "推荐预约江姐生平事迹陈列展，红色教育必去！",
          url: window.location.href
        }).catch(() => alert("分享功能暂不可用"));
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => alert("链接已复制，可手动分享"));
      }
    },
    selectDate(date) { 
      this.selectedDate = date; 
    },
    selectTime(time) { 
      this.selectedTime = time; 
    },
    selectPerson(num) { 
      this.selectedPerson = num; 
    },
    closeModal() { 
      this.showModal = false; 
    }
  }
};
</script>

<!-- 全局样式 -->
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body, html {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f0e6;
  font-family: "Microsoft Yahei", sans-serif;
}
</style>

<!-- 组件样式 -->
<style scoped>
/* 页面容器 - 全屏铺满，无内边距 */
.booking-page {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f0e6;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

/* 视频区域 - 全屏宽度 */
.video-section {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
}
@media (min-width: 768px) {
  .video-section { 
    height: 450px; /* 网页端视频更高，填充空间 */
  }
}
.back-btn, .share-btn {
  position: absolute;
  top: 10px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  cursor: pointer;
}
.back-btn { left: 10px; }
.share-btn { right: 10px; }
.nav-icon { width: 18px; height: 18px; object-fit: contain; }
.video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #000;
  cursor: pointer;
}
.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  background: transparent;
  border: 2px solid #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #ffffff;
  cursor: pointer;
  z-index: 9;
}

/* 标题栏 - 全屏宽度 */
.title-bar {
  width: 100%;
  background-color: #E4DFC7;
  color: #45423A;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px 20px 0 0;
}
.title-content .main-title {
  font-size: 15px;
  font-weight: bold;
  line-height: 1.2;
}
.title-content .tags {
  font-size: 11px;
  opacity: 0.9;
  margin-top: 3px;
}
.rating img{
  width: 10px;
  height: 10px;
}

/* 自贡名片功能栏 - 全屏宽度 */
.feature-bar {
  width: 100%;
  background-color: #E4DFC7;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.feature-tag {
  background-color: #a62b28;
  color: #ffffff;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 2px;
}
.feature-label {
  font-size: 12px;
  color: #666;
}
.experience-btn {
  background-color: #000;
  color: #ffffff;
  font-size: 12px;
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}
.experience-btn::after {
  content: ">";
  font-size: 10px;
}

/* 优惠横幅 - 全屏宽度 */
/* 优惠横幅 */
.banner {
  width: 100%;
  padding: 12px 16px 22px;
  background: url("../imgs/自贡mb.png") no-repeat center/cover;
  text-align: center;
  font-size: 14px;
  color: #fff;
  position: relative;
  overflow: visible;
  margin-bottom: -10px;
  z-index: 2;
  filter: opacity(0.8); /* 透明度调整，0.8是比较柔和的效果，可根据需要微调 */
}
.banner span {
  position: relative;
  z-index: 2;
}
.banner .discount {
  color: #f2ea04;
  font-weight: bold;
  margin-left: 4px;
}

/* 预约卡片 - 全屏宽度，无最大宽度限制 */
.booking-card {
  width: 100%;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  overflow: hidden;
  position: relative;
  z-index: 1;
  flex: 1; /* 填充剩余空间，消除底部留白 */
  display: flex;
  flex-direction: column;
}

/* 预约详情头部 */
.card-header {
  background-color: #ffffff;
  padding: 30px 16px 8px;
  display: flex;
  align-items: flex-end;
  gap: 8px;
}
.card-header .main-title {
  font-size: 15px;
  font-weight: bold;
  color: #333;
}
.card-header .sub-header {
  font-size: 11px;
  font-weight: normal;
  color: #666;
  background-color: #fff2cc;
  padding: 2px;
  border-radius: 4px;
  margin-bottom: 1px;
}
.card-header .sub-header img{
  width: 10px;
  height: 10px;
}

/* 标签导航 */
.tab-nav {
  display: flex;
  border-bottom: 1px solid #e5e0d5;
  background-color: #ffffff;
}
.tab {
  flex: 1;
  padding: 8px 0;
  text-align: center;
  font-size: 13px;
  color: #666;
  cursor: pointer;
}
.tab.active {
  color: #a62b28;
  border-bottom: 2px solid #a62b28;
  font-weight: bold;
}

/* 选择区域 - 填充剩余空间 */
.select-area {
  padding: 14px 16px;
  background-color: #f5f0e6;
  flex: 1; /* 填充空间，消除底部留白 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 元素垂直居中，更饱满 */
}
.small-icon {
  width: 14px;
  height: 14px;
  margin-left: 6px;
  vertical-align: middle;
}

/* 日期选择 */
.date-select {
  margin-bottom: 14px;
}
.date-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #333;
  margin-bottom: 8px;
}
.month-select {
  font-size: 12px;
  padding: 2px 8px;
  border: 1px solid #d9ce15;
  border-radius: 4px;
  background: #fff;
  color: #b7791f;
  outline: none;
}
.date-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
  width: 100%; /* 全屏宽度 */
}
.date-item {
  text-align: center;
  padding: 8px 0;
  background: #fff;
  border-radius: 4px;
  font-size: 12px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}
.date-item.sold-out {
  background: #f8d7da;
  color: #721c24;
  cursor: not-allowed;
  opacity: 0.8;
}
.date-item.active {
  background: #a62b28;
  color: #ffffff;
}

/* 时间选择 */
.time-select {
  margin-bottom: 14px;
}
.time-label, .person-label {
  font-size: 13px;
  color: #333;
  margin-bottom: 8px;
}
.time-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
  width: 100%; /* 全屏宽度 */
}
.time-item {
  text-align: center;
  padding: 8px 0;
  background: #fff;
  border: 1px solid #e5e0d5;
  border-radius: 4px;
  font-size: 12px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}
.time-item.active {
  background: #a62b28;
  color: #ffffff;
  border-color: #a62b28;
}

/* 人数选择 */
.person-select {
  margin-bottom: 0;
}
.person-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
  width: 100%; /* 全屏宽度 */
}
.person-item {
  text-align: center;
  padding: 10px 0;
  background: #fff;
  border: 1px solid #e5e0d5;
  border-radius: 4px;
  font-size: 12px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}
.person-item.active {
  background: #a62b28;
  color: #ffffff;
  border-color: #a62b28;
}

/* 合计栏 */
.total-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background-color: #f5e6cc;
  border-top: 1px solid #e5e0d5;
  width: 100%; /* 全屏宽度 */
}
.total-info .price {
  font-size: 16px;
  font-weight: bold;
  color: #a62b28;
  line-height: 1.3;
}
.total-info .discount-text {
  font-size: 11px;
  color: #666;
  margin-top: 2px;
}
.discount-text .detail {
  color: #a62b28;
  text-decoration: none;
  margin-left: 4px;
}
.booking-btn {
  background-color: #a62b28;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

/* 弹窗样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  width: 85%;
  max-width: 320px;
  background: #fff;
  border-radius: 12px;
  padding: 25px 20px;
  text-align: center;
}
.modal-icon {
  width: 50px;
  height: 50px;
  color: #155724;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin: 0 auto 18px;
}
.modal-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}
.modal-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
}
.modal-btn {
  flex: 1;
  padding: 8px 0;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}
.modal-btn.primary {
  background: #a62b28;
  color: #fff;
}
.modal-btn.secondary {
  background: #f5f0e6;
  color: #333;
}

 /* 网页端适配 - 全屏铺满+元素放大 */
@media (min-width: 768px) {
  /* 选择项网格列数增加+间距加大+尺寸放大 */
  .date-grid, .time-grid, .person-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); /* 自动适配列数，最小宽度120px */
    gap: 25px; /* 更大的间距 */
  }
  .date-item, .time-item, .person-item {
    padding: 20px 0; /* 按钮更高 */
    font-size: 18px; /* 文字更大 */
    border-radius: 8px;
    min-width: 120px; /* 确保每个选项足够宽 */
  }

  /* 文字放大 */
  .date-header, .time-label, .person-label {
    font-size: 18px;
    margin-bottom: 15px;
  }
  .card-header .main-title {
    font-size: 22px;
  }
  .card-header .sub-header {
    font-size: 16px;
  }
  .tab {
    font-size: 18px;
    padding: 15px 0;
  }
  .total-info .price {
    font-size: 22px;
  }
  .total-info .discount-text {
    font-size: 16px;
  }

  /* 按钮放大 */
  .booking-btn {
    padding: 15px 30px;
    font-size: 18px;
    border-radius: 8px;
  }
  .feature-tag, .feature-label, .experience-btn {
    font-size: 16px;
  }
  .experience-btn {
    padding: 8px 20px;
  }
  .banner {
    font-size: 18px;
    padding: 20px 30px 30px;
  }

  /* 播放按钮放大 */
  .play-btn {
    width: 100px;
    height: 100px;
    font-size: 36px;
  }
  .nav-icon {
    width: 24px;
    height: 24px;
  }
  .back-btn, .share-btn {
    width: 48px;
    height: 48px;
  }
}
</style>