<template>
  <div id="app">
    <router-view />
    <!-- 只在允许的页面显示导航栏 -->
    <BottomNav v-if="showBottomNav" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BottomNav from '@/components/BottomNav.vue'

const route = useRoute()

// 在这里定义需要显示导航栏的页面路径
const allowedPaths = [
  '/home',
  '/travel',
  '/mine',
  '/activity',
  '/travel/volunteer'
]

// 判断当前页面是否在允许列表中
const showBottomNav = computed(() => {
  console.log('当前路径：', route.path)
  console.log('是否显示导航栏：', allowedPaths.includes(route.path))
  return allowedPaths.includes(route.path)
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-bottom: 60px; /* 给底部导航栏留出位置 */
}
</style>