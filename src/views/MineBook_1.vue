<template>
  <div class="booking-page">
    <!-- 顶部导航 -->
    <div class="header">
      <span class="title">我的当前预约</span>
      <button class="close-btn" @click="$router.push('/mine/book')">×</button>
    </div>

    <!-- 完整的参观票容器 -->
    <div class="ticket-container">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">江姐生平<br>事迹陈列展主馆</h2>
        </div>
        <div class="card-content">
          <div class="basic-info">
            <div class="info-item">
              <span class="value">9629</span>
              <hr>
              <span class="label">预约手机号</span>
            </div>
            <div class="info-item code-item">
              <span class="label">核销码</span>
              <span class="code">78116013</span>
            </div>
            <div class="info-item">
              <span class="value">14:30</span>
              <hr>
              <span class="label">预计抵达时间</span>
            </div>
          </div>
          <div class="feature-bar">
            <span class="feature-tag">✓ 随心退</span>
            <span class="feature-tag">✓ 可帮订</span>
            <span class="feature-tag">✓ 请于游玩当天16:30前入馆</span>
          </div>
          <div class="visit-info">
            <div class="info-item">
              <span class="label">参观时间</span>
              <span class="value">10 26</span>
            </div>
            <div class="info-item">
              <span class="label">同行人数</span>
              <span class="value">3</span>
            </div>
          </div>
        </div>
      </div>
      <div class="dashed-divider"></div>
      <div class="qrcode-section">
        <img src="../imgs/二维码.png" alt="预约二维码" class="qrcode">
        <div class="qrcode-label">20241026 - 1 - 1</div>
        <button class="refresh-btn" @click="refreshQrcode">刷新二维码</button>
      </div>
    </div>

    <!-- 底部按钮与印章容器 -->
    <div class="bottom-container">
      <div class="footer-buttons">
        <button class="btn cancel-btn" @click="cancelBooking"><img src="../imgs/取消预约.png" alt="取消预约"></button>
        <button class="btn save-btn"><img src="../imgs/保存至本地.png" alt="保存至本地"></button>
      </div>
      <div class="seal">
        <img src="../imgs/欢迎.png" alt="欢迎印章">
      </div>
    </div>
  </div>
</template>

<script setup>
const refreshQrcode = () => {
  console.log('刷新二维码')
}

const cancelBooking = () => {
  console.log('取消预约')
}
</script>

<style scoped>
/* 基础布局 - 全屏铺满，稳定基准 */
.booking-page {
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background: #d6e4f0;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  position: relative;
  padding-bottom: 160px;
  box-sizing: border-box;
  overflow-x: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  color: #333;
}

.title {
  font-size: clamp(16px, 2vw, 24px);
  font-weight: 600;
}

.close-btn {
  font-size: clamp(20px, 3vw, 30px);
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 票卡容器 - 负边距固定px，与印章精准接触 */
.ticket-container {
  background: rgba(255, 255, 255, 0.6) url('../imgs/1（背景图）.png') no-repeat center/cover;
  border-radius: clamp(8px, 2vw, 20px);
  overflow: hidden;
  margin: 0 auto -50px;
  padding: 0;
  max-width: 600px;
  width: calc(100% - 60px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}

.card {
  background: transparent;
}

.card-header {
  background: rgba(255, 255, 255, 0.8) url('../imgs/1（背景图）.png') no-repeat center/cover;
  color: #333;
  padding: clamp(20px, 4vw, 40px) clamp(15px, 3vw, 30px);
  text-align: left;
}

.card-title {
  font-size: clamp(18px, 2.5vw, 28px);
  font-weight: bold;
  line-height: 1.4;
}

.basic-info {
  display: flex;
  justify-content: space-between;
  padding: clamp(15px, 2vw, 20px) clamp(15px, 3vw, 30px);
  flex-wrap: wrap;
  gap: 15px;
}

.info-item {
  text-align: center;
  flex: 1;
  min-width: 80px;
}

.code-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.label {
  display: block;
  font-size: clamp(12px, 1.5vw, 16px);
  color: #666;
  margin-bottom: 5px;
}

.value {
  font-size: clamp(14px, 2vw, 20px);
  font-weight: 500;
}

.code {
  background: #333;
  color: #fff;
  padding: clamp(5px, 1vw, 8px) clamp(10px, 1.5vw, 15px);
  border-radius: clamp(3px, 0.8vw, 6px);
  font-family: monospace;
  font-weight: bold;
  font-size: clamp(14px, 2vw, 20px);
}

.feature-bar {
  background: #a62b28;
  color: #fff;
  padding: clamp(10px, 1.5vw, 15px) clamp(15px, 2vw, 20px);
  display: flex;
  justify-content: space-between;
  font-size: clamp(12px, 1.5vw, 14px);
  flex-wrap: wrap;
  gap: 10px;
}

.visit-info {
  display: flex;
  justify-content: space-between;
  padding: clamp(15px, 2vw, 20px) clamp(15px, 3vw, 30px);
  margin: 0;
  flex-wrap: wrap;
  gap: 20px;
}

.dashed-divider {
  position: relative;
  height: clamp(8px, 1.5vw, 15px);
  margin: clamp(3px, 1vw, 8px);
  border-top: clamp(1px, 0.3vw, 3px) dashed #999;
}

.dashed-divider::before {
  content: '';
  position: absolute;
  left: -10px;
  top: -10px;
  width: 20px;
  height: 20px;
  background: #d6e4f0;
  border-radius: 50%;
}

.dashed-divider::after {
  content: '';
  position: absolute;
  right: -10px;
  top: -10px;
  width: 20px;
  height: 20px;
  background: #d6e4f0;
  border-radius: 50%;
}

/* 二维码区域 - 最高层级，防止遮挡 */
.qrcode-section {
  background: transparent;
  padding: 25px clamp(15px, 3vw, 30px);
  text-align: center;
  margin: 0;
  position: relative;
  z-index: 3;
}

.qrcode {
  width: clamp(180px, 25vw, 280px);
  height: clamp(180px, 25vw, 280px);
  margin: 0 auto 15px;
  display: block;
}

.qrcode-label {
  font-size: clamp(14px, 1.5vw, 16px);
  color: #666;
  margin-bottom: 15px;
}

.refresh-btn {
  background: transparent;
  border: clamp(1px, 0.2vw, 2px) solid #070605e3;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: clamp(14px, 1.5vw, 16px);
  color: #333;
}

/* 底部容器 - 固定宽度基准，定位不偏移 */
.bottom-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.footer-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.btn {
  width: auto;
  height: auto;
  padding: 0;
  border: none;
  background: transparent !important;
  cursor: pointer;
}

.cancel-btn img, .save-btn img {
  width: clamp(100px, 40vw, 200px);
  height: auto;
  object-fit: contain;
  display: block;
}

/* 印章 - 完整显示，与票卡精准接触 */
.seal {
  position: absolute;
  bottom: 70px;
  width: clamp(100px, 30vw, 150px);
  height: clamp(100px, 30vw, 150px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  box-shadow: none;
  z-index: 1;
}

.seal img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 移动端适配 - 仅微调尺寸，位置关系不变 */
@media (max-width: 768px) {
  .booking-page {
    padding: 15px;
    padding-bottom: 140px;
  }
  .ticket-container {
    width: calc(100% - 30px);
    margin: 0 auto -45px;
  }
  .qrcode {
    width: 180px;
    height: 180px;
  }
  .seal {
    bottom: 60px;
    width: 100px;
    height: 100px;
  }
  .footer-buttons {
    gap: 15px;
  }
  .cancel-btn img, .save-btn img {
    width: clamp(80px, 40vw, 120px);
  }
}
</style>