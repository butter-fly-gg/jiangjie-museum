<template>
  <div class="feed-page">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="tab-nav">
        <div class="tab" :class="{active: activeTab === 'follow'}" @click="switchTab('follow')">关注</div>
        <div class="tab" :class="{active: activeTab === 'recommend'}" @click="switchTab('recommend')">推荐</div>
        <div class="tab" :class="{active: activeTab === 'hot'}" @click="switchTab('hot')">热门</div>
      </div>
      <button class="close-btn" @click="$router.back()">×</button>
    </div>

    <!-- 提示文字 -->
    <div class="tip">^上滑查看更多动态</div>

    <!-- 博主头像栏 - 新增更多博主 -->
    <div class="blogger-bar">
      <div class="blogger-item" v-for="blogger in bloggers" :key="blogger.id" @click="goToBlogger(blogger.id)">
        <div class="avatar-container">
          <img :src="blogger.avatar" alt="博主头像" class="avatar">
          <img v-if="blogger.id === 1" class="v-badge red-v" src="../imgs/黄v.png" alt="红V">
          <img v-else-if="blogger.official" class="v-badge blue-v" src="../imgs/蓝v.png" alt="蓝V">
        </div>
        <div class="name">{{ blogger.name }}</div>
      </div>
    </div>

    <!-- 动态流列表 -->
    <div class="feed-list" ref="feedListRef" @scroll="handleScroll">
      <div class="feed-item" v-for="item in filteredFeedList" :key="item.id">
        <!-- 博主头部信息 -->
        <div class="blogger-header">
          <div class="blogger-left">
            <div class="avatar-container">
              <img :src="item.blogger.avatar" alt="博主头像" class="blogger-avatar">
              <img v-if="item.blogger.id === 1" class="v-badge red-v" src="../imgs/黄v.png" alt="红V">
              <img v-else-if="item.blogger.official" class="v-badge blue-v" src="../imgs/蓝v.png" alt="蓝V">
            </div>
            <div class="blogger-info">
              <div class="blogger-name-row">
                <span class="blogger-name">{{ item.blogger.name }}</span>
                <span v-if="item.blogger.id === 1" class="official-tag">{{ item.blogger.officialLabel }}</span>
              </div>
              <!-- 调整：发布时间与地点移到名字下方 -->
              <div class="post-info">
                <span>{{ item.postTime }}</span>
                <span>发布于 {{ item.location }}</span>
              </div>
            </div>
          </div>
          <button class="follow-btn" :class="{followed: item.blogger.followed}" @click="toggleFollow(item.blogger.id)">
            {{ item.blogger.followed ? '已关注' : '关注' }}
          </button>
        </div>

        <!-- 博客内容：文字悬浮在图片上 -->
        <div class="feed-content">
          <div class="cover-container">
            <img :src="item.cover" alt="动态封面" class="feed-cover">
            <div v-if="item.updateLabel" class="update-label">
              <img src="../imgs/播放.png" alt="播放" class="play-icon">
              <span>{{ item.updateLabel }}</span>
            </div>
            <!-- 调整：左下角标题去掉背景 -->
            <div class="floating-title">
              {{ item.title }}
            </div>
          </div>
          <!-- 调整：统计数据与标题在同一行 -->
          <div class="content-footer">
            <span class="floating-title-text">{{ item.title }}</span>
            <div class="feed-stats">
              <span class="stat-item">
                <img src="../imgs/点赞.png" alt="点赞" class="stat-icon">
                {{ item.views }}
              </span>
              <span class="stat-item">
                <img src="../imgs/评论.png" alt="评论" class="stat-icon">
                {{ item.comments }}
              </span>
              <span class="stat-item">
                <img src="../imgs/分享.png" alt="分享" class="stat-icon">
                {{ item.shares }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="empty-tip" v-if="activeTab === 'follow' && filteredFeedList.length === 0">
        暂无关注的博主，快去关注吧～
      </div>

      <div class="loading" v-if="loading && activeTab !== 'follow'">加载中...</div>
      <div class="no-more" v-if="!loading && !hasMore && activeTab !== 'follow'">已加载全部</div>
    </div>
  </div>
</template>

<script>
// 导入图片资源
import avatar1 from '../imgs/头像1.jpg';
import avatar2 from '../imgs/头像2.jpg';
import avatar3 from '../imgs/头像3.jpg';
import avatar4 from '../imgs/头像4.jpg';
import avatar5 from '../imgs/头像5.jpg';
// 新增6-10号博主头像（你需要替换为实际图片路径）
import avatar6 from '../imgs/头像6.jpg';
import avatar7 from '../imgs/头像7.jpg';
import avatar8 from '../imgs/头像8.jpg';
import avatar9 from '../imgs/头像9.jpg';
import avatar10 from '../imgs/头像10.jpg';

import cover1 from '../imgs/动态1.webp';
import cover2 from '../imgs/动态2.jpg';
import cover3 from '../imgs/动态5.jpg';
import cover4 from '../imgs/动态6.jpg';
import cover5 from '../imgs/动态6.webp';
import cover6 from '../imgs/动态4.webp';
// 新增动态封面（可选）
import cover7 from '../imgs/动态6.jpg';
import cover8 from '../imgs/动态3.jpg';
import cover9 from '../imgs/动态2.jpg';
import cover10 from '../imgs/动态6.jpg';

export default {
  data() {
    return {
      activeTab: 'recommend',
      feedList: [],
      // 扩展博主列表：从5个增加到10个
      bloggers: [
        { id: 1, name: "江姐故里", avatar: avatar1, followed: false, official: true, officialLabel: "江姐故里官方" },
        { id: 2, name: "告白预行绘本", avatar: avatar2, followed: false, official: true, officialLabel: "告白预行绘本官方" },
        { id: 3, name: "霹雳复合蚯蚓", avatar: avatar3, followed: false, official: true, officialLabel: "霹雳复合蚯蚓官方" },
        { id: 4, name: "癸婷寒血寒将", avatar: avatar4, followed: false, official: true, officialLabel: "癸婷寒血寒将官方" },
        { id: 5, name: "囡", avatar: avatar5, followed: false, official: true, officialLabel: "囡官方" },
        { id: 6, name: "红色记忆馆", avatar: avatar6, followed: false, official: true, officialLabel: "红色记忆馆官方" },
        { id: 7, name: "盐都文旅", avatar: avatar7, followed: false, official: true, officialLabel: "盐都文旅官方" },
        { id: 8, name: "自贡文旅", avatar: avatar8, followed: false, official: true, officialLabel: "自贡文旅官方" },
        { id: 9, name: "红色传承", avatar: avatar9, followed: false, official: true, officialLabel: "红色传承官方" },
        { id: 10, name: "蜀南文旅", avatar: avatar10, followed: false, official: true, officialLabel: "蜀南文旅官方" }
      ],
      page: 1,
      loading: false,
      hasMore: true
    };
  },
  created() {
    this.loadFeed();
  },
  computed: {
    filteredFeedList() {
      if (this.activeTab === 'follow') {
        return this.feedList.filter(item => item.blogger.followed);
      } else {
        return this.feedList;
      }
    }
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
      this.page = 1;
      this.feedList = [];
      this.hasMore = true;
      if (tab !== 'follow') {
        this.loadFeed();
      }
    },
    async loadFeed() {
      if (this.loading || !this.hasMore) return;
      this.loading = true;
      await new Promise(resolve => setTimeout(resolve, 800));
      const getBloggerById = (id) => ({ ...this.bloggers.find(b => b.id === id) });
      // 扩展动态数据，新增6-10号博主的动态
      const mockData = [
        {
          id: Date.now() + Math.random(),
          blogger: getBloggerById(1),
          postTime: '昨天',
          location: '四川自贡',
          cover: cover1,
          title: '"云"听书 《江姐真实家族史》1-9（持续更新中）',
          updateLabel: '更新至第九集',
          views: 3239,
          comments: 361,
          shares: 1217
        },
        {
          id: Date.now() + Math.random(),
          blogger: getBloggerById(1),
          postTime: '3天前',
          location: '四川自贡',
          cover: cover2,
          title: '我与江姐有个约 · 线下打卡活动',
          views: 1567,
          comments: 123,
          shares: 89
        },
        {
          id: Date.now() + Math.random(),
          blogger: getBloggerById(3),
          postTime: '2小时前',
          location: '四川自贡',
          cover: cover3,
          title: '点击即可撰写你的红色故事',
          views: 20,
          comments: 3,
          shares: 7
        },
        {
          id: Date.now() + Math.random(),
          blogger: getBloggerById(2),
          postTime: '1天前',
          location: '四川成都',
          cover: cover4,
          title: '告白预行绘本 · 最新章节更新',
          views: 890,
          comments: 45,
          shares: 23
        },
        {
          id: Date.now() + Math.random(),
          blogger: getBloggerById(4),
          postTime: '5天前',
          location: '四川绵阳',
          cover: cover5,
          title: '癸婷寒血寒将 · 历史故事分享',
          views: 560,
          comments: 28,
          shares: 15
        },
        {
          id: Date.now() + Math.random(),
          blogger: getBloggerById(5),
          postTime: '1周前',
          location: '四川宜宾',
          cover: cover6,
          title: '囡 · 日常随记分享',
          views: 320,
          comments: 18,
          shares: 9
        },
        // 新增6-10号博主的动态
        {
          id: Date.now() + Math.random(),
          blogger: getBloggerById(6),
          postTime: '1天前',
          location: '四川自贡',
          cover: cover7,
          title: '红色记忆馆 · 春节特别展览预告',
          updateLabel: '新增展品30+',
          views: 1250,
          comments: 89,
          shares: 56
        },
        {
          id: Date.now() + Math.random(),
          blogger: getBloggerById(7),
          postTime: '3小时前',
          location: '四川自贡',
          cover: cover8,
          title: '盐都文旅 · 灯会最新游玩攻略',
          views: 2890,
          comments: 210,
          shares: 189
        },
        {
          id: Date.now() + Math.random(),
          blogger: getBloggerById(8),
          postTime: '2天前',
          location: '四川自贡',
          cover: cover9,
          title: '自贡文旅 · 恐龙博物馆新馆开放',
          updateLabel: '预约通道已开启',
          views: 4560,
          comments: 321,
          shares: 289
        },
        {
          id: Date.now() + Math.random(),
          blogger: getBloggerById(9),
          postTime: '4天前',
          location: '四川成都',
          cover: cover10,
          title: '红色传承 · 青少年研学活动招募',
          views: 890,
          comments: 78,
          shares: 45
        },
        {
          id: Date.now() + Math.random(),
          blogger: getBloggerById(10),
          postTime: '6天前',
          location: '四川宜宾',
          cover: cover7,
          title: '蜀南文旅 · 竹海景区冬季特惠',
          views: 1670,
          comments: 98,
          shares: 76
        }
      ];
      this.feedList = [...this.feedList, ...mockData];
      this.loading = false;
      this.page++;
      if (this.page > 4) this.hasMore = false;
    },
    handleScroll() {
      if (this.activeTab === 'follow') return;
      const list = this.$refs.feedListRef;
      if (list && list.scrollTop + list.clientHeight >= list.scrollHeight - 100 && !this.loading && this.hasMore) {
        this.loadFeed();
      }
    },
    toggleFollow(bloggerId) {
      const blogger = this.bloggers.find(b => b.id === bloggerId);
      if (blogger) {
        blogger.followed = !blogger.followed;
        this.feedList.forEach(item => {
          if (item.blogger.id === bloggerId) {
            item.blogger.followed = blogger.followed;
          }
        });
      }
    },
    goToBlogger(bloggerId) {
      this.$router.push({ path: `/blogger/${bloggerId}` });
    }
  }
};
</script>

<style scoped>
/* 基础重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

/* 页面容器 - 全屏适配 */
.feed-page {
  width: 100vw; /* 视口宽度100% */
  min-height: 100vh; /* 视口高度100% */
  background-color: #e4dfc7; /* 统一整体背景色，解决串色 */
  font-family: "Microsoft Yahei", sans-serif;
  position: relative;
  font-size: 16px; /* 基础字体大小 */
}

/* 顶部导航 - 自适应 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2vw 3vw; /* 使用视口单位适配 */
  background-color: #f5f0e6;
  border-bottom: 1px solid #f5f0e6;
}

.tab-nav {
  display: flex;
  gap: 3vw; /* 视口单位间距 */
}

.tab {
  font-size: clamp(14px, 2.5vw, 20px); /* 自适应字体：最小14px，最大20px，中间按视口比例 */
  color: #666;
  cursor: pointer;
  padding: 0.5vw 0;
  border-bottom: 2px solid transparent;
}

.tab.active {
  color: #a62b28;
  border-bottom-color: #a62b28;
  font-weight: bold;
}

.close-btn {
  font-size: clamp(18px, 3vw, 24px);
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  padding: 0;
  width: clamp(28px, 4vw, 40px);
  height: clamp(28px, 4vw, 40px);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 提示文字 */
.tip {
  text-align: center;
  font-size: clamp(12px, 2vw, 16px);
  color: #999;
  padding: 1vw 0;
  background-color: #e4dfc7;
}

/* 博主头像栏 - 优化布局，适配更多博主 */
.blogger-bar {
  display: flex;
  gap: 1.5vw; /* 减小间距，容纳更多博主 */
  padding: 1.5vw 3vw;
  background-color: #f5f0e6;
  overflow-x: auto;
  white-space: nowrap;
  /* 隐藏滚动条但保留滚动功能 */
  scrollbar-width: none; /* 火狐 */
}

/* 隐藏Chrome等浏览器的滚动条 */
.blogger-bar::-webkit-scrollbar {
  display: none;
}

.blogger-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  min-width: clamp(60px, 10vw, 90px); /* 最小宽度，确保显示完整 */
}

.avatar-container {
  position: relative !important;
  width: clamp(40px, 7vw, 70px); /* 微调头像大小，容纳更多 */
  height: clamp(40px, 7vw, 70px);
}

.blogger-left .avatar-container {
  width: clamp(30px, 6vw, 60px) !important;
  height: clamp(30px, 6vw, 60px) !important;
}

.avatar {
  width: 100%; /* 继承容器大小，自适应 */
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5vw;
  border: 2px solid transparent;
}

.blogger-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

/* V标 - 自适应 */
.v-badge {
  position: absolute !important;
  right: 0px !important;
  bottom: 0px !important;
  width: clamp(12px, 2.5vw, 24px) !important;
  height: clamp(12px, 2.5vw, 24px) !important;
  border-radius: 50% !important;
  z-index: 99 !important;
}

.red-v {
  background-color: #e63946;
}

.blue-v {
  background-color: #f0f0f1;
}

.blogger-item:hover .avatar {
  border-color: #a62b28;
}

.name {
  font-size: clamp(10px, 1.8vw, 16px);
  color: #333;
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  border: none !important;
  text-decoration: none !important;
}

/* 动态流列表 - 修复串色问题 */
.feed-list {
  min-height: calc(100vh - 180px); /* 更稳定的高度计算 */
  height: auto; /* 自动适应内容高度 */
  overflow-y: auto; /* 仅在内容超出时滚动 */
  padding: 0 3vw 1vw; /* 减少底部内边距 */
  width: 100%;
  background-color: #f5f0e6; /* 和页面/卡片背景色统一 */
}

.feed-item {
  background-color: #e4dfc7;
  border-radius: clamp(8px, 1.5vw, 16px);
  margin-bottom: 2vw;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  width: 100%;
}

/* 博主头部信息 - 自适应 */
.blogger-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5vw 3vw;
  background-color: #e4dfc7;
}

.blogger-left {
  display: flex;
  align-items: flex-start;
  gap: 1.5vw;
  border: none !important;
}

.blogger-info {
  display: flex;
  flex-direction: column;
  gap: 0.5vw;
}

.blogger-name-row {
  display: flex;
  align-items: center;
  gap: 1vw;
  overflow: hidden;
  line-height: 1 !important;
  border: none !important;
  text-decoration: none !important;
}

.blogger-name {
  font-size: clamp(14px, 2.5vw, 22px);
  color: #333;
  font-weight: 500;
  border: none !important;
  outline: none !important;
  text-decoration: none !important;
  line-height: 1 !important;
  box-shadow: none !important;
}

.official-tag {
  background-color: #e63946;
  color: white;
  font-size: clamp(10px, 1.8vw, 16px);
  padding: 0.2vw 1vw;
  border-radius: clamp(4px, 1vw, 8px);
  line-height: 1.2;
  border: none !important;
}

.post-info {
  font-size: clamp(12px, 2vw, 18px);
  color: #999;
  border: none !important;
}

.post-info span {
  margin-right: 2vw;
  border: none !important;
}

.follow-btn {
  background-color: #e63946;
  color: #fff;
  border: none !important;
  padding: 1vw 2.5vw;
  border-radius: clamp(20px, 3vw, 30px);
  font-size: clamp(12px, 2vw, 18px);
  cursor: pointer;
  outline: none !important;
}

.follow-btn.followed {
  background-color: #ccc !important;
  color: #666 !important;
}

/* 博客内容 - 自适应 */
.feed-content {
  padding: 1vw 3vw 1.5vw;
  background-color: #e4dfc7;
  border: none !important;
  width: 100%;
}

.cover-container {
  position: relative;
  border-radius: clamp(8px, 1.5vw, 16px);
  overflow: hidden;
  margin-bottom: 1vw;
  width: 100%;
}

.feed-cover {
  width: 100%;
  height: auto;
  display: block;
}

.update-label {
  position: absolute;
  top: 1.5vw;
  right: 1.5vw;
  background: rgba(0,0,0,0.6);
  color: white;
  font-size: clamp(12px, 2vw, 18px);
  padding: 0.5vw 1.5vw;
  border-radius: clamp(4px, 1vw, 8px);
  display: flex;
  align-items: center;
  gap: 1vw;
}

.play-icon {
  width: clamp(12px, 2vw, 20px);
  height: clamp(12px, 2vw, 20px);
  filter: invert(1);
}

/* 左下角标题 - 自适应 */
.floating-title {
  position: absolute;
  bottom: 1.5vw;
  left: 1.5vw;
  color: white;
  font-size: clamp(12px, 2vw, 20px);
  padding: 0.5vw 1.5vw;
  border-radius: clamp(4px, 1vw, 8px);
  max-width: 80%;
  line-height: 1.3;
  text-shadow: 0 0 2px rgba(0,0,0,0.5);
}

/* 内容底部布局 - 自适应 */
.content-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.floating-title-text {
  font-size: clamp(12px, 2vw, 20px);
  color: #333;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.feed-stats {
  display: flex;
  gap: 2vw;
  font-size: clamp(12px, 2vw, 18px);
  color: #666;
  border: none !important;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5vw;
  border: none !important;
}

.stat-icon {
  width: clamp(14px, 2.5vw, 24px);
  height: clamp(14px, 2.5vw, 24px);
}

/* 加载状态 - 自适应 */
.loading, .no-more {
  text-align: center;
  font-size: clamp(12px, 2vw, 18px);
  color: #999;
  padding: 1.5vw 0;
  border: none !important;
}

.empty-tip {
  text-align: center;
  font-size: clamp(14px, 2.5vw, 22px);
  color: #999;
  padding: 5vw 0;
}

/* 大屏适配优化（不再限制最大宽度，而是自适应放大） */
@media (min-width: 768px) {
  .feed-page {
    width: 100%;
  }
  .feed-list {
    min-height: calc(100vh - 200px);
  }
  /* 大屏下博主头像间距微调 */
  .blogger-bar {
    gap: 2vw;
  }
  .avatar-container {
    width: clamp(50px, 8vw, 80px);
    height: clamp(50px, 8vw, 80px);
  }
}

/* 移动端小屏适配 */
@media (max-width: 480px) {
  .feed-list {
    min-height: calc(100vh - 160px);
  }
  /* 小屏下减小头像大小，容纳更多博主 */
  .avatar-container {
    width: clamp(35px, 7vw, 60px);
    height: clamp(35px, 7vw, 60px);
  }
}
</style>