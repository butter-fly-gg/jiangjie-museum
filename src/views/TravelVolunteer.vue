<template>
  <div class="travel-volunteer-page">
    <!-- 1. 头部区域 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7l7-7"/>
        </svg>
      </div>

      <div class="location-info">
        <div class="location-label">活动总览</div>
        <div class="location-text">江姐故里 <span class="arrow">▼</span></div>
      </div>

      <div class="settings">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </div>
    </header>

    <!-- 2. 横幅广告 -->
    <div class="banner-card">
      <img 
        src="../imgs/v那时春里.png" alt="那时春里" class="banner-img"/>
      <div class="banner-overlay">
        <h2 class="banner-title">那时·春里</h2>
        <p class="banner-subtitle">沉浸式红色文化体验之旅</p>
      </div>
    </div>

    <!-- 3. 时间选择器 -->
    <div class="date-section">
      <!-- 左侧日历图标 (可点击) -->
      <div class="date-icon-box" @click="openPicker">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c43e3a" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span class="date-label">月历</span>
      </div>

      <!-- 右侧可滑动列表 -->
      <!-- 修复点 1: 移除了未使用的 index 变量 -->
      <div class="date-scroll-wrapper" ref="scrollContainer">
        <div 
          v-for="item in generatedDateList" 
          :key="item.value"
          class="date-card"
          :class="{ active: selectedDate === item.value }"
          @click="selectDate(item)"
        >
          <div class="date-month">{{ item.month }}月</div>
          <div class="date-year-box">
            <span class="date-year">{{ item.year }}</span>
          </div>
        </div>
        <div style="width: 20px; flex-shrink: 0;"></div>
      </div>
    </div>

    <!-- 4. 月份选择弹窗 -->
    <transition name="fade">
      <div v-if="showPicker" class="picker-modal-mask" @click.self="showPicker = false">
        <div class="picker-modal">
          <div class="picker-header">
            <h3>选择日期</h3>
            <button class="close-btn" @click="showPicker = false">×</button>
          </div>
          
          <div class="picker-year-nav">
            <button @click="pickerYear--">‹</button>
            <span class="picker-year-display">{{ pickerYear }}年</span>
            <button @click="pickerYear++">›</button>
          </div>

          <div class="picker-grid">
            <!-- 修复点 2: m 变量现在被正确使用了 -->
            <div 
              v-for="m in 12" 
              :key="m"
              class="picker-month-item"
              :class="{ 
                active: selectedDate === `${pickerYear}-${String(m).padStart(2, '0')}`,
                disabled: isPastMonth(pickerYear, m)
              }"
              @click="confirmSelect(pickerYear, m)"
            >
              {{ m }}月
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 5. 分类标签 -->
    <div class="tabs">
      <div 
        v-for="tab in tabList" 
        :key="tab"
        class="tab-item"
        :class="{ active: currentTab === tab }"
        @click="currentTab = tab"
      >
        {{ tab }}
      </div>
    </div>

    <!-- 6. 活动列表 -->
    <div class="activity-list">
      <div class="activity-card" v-for="activity in activities" :key="activity._id">
        <span class="status-tag" :class="getStatusClass(activity.status)">{{ activity.status }}</span>
        <img 
          :src="activity.image || 'https://via.placeholder.com/300x120'" 
          :alt="activity.title"
          class="activity-img"
        />
        <div class="activity-info">
          <div class="activity-title">{{ activity.title }}</div>
          <div class="countdown">{{ getCountdownText(activity) }}</div>
          <button 
            class="join-btn" 
            :class="{ disabled: activity.status !== '进行中' }"
            :disabled="activity.status !== '进行中'"
            @click="joinActivity(activity._id)"
          >
            {{ getButtonText(activity.status) }}
          </button>
        </div>
      </div>
      
      <div v-if="activities.length === 0" class="empty-state">
        暂无相关活动
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue' // 修复点 3: 移除了未使用的 computed 和 onMounted
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => router.push('/travel')

// === 1. 日期逻辑 ===
const generateDates = (startYear, startMonth, count = 24) => {
  const list = []
  let currentYear = startYear
  let currentMonth = startMonth

  for (let i = 0; i < count; i++) {
    list.push({
      year: currentYear,
      month: currentMonth,
      value: `${currentYear}-${String(currentMonth).padStart(2, '0')}`
    })

    currentMonth++
    if (currentMonth > 12) {
      currentMonth = 1
      currentYear++
    }
  }
  return list
}

const now = new Date()
const generatedDateList = ref(generateDates(now.getFullYear(), now.getMonth() + 1, 24))
const selectedDate = ref(generatedDateList.value[0].value)

const selectDate = (item) => {
  selectedDate.value = item.value
}

// === 2. 弹窗选择器逻辑 ===
const showPicker = ref(false)
const pickerYear = ref(now.getFullYear())

const openPicker = () => {
  const [y] = selectedDate.value.split('-')
  pickerYear.value = parseInt(y)
  showPicker.value = true
}

const isPastMonth = (year, month) => {
  if (year < now.getFullYear()) return true
  if (year === now.getFullYear() && month <= now.getMonth() + 1) return true
  return false
}

const confirmSelect = (year, month) => {
  if (isPastMonth(year, month)) return
  
  const newValue = `${year}-${String(month).padStart(2, '0')}`
  selectedDate.value = newValue
  
  const exists = generatedDateList.value.some(d => d.value === newValue)
  if (!exists) {
    generatedDateList.value.push({ year, month, value: newValue })
    generatedDateList.value.sort((a, b) => a.value.localeCompare(b.value))
  }

  showPicker.value = false
  
  nextTick(() => {
    scrollToSelected()
  })
}

const scrollContainer = ref(null)
const scrollToSelected = () => {
  if (!scrollContainer.value) return
  const cards = scrollContainer.value.querySelectorAll('.date-card')
  cards.forEach(card => {
    if (card.classList.contains('active')) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  })
}

// === 3. 业务逻辑 ===
const tabList = ['全部', '进行中', '已结束', '即将开放']
const currentTab = ref('全部')

const getStatusClass = (status) => {
  const map = { '进行中': 'ongoing', '已结束': 'ended', '即将开放': 'coming' }
  return map[status] || ''
}

const getCountdownText = (activity) => {
  if (activity.status === '已结束') return '活动已结束'
  if (activity.status === '即将开放' && activity.startDate) {
    const d = new Date(activity.startDate)
    return `${d.getMonth()+1}月${d.getDate()}日 开始`
  }
  return '活动进行中'
}

const getButtonText = (status) => {
  const map = { '进行中': '立即参与', '已结束': '查看详情', '即将开放': '敬请期待' }
  return map[status] || '详情'
}

const imgRecruit1 = new URL('@/imgs/v红色故事招募.png', import.meta.url).href
const imgRecruit2 = new URL('@/imgs/v江姐生平志愿讲解.png', import.meta.url).href
const activities = ref([
  { _id: 1, title: '红色故事宣讲员招募', status: '进行中', image: imgRecruit1 },
  { _id: 2, title: '江姐生平事迹展志愿讲解', status: '即将开放', startDate: '2026-04-01', image: imgRecruit2 },
])

const joinActivity = (id) => alert('参与活动 ID:' + id)
</script>

<style scoped>
/* 全局容器 */
.travel-volunteer-page {
  min-height: 100vh;
  background-color: #f9f5f0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  padding: 16px;
  padding-bottom: 80px;
}

/* 头部 */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.back-btn, .settings {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(4px);
  cursor: pointer;
}
.location-info { text-align: center; flex: 1; }
.location-label { font-size: 12px; color: #666; margin-bottom: 2px; }
.location-text { font-size: 16px; font-weight: bold; color: #333; display: flex; align-items: center; justify-content: center; gap: 4px; }
.location-text .arrow { font-size: 10px; color: #999; }

/* 横幅 */
.banner-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
  height: 300px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.banner-img { width: 100%; height: 100%; object-fit: cover; }
.banner-overlay {
  position: absolute; bottom: 0; left: 0; width: 100%;
  padding: 12px 16px;
  background: linear-gradient(to top, rgba(236, 190, 3, 0.7), transparent);
  color: white;
}
.banner-title { font-size: 30px; font-weight: bold; margin: 0 0 4px 0; font-family: "Songti SC", serif; }
.banner-subtitle { font-size: 18px; opacity: 0.9; margin: 0; }

/* 时间选择器 */
.date-section {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 16px;
  padding: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.date-icon-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  border-right: 1px solid #eee;
  margin-right: 12px;
  padding-right: 12px;
  flex-shrink: 0;
  cursor: pointer;
  transition: opacity 0.2s;
}
.date-icon-box:active { opacity: 0.6; }
.date-icon-box svg { margin-bottom: 4px; }
.date-label { font-size: 12px; color: #999; }

.date-scroll-wrapper {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding: 4px 4px 8px 4px;
  scrollbar-width: none;
}
.date-scroll-wrapper::-webkit-scrollbar { display: none; }

.date-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  opacity: 0.5;
  transform: scale(0.9);
}
.date-card.active {
  opacity: 1;
  transform: scale(1);
}

.date-month {
  font-size: 13px;
  color: #666;
  margin-bottom: 6px;
  font-weight: 500;
}
.date-card.active .date-month { color: #c43e3a; font-weight: bold; }

.date-year-box {
  background: #f5f5f5;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s;
}
.date-card.active .date-year-box {
  background: #c43e3a;
  box-shadow: 0 4px 10px rgba(196, 62, 58, 0.3);
}
.date-year { font-size: 16px; font-weight: bold; color: #333; line-height: 1; }
.date-card.active .date-year { color: #fff; }

/* 弹窗选择器 */
.picker-modal-mask {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}
.picker-modal {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  width: 85%;
  max-width: 300px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  animation: slideUp 0.3s ease;
}
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.picker-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 16px;
}
.picker-header h3 { margin: 0; font-size: 18px; color: #333; }
.close-btn { background: none; border: none; font-size: 24px; color: #999; cursor: pointer; }

.picker-year-nav {
  display: flex; justify-content: center; align-items: center; gap: 20px;
  margin-bottom: 20px;
}
.picker-year-nav button {
  width: 32px; height: 32px; border-radius: 50%; border: none;
  background: #f5f5f5; color: #666; font-size: 18px; cursor: pointer;
}
.picker-year-display { font-weight: bold; font-size: 16px; color: #333; min-width: 80px; text-align: center; }

.picker-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
}
.picker-month-item {
  padding: 12px 0;
  text-align: center;
  background: #f9f9f9;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}
.picker-month-item.active {
  background: #c43e3a;
  color: white;
  font-weight: bold;
}
.picker-month-item.disabled {
  color: #ddd;
  background: #f5f5f5;
  cursor: not-allowed;
  text-decoration: line-through;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* 其他组件样式 */
.tabs {
  display: flex; background: rgba(255,255,255,0.6); border-radius: 12px;
  padding: 4px; margin-bottom: 16px;
}
.tab-item {
  flex: 1; padding: 8px 0; text-align: center; font-size: 14px;
  color: #666; border-radius: 8px; cursor: pointer; transition: all 0.2s;
}
.tab-item.active {
  background: #fff; color: #c43e3a; font-weight: bold;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.activity-list { display: flex; flex-direction: column; gap: 16px; }
.activity-card {
  position: relative; background: #fff; border-radius: 12px;
  overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.status-tag {
  position: absolute; top: 10px; left: 10px; z-index: 2;
  padding: 4px 10px; border-radius: 12px; font-size: 11px;
  font-weight: bold; color: white; backdrop-filter: blur(4px);
}
.status-tag.ongoing { background: rgba(76, 175, 80, 0.9); }
.status-tag.ended { background: rgba(158, 158, 158, 0.9); }
.status-tag.coming { background: rgba(255, 152, 0, 0.9); }

.activity-img { width: 100%; height: 320px; object-fit: cover; display: block; }
.activity-info { padding: 12px 16px 16px; position: relative; }
.activity-title { font-size: 15px; font-weight: bold; color: #333; margin-bottom: 6px; line-height: 1.4; padding-right: 80px; }
.countdown { font-size: 12px; color: #999; margin-bottom: 12px; }

.join-btn {
  position: absolute; bottom: 12px; right: 12px;
  background: #c43e3a; color: white; border: none;
  border-radius: 16px; padding: 6px 16px; font-size: 12px;
  font-weight: bold; cursor: pointer;
  box-shadow: 0 2px 6px rgba(196, 62, 58, 0.3);
}
.join-btn.disabled { background: #eee; color: #999; box-shadow: none; cursor: not-allowed; }
.empty-state { text-align: center; padding: 40px 0; color: #999; font-size: 14px; }
</style>