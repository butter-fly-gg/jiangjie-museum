<template>
  <div class="travel-shop-detail-page">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2">
          <path d="M15 19l-7-7 7-7"/>
        </svg>
      </div>
      <div class="title">商品详情</div>
      <div class="favorite-btn">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTEuNSAxNC41YzAuNyAwIDEuMi0wLjUgMS4yLTEuMWMwLTIuNS0yLjUtMy45LTQuNS0zLjlDMTAuNiAyLjUgNy41IDMuNSA3LjUgMy41YzAtMS41IDEuNS0yLjUgMy41LTIuNUgxMS41YzIuNSAwIDQuNSAzLjUgNC41IDMuNWMwIDIuNS0yLjUgNC41LTQuNSA0LjVDMTAuNiAxOS41IDcuNSAxOC41IDcuNSAxOC41YzAtMS41IDEuNS0yLjUgMy41LTIuNVoiIGZpbGw9IiMzNDQwNTciLz48L3N2Zz4=" alt="收藏" />
      </div>
    </header>

    <!-- 主图区域 -->
    <div class="main-image" v-if="!loading && product">
      <img :src="product.image" :alt="product.name" />
    </div>
    
    <!-- 加载状态 -->
    <div class="main-image loading" v-if="loading">
      <div>加载中...</div>
    </div>

    <!-- 商品信息 -->
    <div class="product-info" v-if="!loading && product">
      <div class="product-title">{{ product.name }}</div>
      <div class="rating">
        <span class="stars">
          <span class="star active" v-for="n in Math.floor(product.rating || 0)" :key="n"></span>
          <span class="star inactive" v-for="n in (5 - Math.floor(product.rating || 0))" :key="n"></span>
        </span>
        <span class="sales">已售{{ product.sales }}+</span>
      </div>
      <div class="description">
        {{ product.description }}
      </div>
    </div>
    
    <!-- 加载状态 -->
    <div class="loading" v-if="loading">
      <div>加载中...</div>
    </div>

    <!-- 评价按钮 -->
    <div class="review-btn">
      <span>评价(300+)</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2">
        <path d="M19 9l-7 7-7-7"/>
      </svg>
    </div>

    <!-- 数量选择 -->
    <div class="quantity-select">
      <span class="label">数量</span>
      <div class="quantity-control">
        <button class="minus">−</button>
        <input type="number" v-model.number="quantity" min="1" max="99" />
        <button class="plus">+</button>
      </div>
    </div>

    <!-- 口味选择 -->
    <div class="flavor-select" v-if="!loading && product && product.flavors">
      <span class="label">口味精选({{ product.flavors.length }})</span>
      <select v-model="selectedFlavor">
        <option value="">请选择口味</option>
        <option v-for="flavor in product.flavors" :key="flavor.name" :value="flavor.name">
          {{ flavor.name }}
        </option>
      </select>
    </div>

    <!-- 价格与按钮 -->
    <div class="price-section" v-if="!loading && product">
      <div class="price">¥{{ product.price }}.00</div>
      <div class="discount-tips">完成·投票连看 喜欢可获得优惠</div>
      <button class="buy-btn" @click="buyNow">立即购入</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { shopAPI } from '@/api'

// 数据定义
const quantity = ref(1)
const selectedFlavor = ref('')
const product = ref(null)
const loading = ref(true)

const route = useRoute()
import imgWine from '@/imgs/s高粱酒1.png' 
// 获取商品详情
const fetchProductDetail = async () => {
  const productId = route.params.id || '65f1234567890123456789ab' // 示例ID
  try {
    const response = await shopAPI.getProductById(productId)
    if (response.success) {
      product.value = response.data
    }
  } catch (error) {
    console.error('获取商品详情失败:', error)
    // 使用默认数据
    product.value = {
      name: '故居传承高粱酒',
      description: '江姐故居这片被红色精神深深滋养的田地上，我们精选优质红高粱，历经多道工序，匠心打造江姐故居高粱酒这一大特色产品，实现味蕾与心灵的双重盛宴。同时，以实用性、生活性为目的，研发生活类文创产品，为拥有者的生活空间增添一抹独特的红色魅力。',
      price: 399,
      flavors: [
        { name: '原味', description: '传统原味' },
        { name: '陈酿', description: '陈年佳酿' },
        { name: '特制', description: '特别调制' }
      ],
      rating: 4.9,
      sales: 999,
      image: imgWine
    }
  } finally {
    loading.value = false
  }
}

// 立即购买
const buyNow = () => {
  if (!selectedFlavor.value) {
    alert('请选择口味')
    return
  }
  alert(`已添加到购物车：${product.value?.name} x ${quantity.value}，口味：${selectedFlavor.value}`)
}

// 方法
const goBack = () => {
  window.history.back()
}

// 组件挂载时获取数据
onMounted(() => {
  fetchProductDetail()
})
</script>

<style scoped>
/* 全局样式 */
.travel-shop-detail-page {
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
.favorite-btn img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

/* === 主图 === */
.main-image {
  width: 100%;
  height: 800px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
}
.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* === 商品信息 === */
.product-info {
  margin-bottom: 16px;
}
.product-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}
.rating {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.stars {
  display: flex;
  gap: 4px;
}
.star {
  width: 16px;
  height: 16px;
  background: #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.star.active {
  background: #c43e3a;
  color: white;
  font-size: 12px;
}
.sales {
  font-size: 12px;
  color: #666;
}
.description {
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 16px;
}

/* === 评价按钮 === */
.review-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}
.review-btn svg {
  transform: rotate(180deg);
}

/* === 数量选择 === */
.quantity-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #333;
}
.quantity-control {
  display: flex;
  align-items: center;
  gap: 8px;
}
.minus, .plus {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  background: white;
}
.minus:hover, .plus:hover {
  background: #f0f0f0;
}
input[type="number"] {
  width: 60px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px;
  font-size: 14px;
}

/* === 口味选择 === */
.flavor-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #333;
}
select {
  width: 120px;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

/* === 价格与按钮 === */
.price-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}
.price {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
.discount-tips {
  font-size: 12px;
  color: #666;
  text-align: center;
}
.buy-btn {
  background: #c43e3a;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 8px;
}
</style>