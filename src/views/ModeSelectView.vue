<template>
  <div class="mode-page">
    <div class="back-bar" @click="goBack">← 返回</div>

    <h2 class="title">—— 请选择您想体验的模式 ——</h2>

    <div class="carousel-container">
      <div class="arrow left" @click="prev">❮</div>

      <div class="carousel-track" :style="{ transform: `translateX(${pos}%)` }">
        <div
          class="mode-card"
          :class="{ active: current === index }"
          v-for="(item, index) in modeList"
          :key="index"
          @click="select(index)"
        >
          <img class="mode-img" :src="item.img" />
          <div class="label">
            <span v-if="current === index">🌸 {{ item.name }} 🌸</span>
            <span v-else>{{ item.name }}</span>
          </div>
        </div>
      </div>

      <div class="arrow right" @click="next">❯</div>
    </div>

    <button class="enter-btn" @click="enter">进入 {{ currentItem.name }}</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import storyImg from '../imgs/Game1.l.png'
import interactiveImg from '../imgs/Game1.m.png'
import scrollImg from '../imgs/Game1.r.png'

const router = useRouter()

const modeList = ref([
  { name: '故事聆听模式', img: storyImg, path: '/story' },
  { name: '现场交互模式', img: interactiveImg, path: '/interactive' },
  { name: '线上绘卷模式', img: scrollImg, path: '/scroll' },
])

const current = ref(1)

const pos = computed(() => {
  return -current.value * 33.33
})

const currentItem = computed(() => modeList.value[current.value])

function prev() {
  current.value = current.value === 0 ? 2 : current.value - 1
}
function next() {
  current.value = current.value === 2 ? 0 : current.value + 1
}
function select(i) {
  current.value = i
}
function goBack() {
  router.back()
}
function enter() {
  router.push(currentItem.value.path)
}
</script>

<style scoped>
.mode-page {
  width: 100vw;
  height: 100vh;
  background: url(../imgs/Game.png) no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  box-sizing: border-box;
}

.back-bar {
  align-self: flex-start;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

.title {
  color: #fff;
  font-size: 26px;
  margin-bottom: 40px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

/* 轮播容器 */
.carousel-container {
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 460px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

/* 箭头 */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid #fff;
  border-radius: 50%;
  color: #fff;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
}
.arrow.left { left: 10px; }
.arrow.right { right: 10px; }

/* 轨道：三张图无缝连在一起 */
.carousel-track {
  display: flex;
  width: 300%;
  height: 100%;
  transition: transform 0.5s ease;
}

/* 卡片：无缝拼接 */
.mode-card {
  width: 33.333%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transform: scale(0.9);
  transition: all 0.4s ease;
  cursor: pointer;
}

/* 中间激活状态：放大 */
.mode-card.active {
  opacity: 1;
  transform: scale(1.1);
}

/* 图片：充满卡片，无缝 */
.mode-img {
  width: 100%;
  height: 380px;
  object-fit: cover;
}

.label {
  margin-top: 10px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0,0,0,0.7);
}

.enter-btn {
  margin-top: 30px;
  padding: 14px 50px;
  background: #c0392b;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  cursor: pointer;
}
</style>