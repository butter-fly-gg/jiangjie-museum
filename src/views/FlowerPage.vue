<template>
  <div class="feed-page">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="tab-nav">
        <div class="tab" :class="{active: activeTab === 'follow'}" @click="switchTab('follow')">关注</div>
        <div class="tab" :class="{active: activeTab === 'reco`mmend'}" @click="switchTab('recommend')">推荐</div>
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

        <!-- 博客内容 -->
        <div class="feed-content">
          <div class="cover-container">
            <img :src="item.cover" alt="动态封面" class="feed-cover">
            <div v-if="item.updateLabel" class="update-label">
              <img src="../imgs/播放.png" alt="播放" class="play-icon">
              <span>{{ item.updateLabel }}</span>
            </div>
            <div class="floating-title">
              {{ item.title }}
            </div>
          </div>
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

    <!-- 左下角固定发布按钮 -->
    <div class="publish-btn" @click="openPublishModal">
      <img src="../imgs/导航栏（❀）.png" alt="发布博客" class="publish-icon">
    </div>

    <!-- 撰写博客弹窗 -->
    <div class="modal-mask" v-if="showPublishModal" @click="closePublishModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>撰写我的博客</h3>
          <button class="close-modal" @click="closePublishModal">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitBlog">
            <div class="form-item">
              <label>标题</label>
              <input 
                type="text" 
                v-model="blogForm.title" 
                placeholder="请输入博客标题" 
                required
                class="form-input"
              >
            </div>
            <div class="form-item">
              <label>发布地点</label>
              <input 
                type="text" 
                v-model="blogForm.location" 
                placeholder="请输入发布地点" 
                required
                class="form-input"
              >
            </div>
            <div class="form-item">
              <label>选择博主（自己）</label>
              <select v-model="blogForm.bloggerId" class="form-select" required>
                <option v-for="blogger in bloggers" :key="blogger.id" :value="blogger.id">
                  {{ blogger.name }}
                </option>
              </select>
            </div>
            <div class="form-actions">
              <button type="button" class="cancel-btn" @click="closePublishModal">取消</button>
              <button type="submit" class="submit-btn" :disabled="publishing">
                {{ publishing ? '发布中...' : '发布' }}
              </button>
            </div>
          </form>
        </div>
      </div>
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
import cover7 from '../imgs/动态6.jpg';
import cover8 from '../imgs/动态3.jpg';
import cover9 from '../imgs/动态2.jpg';
import cover10 from '../imgs/动态6.jpg';

export default {
  data() {
    return {
      activeTab: 'recommend',
      feedList: [],
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
      hasMore: true,
      // 发布博客相关
      showPublishModal: false,
      publishing: false,
      blogForm: {
        title: '',
        location: '',
        bloggerId: 1 // 默认选中第一个博主
      }
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
    },
    // 打开发布弹窗
    openPublishModal() {
      this.showPublishModal = true;
      // 重置表单
      this.blogForm = {
        title: '',
        location: '',
        bloggerId: 1
      };
    },
    // 关闭发布弹窗
    closePublishModal() {
      this.showPublishModal = false;
      this.publishing = false;
    },
    // 提交博客（模拟后端）
    async submitBlog() {
      this.publishing = true;
      
      try {
        // 模拟后端请求
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 构造新博客数据
        const getBloggerById = (id) => ({ ...this.bloggers.find(b => b.id === id) });
        const newBlog = {
          id: Date.now() + Math.random(),
          blogger: getBloggerById(this.blogForm.bloggerId),
          postTime: '刚刚',
          location: this.blogForm.location,
          cover: cover1, // 默认封面
          title: this.blogForm.title,
          updateLabel: '',
          views: 0,
          comments: 0,
          shares: 0
        };
        
        // 添加到前端列表（真实场景是后端返回后更新）
        this.feedList.unshift(newBlog);
        
        // 提示成功
        alert('博客发布成功！');
        this.closePublishModal();
      } catch (error) {
        alert('发布失败，请重试！');
        this.publishing = false;
      }
    }
  }
};
</script>

<style scoped>
/* 原有样式保持不变，新增以下样式 */

/* 左下角固定发布按钮 */
.publish-btn {
  position: fixed;
  right: -4vw;
  bottom: 3vw;
  width: clamp(50px, 10vw, 80px);
  height: clamp(50px, 10vw, 80px);
  border-radius: 50%;
  background-color: #a62b28;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  cursor: pointer;
  z-index: 999;
}

.publish-btn:hover {
  background-color: #8c2320;
}

/* 弹窗遮罩 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* 弹窗内容 */
.modal-content {
  width: clamp(300px, 80vw, 600px);
  background-color: #fff;
  border-radius: clamp(8px, 1.5vw, 16px);
  padding: 2vw;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
  padding-bottom: 1vw;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  font-size: clamp(16px, 2.5vw, 22px);
  color: #333;
  margin: 0;
}

.close-modal {
  background: none;
  border: none;
  font-size: clamp(18px, 3vw, 24px);
  cursor: pointer;
  color: #999;
}

/* 表单样式 */
.modal-body {
  padding: 1vw 0;
}

.form-item {
  margin-bottom: 2vw;
}

.form-item label {
  display: block;
  margin-bottom: 0.8vw;
  font-size: clamp(14px, 2vw, 18px);
  color: #666;
}

.form-input, .form-select {
  width: 100%;
  padding: 1.2vw;
  border: 1px solid #ddd;
  border-radius: clamp(4px, 1vw, 8px);
  font-size: clamp(14px, 2vw, 18px);
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1.5vw;
  margin-top: 2vw;
}

.cancel-btn {
  padding: 1vw 2vw;
  border: 1px solid #ddd;
  border-radius: clamp(4px, 1vw, 8px);
  background-color: #fff;
  color: #666;
  cursor: pointer;
  font-size: clamp(14px, 2vw, 18px);
}

.submit-btn {
  padding: 1vw 2vw;
  border: none;
  border-radius: clamp(4px, 1vw, 8px);
  background-color: #a62b28;
  color: #fff;
  cursor: pointer;
  font-size: clamp(14px, 2vw, 18px);
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 原有样式 */
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

.feed-page {
  width: 100vw;
  min-height: 100vh;
  background-color: #e4dfc7;
  font-family: "Microsoft Yahei", sans-serif;
  position: relative;
  font-size: 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2vw 3vw;
  background-color: #f5f0e6;
  border-bottom: 1px solid #f5f0e6;
}

.tab-nav {
  display: flex;
  gap: 3vw;
}

.tab {
  font-size: clamp(14px, 2.5vw, 20px);
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

.tip {
  text-align: center;
  font-size: clamp(12px, 2vw, 16px);
  color: #999;
  padding: 1vw 0;
  background-color: #e4dfc7;
}

.blogger-bar {
  display: flex;
  gap: 1.5vw;
  padding: 1.5vw 3vw;
  background-color: #f5f0e6;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
}

.blogger-bar::-webkit-scrollbar {
  display: none;
}

.blogger-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  min-width: clamp(60px, 10vw, 90px);
}

.avatar-container {
  position: relative !important;
  width: clamp(40px, 7vw, 70px);
  height: clamp(40px, 7vw, 70px);
}

.blogger-left .avatar-container {
  width: clamp(30px, 6vw, 60px) !important;
  height: clamp(30px, 6vw, 60px) !important;
}

.avatar {
  width: 100%;
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

.feed-list {
  min-height: calc(100vh - 180px);
  height: auto;
  overflow-y: auto;
  padding: 0 3vw 1vw;
  width: 100%;
  background-color: #f5f0e6;
}

.feed-item {
  background-color: #e4dfc7;
  border-radius: clamp(8px, 1.5vw, 16px);
  margin-bottom: 2vw;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  width: 100%;
}

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

@media (min-width: 768px) {
  .feed-page {
    width: 100%;
  }
  .feed-list {
    min-height: calc(100vh - 200px);
  }
  .blogger-bar {
    gap: 2vw;
  }
  .avatar-container {
    width: clamp(50px, 8vw, 80px);
    height: clamp(50px, 8vw, 80px);
  }
}

@media (max-width: 480px) {
  .feed-list {
    min-height: calc(100vh - 160px);
  }
  .avatar-container {
    width: clamp(35px, 7vw, 60px);
    height: clamp(35px, 7vw, 60px);
  }
}
</style>