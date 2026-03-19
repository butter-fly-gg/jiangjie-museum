<template>
  <div class="ar-page">
    <!-- 顶部图像区域 -->
    <div class="image-container">
      <img :src="require('@/assets/images/beautiful/xinhuaribao.jpg')" alt="江姐展览" class="exhibit-image" />
      
      <!-- 蒙版 -->
      <div class="overlay"></div>
      
      <!-- 顶部提示文字 -->
      <div class="top-text">
        <div class="location">📍 已开启实时定位，为您定位至当前章节</div>
        <div class="chapter-title">求学立志 第四节<br /><small>part.4</small></div>
      </div>

      <!-- 中部引言文字 -->
      <div class="quotes">
        <div class="quote-item">
          <div class="quote-text">你可以通过掌握知识去改变命运，但是天下像你这样穷苦的孩子很多，他们怎么办？学习就是要思考如何去改变这种社会现象。</div>
          <div class="quote-author">——丁光夫</div>
        </div>
        
        <div class="quote-item">
          <div class="quote-text">在城市里没有文化和知识根本待不下去，只有知识才能改变自己。</div>
          <div class="quote-author">——李义铭</div>
        </div>
        
        <div class="quote-item">
          <div class="quote-text">她不留金钱给儿孙买辱。</div>
          <div class="quote-author">——刘子如</div>
        </div>
      </div>

      <!-- 导航按钮 -->
      <button class="nav-btn prev" @click="prevChapter">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button class="nav-btn next" @click="nextChapter">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>

    <!-- 底部内容 -->
    <div class="content-area">
      <div class="left-content">
        <button class="listen-btn" @click="playAudio">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
          听她说
        </button>
        
        <h1 class="main-title">追求真理</h1>
        <div class="sub-title">HUNGER FOR TRUTH</div>
        
        <div class="description">
          <p>抗日战争全面爆发后，为疏散转移，南岸中学迁到将近，江竹筠并没有随学校迁移。</p>
          <p>1938年，她主动订阅《新华日报》，开始认识了解共产党。</p>
        </div>
        
        <div class="rating">
          <span v-for="n in 5" :key="n" class="star" :class="{ active: n <= rating }">
            ★
          </span>
        </div>
      </div>

      <div class="right-content">
        <button class="ar-btn" @click="goToAR">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5Z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
          <div class="btn-text">
            <div>立即AR</div>
            <div>沉浸式体验</div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const rating = ref(3); // 默认3颗星

const prevChapter = () => {
  console.log('跳转到前一章');
  // 这里可以添加实际的章节切换逻辑
};

const nextChapter = () => {
  console.log('跳转到后一章');
  // 这里可以添加实际的章节切换逻辑
};

const playAudio = () => {
  console.log('播放音频');
  // 这里可以添加实际的音频播放逻辑
};

const goToAR = () => {
  router.push('/ar/experience');
};
</script>

<style scoped>
.ar-page {
  min-height: 100vh;
  background: #f5f0e6; /* 复古米黄色纸张纹理背景 */
  font-family: 'Microsoft YaHei', sans-serif;
  padding-bottom: 20px;
}

.image-container {
  position: relative;
  width: 100%;
  height: 60vh;
  overflow: hidden;
  border-radius: 16px;
  margin: 0 16px 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.exhibit-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.4);
}

.top-text {
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: right;
  z-index: 2;
  color: #666;
  font-size: 12px;
  line-height: 1.5;
}

.location {
  background: rgba(255, 255, 255, 0.8);
  padding: 4px 8px;
  border-radius: 12px;
  margin-bottom: 4px;
}

.chapter-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  background: rgba(255, 255, 255, 0.8);
  padding: 6px 12px;
  border-radius: 12px;
}

.quotes {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  z-index: 2;
  text-align: center;
}

.quote-item {
  margin-bottom: 20px;
}

.quote-item:last-child {
  margin-bottom: 0;
}

.quote-text {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  margin-bottom: 6px;
  background: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 8px;
}

.quote-author {
  font-size: 12px;
  color: #888;
  font-style: italic;
}

.nav-btn {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(100, 100, 100, 0.7);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 3;
  top: 50%;
  transform: translateY(-50%);
}

.nav-btn:hover {
  background: rgba(80, 80, 80, 0.8);
}

.prev {
  left: 20px;
}

.next {
  right: 20px;
}

.content-area {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  margin: 0 16px;
}

.left-content {
  width: 100%;
}

.listen-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 18px;
  background: white;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.listen-btn:hover {
  border-color: #d32f2f;
  color: #d32f2f;
}

.main-title {
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #333;
  margin: 16px 0;
}

.sub-title {
  font-size: 18px;
  color: #d32f2f;
  margin: 0 0 20px 0;
  position: relative;
  padding-left: 20px;
  font-family: sans-serif;
  text-transform: uppercase;
}

.sub-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 2px;
  background: #d32f2f;
}

.description {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin: 20px 0;
}

.description p {
  margin: 10px 0;
}

.rating {
  display: flex;
  gap: 4px;
  margin-top: 10px;
}

.star {
  font-size: 20px;
  color: #ccc;
}

.star.active {
  color: #d32f2f;
}

.right-content {
  width: 100%;
  display: flex;
  justify-content: center;
}

.ar-btn {
  width: 180px;
  height: 120px;
  background: linear-gradient(135deg, #c62828, #b71c1c);
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(198, 40, 40, 0.4);
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.ar-btn:hover {
  transform: translateY(-2px);
}

.ar-btn::before {
  content: '';
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  background: inherit;
  transform: rotate(45deg);
  z-index: -1;
}

.ar-btn::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: -10px;
  width: 20px;
  height: 20px;
  background: inherit;
  transform: rotate(45deg);
  z-index: -1;
}

.ar-btn svg {
  margin-bottom: 8px;
}

.btn-text {
  text-align: center;
}

.btn-text div {
  margin: 2px 0;
}

/* 响应式设计 */
@media (min-width: 768px) {
  .content-area {
    flex-direction: row;
  }
  
  .left-content {
    flex: 1;
    width: auto;
  }
  
  .right-content {
    width: auto;
  }
  
  .main-title {
    font-size: 48px;
  }
  
  .sub-title {
    font-size: 20px;
  }
  
  .description {
    font-size: 16px;
  }
  
  .quote-text {
    font-size: 18px;
  }
}
</style>