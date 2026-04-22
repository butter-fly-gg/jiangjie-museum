<template>
  <div class="travel-shop-page">
    <!-- 1. 顶部导航 (悬浮透明风格) -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
          <path d="M15 19l-7-7 7-7"/>
        </svg>
      </div>
      
      <!-- 修改点：标题样式优化 -->
      <div class="title">文创精选</div>
      
      <!-- 修改点：搜索框样式保持紧凑 -->
      <div class="search-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" placeholder="搜索好物" />
      </div>
    </header>

    <!-- 2. 横幅广告 -->
    <div class="banner">
      <img 
        src="https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=2070&auto=format&fit=crop" 
        alt="全场限时折扣" 
        class="banner-img"
      />
      <div class="banner-overlay">
        <div class="banner-subtitle">THE EXPLORATION OF JIANGJIE HOME</div>
        <h1 class="banner-main-text">全场限时折扣中</h1>
        <div class="banner-discount">
          <span class="num">5/1</span>
          <span class="symbol">-</span>
          <span class="num">5/5</span>
        </div>
      </div>
    </div>

    <!-- 3. 热门文创 (核心修改：错落 Grid 布局) -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">热门文创</h2>
        <div class="more-link">
          查看更多 <span class="arrow">→</span>
        </div>
      </div>

      <div class="hot-grid">
        <template v-for="(item, index) in hotItems" :key="index">
          <component 
            :is="item.link ? 'router-link' : 'div'" 
            :to="item.link || null"
            class="hot-card"
            :class="{ 'card-large': index === 0 }" 
          >
            <!-- 排名标签 -->
            <div class="rank-tag">{{ item.rank }}</div>
            
            <!-- 顶部英文标签 -->
            <div class="eng-label">{{ item.engLabel }}</div>

            <!-- 商品图片 -->
            <div class="img-wrapper">
              <img :src="item.img" :alt="item.title" class="card-img" />
            </div>

            <!-- 底部信息区 -->
            <div class="card-info">
              <div class="info-top">
                <h3 class="card-title">{{ item.title }}</h3>
                <div class="price-box">
                  <span class="currency">¥</span>
                  <span class="price-num">{{ item.price }}</span>
                </div>
              </div>
              
              <!-- 购买按钮 -->
              <button class="add-cart-btn" @click.stop="addToCart(item)">
                +
              </button>
            </div>
          </component>
        </template>
      </div>
    </div>

    <!-- 4. 江姐故里系列 (常规网格) -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">江姐故里系列</h2>
        <div class="more-link">
          查看更多 <span class="arrow">→</span>
        </div>
      </div>
      <div class="series-grid">
        <div class="series-card" v-for="(item, index) in seriesItems" :key="index">
          <img :src="item.img" alt="" class="series-img" />
          <div class="series-title">{{ item.title }}</div>
          <div class="series-price">¥{{ item.price }}</div>
          <button class="series-add-btn" @click="addToCart(item)">+</button>
        </div>
      </div>
    </div>

    <div v-if="showAddressDialog" class="dialog-mask" @click.self="closeAddressDialog">
      <div class="dialog-card">
        <h3 class="dialog-title">选择购买数量</h3>
        <div class="dialog-product" v-if="currentItem">
          <div>{{ currentItem.title }}</div>
          <div>¥{{ currentItem.price }}</div>
        </div>
        <div class="dialog-qty-row">
          <span>购买数量</span>
          <input v-model.number="quantityForm.quantity" class="dialog-qty" type="number" min="1" />
        </div>
        <div class="dialog-actions">
          <button class="dialog-cancel" @click="closeAddressDialog">取消</button>
          <button class="dialog-confirm" @click="confirmAddPurchase">确定</button>
        </div>
      </div>
    </div>

    <div v-if="toastMessage" class="toast-tip">{{ toastMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { cartAPI, orderAPI } from '@/api'

const router = useRouter()

const hotItems = ref([])
const seriesItems = ref([])
const showAddressDialog = ref(false)
const currentItem = ref(null)
const quantityForm = ref({
  quantity: 1
})
const toastMessage = ref('')
let toastTimer = null

const goBack = () => {
  router.push('/travel')
}

const getLoginUser = (needRedirect = true) => {
  const userInfo = localStorage.getItem('userInfo')
  if (!userInfo) {
    if (needRedirect) {
      alert('请先登录')
      router.push('/login')
    }
    return null
  }
  return JSON.parse(userInfo)
}

const openAddressDialog = (item) => {
  currentItem.value = item
  quantityForm.value.quantity = 1
  showAddressDialog.value = true
}

const closeAddressDialog = () => {
  showAddressDialog.value = false
  currentItem.value = null
}

const showToast = (message) => {
  toastMessage.value = message
  if (toastTimer) {
    clearTimeout(toastTimer)
  }
  toastTimer = setTimeout(() => {
    toastMessage.value = ''
    toastTimer = null
  }, 3000)
}

const addToCart = (item) => {
  const user = getLoginUser()
  if (!user) return
  openAddressDialog(item)
}

const confirmAddPurchase = async () => {
  const user = getLoginUser()
  if (!user) return
  if (!currentItem.value) return
  if (!quantityForm.value.quantity || quantityForm.value.quantity <= 0) {
    alert('数量必须大于0')
    return
  }

  try {
    const quantity = Number(quantityForm.value.quantity) || 1
    const response = await cartAPI.addToCart({
      userId: user.id,
      productId: currentItem.value.id,
      quantity,
      productName: currentItem.value.title,
      productCover: currentItem.value.img,
      price: currentItem.value.price,
      category: '文创'
    })

    if (response.code !== 200) {
      alert(response.message || '加入购物车失败')
      return
    }

    const createOrderRes = await orderAPI.createDirectOrder({
      userId: user.id,
      productId: currentItem.value.id,
      productName: currentItem.value.title,
      productCover: currentItem.value.img,
      unitPrice: currentItem.value.price,
      quantity
    })

    if (createOrderRes.code === 200) {
      showToast(`加入购物车成功：${currentItem.value.title}`)
      closeAddressDialog()
      return
    }

    alert(createOrderRes.message || '订单创建失败')
  } catch (error) {
    console.error('加购/创建订单失败:', error)
    alert('网络错误，请稍后重试')
  }
}

import imgBook from '@/imgs/s研学绘本.png'       // 假设你的绘本图叫 book-cover.jpg
import imgStamp from '@/imgs/s红梅印章.png'        // 假设你的印章图叫 s红梅印章.png
import imgWine from '@/imgs/s高粱酒.png' 
const fetchHotProducts = async () => {
  hotItems.value = [
    {
      id: 1,
      rank: 'NO.1',
      engLabel: 'AR ILLUSTRATION TEENAGERS\' ARTBOOK',
      title: '《永远的江姐》\n青少年 AR 研学绘本',
      price: 29,
      img: imgBook, 
      link: null
    },
    {
      id: 2,
      rank: 'NO.2',
      engLabel: 'SNOWY STAMP',
      title: '红梅傲雪公交印章',
      price: 10,
      img: imgStamp, 
      link: null
    },
    {
      id: 3,
      rank: 'NO.3',
      engLabel: 'SUPERNOVA WINE',
      title: '故居传承高粱酒',
      price: 399,
      img: imgWine, 
      link: '/travel/shop/detail'
    }
  ]
}

import imgFan from '@/imgs/s漆扇.jpg'
import imgHammer from '@/imgs/s养生锤.jpg'
const fetchSeriesProducts = async () => {
  seriesItems.value = [
    { id: 4, title: '【故里国庆非遗漆扇】', price: 29, img: imgFan },
    { id: 5, title: '【经络疏通养生锤】', price: 30, img: imgHammer },
  //  { title: '【江姐故事明信片】', price: 15, img: imgCard },
  //  { title: '【红色记忆书签】', price: 9.9, img: imgBookmark }
  ]
}

onMounted(() => {
  fetchHotProducts()
  fetchSeriesProducts()
})
</script>

<style scoped>
/* 全局变量 */
.travel-shop-page {
  min-height: 100vh;
  background-color: #f9f7f2;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  padding-bottom: 80px;
}

/* === 1. 头部 (悬浮透明) === */
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  /* 移除 justify-content: space-between，改用 gap 或 margin 控制间距，方便对齐 */
  padding: 12px 16px; 
  background: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent);
  box-sizing: border-box;
}

.back-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}
.back-btn:hover { background: rgba(255, 255, 255, 0.4); }

/* 【修改点】标题样式修正 */
.title {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  flex: 1; /* 占据剩余空间 */
  
  text-align: left;       /* 文字左对齐 */
  padding-left: 20px;     /* 距离左侧按钮一定距离 (可根据视觉微调) */
  margin-right: 12px;     /* 右侧留出空间给搜索框 */
  
  white-space: nowrap;    /* 防止文字换行 */
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 【修改点】搜索框样式保持紧凑 */
.search-box {
  background: #fff;
  border-radius: 20px;
  padding: 4px 12px; /* 上下 4px，左右 12px */
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  height: 32px; 
  box-sizing: border-box;
  flex-shrink: 0; /* 防止被压缩 */
}

.search-box input {
  border: none;
  outline: none;
  font-size: 13px;
  color: #333;
  width: 100px; /* 稍微缩短一点宽度适应移动端 */
  background: transparent;
  line-height: normal; 
  margin: 0;
  padding: 0;
  text-align: left; /* 输入文字靠左 */
}

.search-box svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* === 2. Banner === */
.banner {
  position: relative;
  width: 100%;
  height: 240px;
  margin-bottom: 24px;
  overflow: hidden;
}
.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9);
}
.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  background: radial-gradient(circle, transparent 20%, rgba(0,0,0,0.6) 100%);
}
.banner-subtitle {
  font-size: 12px;
  letter-spacing: 2px;
  opacity: 0.8;
  margin-bottom: 8px;
  font-family: serif;
}
.banner-main-text {
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin: 0 0 12px 0;
  font-family: "Songti SC", "SimSun", serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.355);
}
.banner-discount {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Times New Roman", serif;
}
.banner-discount .num {
  font-size: 42px;
  font-weight: bold;
  line-height: 1;
}
.banner-discount .symbol {
  font-size: 24px;
  opacity: 0.8;
}

/* === 3. 区块通用 === */
.section {
  padding: 0 16px;
  margin-bottom: 32px;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
}
.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0;
  position: relative;
  padding-left: 12px;
}
.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 4px;
  background-color: #c43e3a;
  border-radius: 2px;
}
.more-link {
  font-size: 13px;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}
.more-link .arrow { font-size: 16px; }

/* === 4. 热门文创 (核心：错落 Grid 布局) === */
.hot-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  grid-template-rows: auto auto; 
  gap: 12px;
}

/* 卡片基础样式 */
.hot-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  position: relative;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
  text-decoration: none;
}
.hot-card:active { transform: scale(0.98); }

/* 【修改点】NO.1 大卡片：跨越两行 */
.hot-card.card-large {
  grid-row: span 2; 
  /* 设置一个合适的宽高比，避免图片拉伸 */
  aspect-ratio: 3/4; 
}

/* NO.2, NO.3 小卡片：正方形 */
.hot-card:not(.card-large) {
  aspect-ratio: 3/2;
}

/* 排名标签 */
.rank-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.95);
  color: #c43e3a;
  font-size: 24px; 
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 6px;
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-family: "Times New Roman", serif;
  line-height: 1.2;
}

/* 英文标签 */
.eng-label {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 9px;
  color: #666;
  background: rgba(255,255,255,0.8);
  padding: 2px 6px;
  border-radius: 4px;
  z-index: 2;
  max-width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}

/* 图片区域 */
.img-wrapper {
  flex: 1;
  width: 100%;
  overflow: hidden;
  background: #f0f0f0;
}
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 底部信息区 */
.card-info {
  padding: 10px;
  background: #fff;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.info-top {
  flex: 1;
  margin-right: 8px;
  min-width: 0; /* 防止文本溢出破坏布局 */
}
.card-title {
  font-size: 13px;
  color: #333;
  margin: 0 0 4px 0;
  line-height: 1.4;
  font-weight: 600;
  white-space: pre-line; 
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.price-box {
  display: flex;
  align-items: baseline;
  color: #c43e3a;
}
.currency { font-size: 12px; margin-right: 2px; }
.price-num { font-size: 16px; font-weight: bold; }

/* 加购按钮 */
.add-cart-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f5f5f5;
  border: none;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;  
  line-height: 1;        
  font-weight: bold;     

  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}
.add-cart-btn:hover {
  background: #c43e3a;
  color: #fff;
}

/* === 5. 系列商品 (常规网格) === */
.series-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.series-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  position: relative;
}
.series-img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  background: #f0f0f0;
}
.series-title {
  padding: 10px 12px 4px;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.series-price {
  padding: 0 12px 12px;
  font-size: 15px;
  color: #c43e3a;
  font-weight: bold;
}
.series-add-btn {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #eee;
  color: #333;
  font-size: 18px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.series-add-btn:active {
  background: #c43e3a;
  color: #fff;
  border-color: #c43e3a;
}

.dialog-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.dialog-card {
  width: 100%;
  max-width: 360px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
}

.dialog-title {
  margin: 0 0 12px;
  font-size: 18px;
}

.dialog-product {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 13px;
  color: #666;
}

.dialog-input {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.dialog-qty-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  color: #333;
  font-size: 14px;
}

.dialog-qty {
  width: 90px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 6px 8px;
}

.dialog-actions {
  display: flex;
  gap: 10px;
}

.dialog-cancel,
.dialog-confirm {
  flex: 1;
  border: none;
  border-radius: 8px;
  padding: 10px 0;
}

.dialog-cancel {
  background: #f2f2f2;
  color: #666;
}

.dialog-confirm {
  background: #c43e3a;
  color: #fff;
}

.toast-tip {
  position: fixed;
  left: 50%;
  bottom: 26px;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.78);
  color: #fff;
  font-size: 14px;
  padding: 10px 16px;
  border-radius: 20px;
  z-index: 40;
  max-width: 86%;
  text-align: center;
}
</style>