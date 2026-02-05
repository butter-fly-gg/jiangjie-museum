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

    <!-- 博主头像栏 -->
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
      <div class="feed-item" v-for="item in feedList" :key="item.id">
        <!-- 博主头部信息 -->
        <div class="blogger-header">
          <div class="blogger-left">
            <div class="avatar-container">
              <img :src="item.blogger.avatar" alt="博主头像" class="blogger-avatar">
              <img v-if="item.blogger.id === 1" class="v-badge red-v" src="../imgs/黄v.png" alt="红V">
              <img v-else-if="item.blogger.official" class="v-badge blue-v" src="../imgs/蓝v.png" alt="蓝V">
            </div>
            <div class="blogger-name-row">
              <span class="blogger-name">{{ item.blogger.name }}</span>
              <span v-if="item.blogger.official" class="official-tag">{{ item.blogger.officialLabel }}</span>
            </div>
          </div>
          <button class="follow-btn" :class="{followed: item.blogger.followed}" @click="toggleFollow(item.blogger.id)">
            {{ item.blogger.followed ? '已关注' : '关注' }}
          </button>
        </div>
        <!-- 发布时间与地点 -->
        <div class="post-info">
          <span>{{ item.postTime }}</span>
          <span>发布于 {{ item.location }}</span>
        </div>
        <!-- 博客内容：文字悬浮在图片上 -->
        <div class="feed-content">
          <!-- 封面图片容器（相对定位，承载悬浮元素） -->
          <div class="cover-container">
            <img :src="item.cover" alt="动态封面" class="feed-cover">
            <!-- 右上角更新标签 -->
            <div v-if="item.updateLabel" class="update-label">
              <img src="../imgs/播放.png" alt="播放" class="play-icon">
              <span>{{ item.updateLabel }}</span>
            </div>
            <!-- 左下角悬浮标题 -->
            <div class="floating-title">
              {{ item.title }}
            </div>
          </div>
          <!-- 统计数据（带图标） -->
          <div class="feed-stats">
            <span class="stat-item">
              <img src="../imgs/播放.png" alt="播放" class="stat-icon">
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

      <!-- 加载更多提示 -->
      <div class="loading" v-if="loading">加载中...</div>
      <div class="no-more" v-if="!loading && !hasMore">已加载全部</div>
    </div>
  </div>
</template>

<script>
// 1. 导入所有头像图片
import avatar1 from '../imgs/头像1.jpg';
import avatar2 from '../imgs/头像2.jpg';
import avatar3 from '../imgs/头像3.jpg';
import avatar4 from '../imgs/头像4.jpg';
import avatar5 from '../imgs/头像5.jpg';

// 2. 导入所有动态封面图片
import cover1 from '../imgs/动态1.webp';    // 江姐故里-云听书
import cover2 from '../imgs/动态2.jpg';    // 江姐故里-线下打卡
import cover3 from '../imgs/动态5.jpg';    // 霹雳复合蚯蚓-红色故事
import cover4 from '../imgs/动态6.jpg';    // 告白预行绘本-章节更新
import cover5 from '../imgs/动态6.webp';   // 癸婷寒血寒将-内容
import cover6 from '../imgs/动态4.webp';   // 囡-内容

export default {
  data() {
    return {
      activeTab: 'recommend',
      feedList: [],
      bloggers: [
        { id: 1, name: "江姐故里", avatar: avatar1, followed: false, official: true, officialLabel: "江姐故里官方" },
        { id: 2, name: "告白预行绘本", avatar: avatar2, followed: false, official: true },
        { id: 3, name: "霹雳复合蚯蚓", avatar: avatar3, followed: false, official: true },
        { id: 4, name: "癸婷寒血寒将", avatar: avatar4, followed: false, official: true },
        { id: 5, name: "囡", avatar: avatar5, followed: false, official: true }
      ],
      page: 1,
      loading: false,
      hasMore: true
    };
  },
  created() {
    this.loadFeed();
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
      this.page = 1;
      this.feedList = [];
      this.hasMore = true;
      this.loadFeed();
    },
    async loadFeed() {
      if (this.loading || !this.hasMore) return;
      this.loading = true;

      await new Promise(resolve => setTimeout(resolve, 800));

      // 模拟多博主的博客数据
      const mockData = [
        {
          id: Date.now() + Math.random(),
          blogger: this.bloggers[0],
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
          blogger: this.bloggers[0],
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
          blogger: this.bloggers[2],
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
          blogger: this.bloggers[1],
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
          blogger: this.bloggers[3],
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
          blogger: this.bloggers[4],
          postTime: '1周前',
          location: '四川宜宾',
          cover: cover6,
          title: '囡 · 日常随记分享',
          views: 320,
          comments: 18,
          shares: 9
        }
      ];

      this.feedList = [...this.feedList, ...mockData];
      this.loading = false;
      this.page++;

      if (this.page > 4) {
        this.hasMore = false;
      }
    },
    handleScroll() {
      const list = this.$refs.feedListRef;
      if (list && list.scrollTop + list.clientHeight >= list.scrollHeight - 100 && !this.loading && this.hasMore) {
        this.loadFeed();
      }
    },
    toggleFollow(bloggerId) {
      const blogger = this.bloggers.find(b => b.id === bloggerId);
      if (blogger) {
        blogger.followed = !blogger.followed;
      }
      this.feedList.forEach(item => {
        if (item.blogger.id === bloggerId) {
          item.blogger.followed = !item.blogger.followed;
        }
      });
    },
    goToBlogger(bloggerId) {
      this.$router.push({ path: `/blogger/${bloggerId}` });
    }
  }
};
</script>

<style scoped>
/* 页面容器 */
.feed-page {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f0e6;
  font-family: "Microsoft Yahei", sans-serif;
  position: relative;
}

/* 顶部导航 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background-color: #f5f0e6;
  border-bottom: 1px solid #f5f0e6;
}

.tab-nav {
  display: flex;
  gap: 20px;
}

.tab {
  font-size: 15px;
  color: #666;
  cursor: pointer;
  padding: 4px 0;
  border-bottom: 2px solid transparent;
}

.tab.active {
  color: #a62b28;
  border-bottom-color: #a62b28;
  font-weight: bold;
}

.close-btn {
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 提示文字 */
.tip {
  text-align: center;
  font-size: 12px;
  color: #999;
  padding: 8px 0;
  background-color: #e4dfc7;
}

/* 博主头像栏 */
.blogger-bar {
  display: flex;
  gap: 16px;
  padding: 12px 16px;
  background-color: #f5f0e6;
  overflow-x: auto;
  white-space: nowrap;
}

.blogger-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.avatar-container {
  position: relative;
  width: 50px;
  height: 50px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 4px;
  border: 2px solid transparent;
}

.v-badge {
  position: absolute;
  right: -2px;
  bottom: -2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
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
  font-size: 11px;
  color: #333;
  text-align: center;
  width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 动态流列表 */
.feed-list {
  height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 0 16px 20px;
}

.feed-item {
  background-color: #e4dfc7;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

/* 博主头部信息 */
.blogger-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #e4dfc7;
}

.blogger-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.blogger-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.blogger-name-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.blogger-name {
  font-size: 15px;
  color: #333;
  font-weight: 500;
}

.official-tag {
  background-color: #e63946;
  color: white;
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
}

.follow-btn {
  background-color: #e63946;
  color: #fff;
  border: none;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
}

.follow-btn.followed {
  background-color: #ccc;
  color: #666;
}

/* 发布信息 */
.post-info {
  padding: 0 16px 8px;
  font-size: 12px;
  color: #999;
  background-color: #e4dfc7;
}

.post-info span {
  margin-right: 12px;
}

/* 博客内容 */
.feed-content {
  padding: 12px 16px 8px;
  background-color: #e4dfc7;
}

/* 封面容器（承载悬浮元素） */
.cover-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 8px;
}

.feed-cover {
  width: 100%;
  height: auto;
  display: block;
}

/* 右上角更新标签 */
.update-label {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,0.6);
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.play-icon {
  width: 14px;
  height: 14px;
  filter: invert(1);
}

/* 左下角悬浮标题 */
.floating-title {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  font-size: 13px;
  background: rgba(0,0,0,0.5);
  padding: 4px 8px;
  border-radius: 4px;
  max-width: 80%;
  line-height: 1.3;
}

/* 统计数据 */
.feed-stats {
  display: flex;
  gap: 20px;
  font-size: 12px;
  color: #666;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 3px;
}

.stat-icon {
  width: 16px;
  height: 16px;
}

/* 加载状态 */
.loading, .no-more {
  text-align: center;
  font-size: 12px;
  color: #999;
  padding: 10px 0;
}

/* 适配大屏 */
@media (min-width: 768px) {
  .feed-page {
    max-width: 600px;
    margin: 0 auto;
  }
  .feed-list {
    height: calc(100vh - 180px);
  }
}
</style>