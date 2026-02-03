<template>
  <div class="travel-shop-page">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2">
          <path d="M15 19l-7-7 7-7"/>
        </svg>
      </div>
      <div class="title">文创精选</div>
      <div class="search-box">
        <input type="text" placeholder="搜索文创商品" />
      </div>
    </header>

    <!-- 横幅广告 -->
    <div class="banner">
      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2RkZGRkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5DYWxpbmdyYW5kIEFydCwgVGhlIEVwbGFuY2Ugb2YgR2lyIGluIFRoZSBQb2ludGluZyBwcmltYSBpcyBsaWtlIGluIGFuIGJldHRlciBjb2xvci48L3RleHQ+PC9zdmc+" alt="全场限时折扣中" />
    </div>

    <!-- 热门文创 -->
    <div class="section">
      <div class="section-title">
        热门文创
        <span class="arrow-right">→</span>
      </div>
      <div class="hot-items">
        <div class="item-card" v-for="(item, index) in hotItems" :key="index">
          <div class="rank">{{ item.rank }}</div>
          <div class="item-header">
            <span class="label">{{ item.label }}</span>
            <span class="price">¥{{ item.price }}</span>
          </div>
          <img :src="item.img" alt="" class="item-img" />
          <div class="item-title">{{ item.title }}</div>
          <button class="add-btn">+</button>
        </div>
      </div>
    </div>

    <!-- 江姐故里系列 -->
    <div class="section">
      <div class="section-title">
        江姐故里系列
        <span class="arrow-right">→</span>
      </div>
      <div class="series-items">
        <div class="item-card" v-for="(item, index) in seriesItems" :key="index">
          <img :src="item.img" alt="" class="item-img" />
          <div class="item-title">{{ item.title }}</div>
          <div class="item-price">¥{{ item.price }}</div>
          <button class="add-btn">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 数据定义
const hotItems = ref([
  {
    rank: 'NO.1',
    label: 'AR ILLUSTRATION TEENAGERS’ ARTBOOK',
    title: '《永远的江姐》青少年AR研学绘本',
    price: 29,
    img: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5KZW50cm9sIEFydCwgVGhlIEVwbGFuY2Ugb2YgR2lyIGluIFRoZSBQb2ludGluZyBwcmltYSBpcyBsaWtlIGluIGFuIGJldHRlciBjb2xvci48L3RleHQ+PC9zdmc+'
  },
  {
    rank: 'NO.2',
    label: 'SNOWY STAMP',
    title: '红梅傲雪公交印章',
    price: 10,
    img: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5KZW50cm9sIEFydCwgVGhlIEVwbGFuY2Ugb2YgR2lyIGluIFRoZSBQb2ludGluZyBwcmltYSBpcyBsaWtlIGluIGFuIGJldHRlciBjb2xvci48L3RleHQ+PC9zdmc+'
  },
  {
    rank: 'NO.3',
    label: 'SUPERNOVA WINE',
    title: '故居传承高粱酒',
    price: 399,
    img: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5KZW50cm9sIEFydCwgVGhlIEVwbGFuY2Ugb2YgR2lyIGluIFRoZSBQb2ludGluZyBwcmltYSBpcyBsaWtlIGluIGFuIGJldHRlciBjb2xvci48L3RleHQ+PC9zdmc+'
  }
])

const seriesItems = ref([
  {
    title: '【故里国庆非遗漆扇】',
    price: 29,
    img: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5KZW50cm9sIEFydCwgVGhlIEVwbGFuY2Ugb2YgR2lyIGluIFRoZSBQb2ludGluZyBwcmltYSBpcyBsaWtlIGluIGFuIGJldHRlciBjb2xvci48L3RleHQ+PC9zdmc+'
  },
  {
    title: '【经络疏通养生锤】',
    price: 30,
    img: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5KZW50cm9sIEFydCwgVGhlIEVwbGFuY2Ugb2YgR2lyIGluIFRoZSBQb2ludGluZyBwcmltYSBpcyBsaWtlIGluIGFuIGJldHRlciBjb2xvci48L3RleHQ+PC9zdmc+'
  }
])
</script>

<style scoped>
/* 全局样式 */
.travel-shop-page {
  min-height: 100vh;
  background-color: #f5f0e6; /* 统一背景色 */
  font-family: 'Microsoft Yahei', sans-serif;
  padding: 16px;
  padding-bottom: calc(80px + env(safe-area-inset-bottom));
}

/* === 头部 === */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.back-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  flex: 1;
  text-align: center;
}
.search-box {
  width: 120px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 4px 8px;
  margin-left: 12px;
}
.search-box input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
}

/* === 横幅 === */
.banner {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}
.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* === 区块标题 === */
.section {
  margin-bottom: 20px;
}
.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
  padding-left: 4px;
  border-left: 3px solid #c43e3a;
  display: flex;
  align-items: center;
  gap: 8px;
}
.arrow-right {
  font-size: 14px;
  color: #999;
}

/* === 热门商品 === */
.hot-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
.item-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  position: relative;
  aspect-ratio: 1 / 1;
}
.rank {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #fff;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  z-index: 2;
}
.item-header {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background: #fff;
  font-size: 12px;
  color: #666;
}
.label {
  font-size: 12px;
  color: #333;
}
.price {
  font-weight: bold;
  color: #c43e3a;
}
.item-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
}
.item-title {
  padding: 8px 12px;
  font-size: 14px;
  color: #333;
  line-height: 1.4;
}
.add-btn {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}
.add-btn:hover {
  transform: scale(1.05);
  border-color: #c43e3a;
}

/* === 江姐故里系列 === */
.series-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}
.series-items .item-card {
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}
.series-items .item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.series-items .item-title {
  padding: 8px 12px;
  font-size: 14px;
  color: #333;
  text-align: center;
}
.series-items .item-price {
  padding: 4px 12px;
  font-size: 14px;
  color: #c43e3a;
  text-align: center;
  font-weight: bold;
}
</style>