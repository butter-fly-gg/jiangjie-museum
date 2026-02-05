<template>
  <div class="beautiful-page">
    <!-- Hero 区域 -->
    <div class="hero">
      <img class="hero-bg" :src="require('@/assets/images/beautiful/bg-zigong.jpg')" alt="自贡全景" />
      <div class="hero-mask"></div>

      <div class="hero-title">
        <div class="hero-title-main">大美自贡</div>
        <div class="hero-title-sub">
          <span class="hero-title-sub-text">更多自贡旅游线路推荐</span>
        </div>
      </div>

      <div class="hero-icon" aria-hidden="true">
        <div class="hero-icon-ring"></div>
      </div>
    </div>

    <!-- 内容区域（用 global.css 的 .content-area 包裹） -->
    <div class="content-area">
      <!-- 顶部马赛克卡片 -->
      <div class="top-mosaic">
        <div class="mosaic-card card-1" @click="goTo('/beautiful/map')">
          <img :src="require('@/assets/images/beautiful/travel-sky.jpg')" alt="出行天地" />
          <div class="mosaic-mask"></div>
          <div class="mosaic-text">
            <div class="mosaic-title">出行天地</div>
            <div class="mosaic-desc">自贡景点概览</div>
          </div>
          <div class="mosaic-flower" aria-hidden="true">❀</div>
        </div>

        <div class="mosaic-card card-2" @click="goTo('/activity')">
          <img :src="require('@/assets/images/beautiful/chanyi.jpg')" alt="四海山珍" />
          <div class="mosaic-mask"></div>
          <div class="mosaic-text">
            <div class="mosaic-title">四海山珍</div>
            <div class="mosaic-desc">寻找自贡特色美食</div>
          </div>
          <div class="mosaic-flower" aria-hidden="true">❀</div>
        </div>

        <div class="mosaic-card card-3" @click="goTo('/beautiful/ar')">
          <img :src="require('@/assets/images/beautiful/food.jpg')" alt="美食" />
        </div>

        <div class="mosaic-card card-4" @click="goTo('/activity')">
          <img :src="require('@/assets/images/beautiful/leisure.jpg')" alt="禅意居旅" />
          <div class="mosaic-mask"></div>
          <div class="mosaic-text">
            <div class="mosaic-title">禅意居旅</div>
            <div class="mosaic-desc">西式咖啡推荐</div>
          </div>
        </div>

        <div class="mosaic-card card-5" @click="goTo('/activity')">
          <img :src="require('@/assets/images/beautiful/more.jpg')" alt="更多选择" />
          <div class="mosaic-mask"></div>
          <div class="mosaic-text right">
            <div class="mosaic-title">更多选择</div>
            <div class="mosaic-desc">定制您的个性化自贡旅行</div>
          </div>
          <div class="mosaic-arrow" aria-hidden="true">&gt;&gt;</div>
        </div>
      </div>

      <!-- 热门景点标题 -->
      <div class="section-title">
        <span class="section-badge">HOT</span>
        <span class="section-text">时下最热门景点</span>
      </div>

      <!-- 景点马赛克 -->
      <div class="spots-mosaic">
        <div class="spot big" @click="goTo('/activity')">
          <img :src="require('@/assets/images/beautiful/salt-museum.jpg')" alt="盐业历史博物馆" />
          <div class="spot-mask"></div>
          <div class="spot-text">
            <div class="spot-title">盐业历史博物馆</div>
            <div class="spot-desc">最近一周定制人次最多</div>
          </div>
          <div class="spot-arrow" aria-hidden="true">&gt;&gt;</div>
        </div>

        <div class="spot wide" @click="goTo('/activity')">
          <img :src="require('@/assets/images/beautiful/pingle.jpg')" alt="平乐古镇" />
          <div class="spot-mask"></div>
          <div class="spot-text">
            <div class="spot-title">平乐古镇</div>
            <div class="spot-desc">本月被挖掘的宝藏旅游景点</div>
          </div>
          <div class="spot-arrow" aria-hidden="true">&gt;&gt;</div>
        </div>

        <div class="spot small" @click="goTo('/activity')">
          <img :src="require('@/assets/images/beautiful/rongxian.jpg')" alt="荣县大佛" />
          <div class="spot-mask"></div>
          <div class="spot-text">
            <div class="spot-title">荣县大佛</div>
            <div class="spot-desc">世界最大释迦摩尼佛</div>
          </div>
          <div class="spot-arrow" aria-hidden="true">&gt;&gt;</div>
        </div>

        <div class="spot small" @click="goTo('/activity')">
          <img :src="require('@/assets/images/beautiful/sanghai.jpg')" alt="桑海井" />
          <div class="spot-mask"></div>
          <div class="spot-text">
            <div class="spot-title">桑海井</div>
            <div class="spot-desc">到自贡必来井盐作坊</div>
          </div>
          <div class="spot-arrow" aria-hidden="true">&gt;&gt;</div>
        </div>

        <div class="spot wide2" @click="goTo('/activity')">
          <img :src="require('@/assets/images/beautiful/lantern.jpg')" alt="彩灯博物馆" />
          <div class="spot-mask"></div>
          <div class="spot-text">
            <div class="spot-title">彩灯博物馆</div>
            <div class="spot-desc">全国唯一 灯会历史与非遗技艺</div>
          </div>
          <div class="spot-arrow" aria-hidden="true">&gt;&gt;</div>
        </div>

        <div class="spot more" @click="goTo('/activity')">
          <img :src="require('@/assets/images/beautiful/memory-placeholder.jpg')" alt="更多自贡记忆" />
          <div class="spot-mask"></div>
          <div class="spot-text">
            <div class="spot-title">更多自贡记忆</div>
          </div>
          <div class="spot-more-icon" aria-hidden="true">✣</div>
        </div>
      </div>

      <!-- 晚食推荐 -->
      <div class="section-title">
        <span class="section-icon" aria-hidden="true">🍜</span>
        <span class="section-text">晚食推荐</span>
      </div>

      <div class="food-banner" @click="goTo('/beautiful/map')">
        <img class="food-bg" :src="require('@/assets/images/beautiful/food.jpg')" alt="晚食推荐" />
        <div class="food-mask"></div>
        <button class="food-btn" @click.stop="goTo('/beautiful/map')">查看个性化地图</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goTo(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
/* ========== 全局基础 ========== */
.beautiful-page {
  min-height: 100vh;
  background: #f3f3f3;
  font-family: 'Microsoft YaHei', sans-serif;
}

/* ========== Hero Banner ========== */
.hero {
  position: relative;
  height: 420px;
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
  font-size: 54px;
  font-weight: 800;
  letter-spacing: 2px;
}

.hero-title-sub {
  margin-top: 10px;
  position: relative;
  display: inline-block;
}

.hero-title-sub-text {
  position: relative;
  z-index: 2;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.95);
  padding: 6px 14px;
  border-radius: 999px;
}

.hero-title-sub::before {
  content: '';
  position: absolute;
  left: -6px;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  height: 18px;
  background: rgba(209, 64, 64, 0.75);
  filter: blur(0.2px);
  border-radius: 999px;
  z-index: 1;
}

.hero-icon {
  position: absolute;
  right: 26px;
  top: 118px;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  border: 2px solid rgba(255, 255, 255, 0.65);
  display: grid;
  place-items: center;
}

.hero-icon-ring {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.75);
}

/* ========== 内容区 ========== */
.content-area {
  margin-top: -170px;
  padding-bottom: 24px;
}

/* ========== 顶部马赛克 ========== */
.top-mosaic {
  max-width: 380px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.72);
  border-radius: 18px;
  padding: 12px;
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.14);
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 56px;
  gap: 10px;
  backdrop-filter: blur(8px);
}

.mosaic-card {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
}

.mosaic-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mosaic-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.55) 100%);
}

.mosaic-text {
  position: absolute;
  left: 12px;
  top: 12px;
  color: #fff;
  text-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
}

.mosaic-text.right {
  left: 14px;
  top: 18px;
}

.mosaic-title {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 1px;
}

.mosaic-desc {
  margin-top: 6px;
  font-size: 12px;
  opacity: 0.95;
}

.mosaic-flower {
  position: absolute;
  left: 14px;
  bottom: 12px;
  font-size: 22px;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 8px 16px rgba(0, 0, 0, 0.55);
}

.mosaic-arrow {
  position: absolute;
  right: 12px;
  bottom: 10px;
  font-size: 20px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 8px 16px rgba(0, 0, 0, 0.55);
}

.card-1 { grid-column: 1 / span 3; grid-row: 1 / span 3; }
.card-2 { grid-column: 4 / span 3; grid-row: 1 / span 2; }
.card-3 { grid-column: 4 / span 3; grid-row: 3 / span 2; }
.card-4 { grid-column: 1 / span 3; grid-row: 4 / span 2; }
.card-5 { grid-column: 4 / span 3; grid-row: 5 / span 2; }

/* ========== 标题 ========== */
.section-title {
  max-width: 380px;
  margin: 18px auto 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #3b3b3b;
  font-weight: 800;
}

.section-badge {
  font-size: 12px;
  line-height: 1;
  padding: 4px 6px;
  border-radius: 6px;
  background: #d9534f;
  color: #fff;
  font-weight: 900;
}

.section-icon {
  font-size: 18px;
}

.section-text {
  font-size: 20px;
  letter-spacing: 1px;
}

/* ========== 景点马赛克 ========== */
.spots-mosaic {
  max-width: 380px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 56px;
  gap: 10px;
}

.spot {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
}

.spot img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spot-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.72) 100%);
}

.spot-text {
  position: absolute;
  left: 12px;
  bottom: 12px;
  right: 34px;
  color: #fff;
  text-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
}

.spot-title {
  font-size: 16px;
  font-weight: 900;
}

.spot-desc {
  margin-top: 4px;
  font-size: 12px;
  opacity: 0.95;
}

.spot-arrow {
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 18px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.9);
}

.spot-more-icon {
  position: absolute;
  right: 12px;
  top: 12px;
  font-size: 34px;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 10px 18px rgba(0, 0, 0, 0.5);
}

.spot.big   { grid-column: 1 / span 3; grid-row: 1 / span 4; }
.spot.wide  { grid-column: 4 / span 3; grid-row: 1 / span 2; }
.spot.small { grid-column: span 3;     grid-row: span 2; }
.spot.wide2 { grid-column: 1 / span 4; grid-row: 5 / span 2; }
.spot.more  { grid-column: 5 / span 2; grid-row: 5 / span 2; }

/* ========== 美食横幅 ========== */
.food-banner {
  max-width: 380px;
  margin: 10px auto 0;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  height: 140px;
  cursor: pointer;
}

.food-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
}

.food-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.18) 0%, rgba(0, 0, 0, 0.08) 40%, rgba(0, 0, 0, 0.18) 100%);
}

.food-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 90px);
  max-width: 300px;
  height: 56px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.95);
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 2px;
  background: rgba(187, 27, 27, 0.82);
  box-shadow: 0 14px 28px rgba(122, 0, 0, 0.35);
  backdrop-filter: blur(2px);
}

/* ========== 响应式断点 ========== */

/* 手机端优化 */
@media (max-width: 360px) {
  .hero { height: 380px; }
  .hero-title { left: 18px; top: 62px; }
  .hero-title-main { font-size: 44px; }
  .content-area { margin-top: -150px; padding: 0 12px 20px; }
  .top-mosaic,
  .spots-mosaic,
  .section-title,
  .food-banner { max-width: 350px; }
  .food-btn { font-size: 18px; }
}

/* 平板 & 桌面端 */
@media (min-width: 768px) {
  .hero { height: 520px; }
  .hero-title { left: 56px; top: 92px; }
  .hero-title-main { font-size: 68px; }
  .hero-icon { right: 56px; top: 160px; width: 62px; height: 62px; }
  .hero-icon-ring { width: 40px; height: 40px; }

  .content-area { margin-top: -210px; padding: 0 28px 40px; }

  .top-mosaic,
  .spots-mosaic,
  .section-title,
  .food-banner { max-width: 980px; }

  .top-mosaic {
    padding: 18px;
    grid-auto-rows: 84px;
    gap: 14px;
    border-radius: 22px;
  }

  .mosaic-title { font-size: 22px; }
  .mosaic-desc { font-size: 13px; }

  .spots-mosaic {
    grid-auto-rows: 84px;
    gap: 14px;
  }
  .spot-title { font-size: 18px; }
  .spot-desc { font-size: 13px; }
  .spot-arrow { font-size: 20px; }
  .spot-more-icon { font-size: 42px; }

  .section-text { font-size: 24px; }

  .food-banner { height: 200px; border-radius: 18px; }

  .food-btn {
    height: 66px;
    font-size: 26px;
    border-radius: 18px;
  }
}

/* 大屏 PC */
@media (min-width: 1200px) {
  .hero { height: 580px; }
  .content-area { margin-top: -240px; }
  .top-mosaic,
  .spots-mosaic,
  .section-title,
  .food-banner { max-width: 1100px; }
}
</style>