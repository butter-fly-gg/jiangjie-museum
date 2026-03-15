# Travel 板块前后端集成说明

## 修改概述

已将 Travel 板块的 4 个页面恢复为动态数据驱动模式，同时保留了所有原有的页面跳转功能。

---

## 修改的文件

### 1. TravelPage.vue（游历主页）

**前端改动：**
- ✅ 全景展示从静态循环改为从数据库动态加载
- ✅ 使用 `v-for="panorama in panoramas"` 渲染后端数据
- ✅ 添加 API调用获取全景展示数据
- ✅ 保留 AR 导览按钮和跳转逻辑

**后端集成：**
```javascript
import { travelAPI } from '@/api'

const fetchPanoramas = async () => {
  const response = await travelAPI.getPanoramas()
  panoramas.value = response.data
}
```

**API 端点：**
- `GET /api/travel/panoramas` - 获取全景展示列表

---

### 2. TravelVolunteer.vue（志愿服务页）

**前端改动：**
- ✅ 活动列表从静态卡片改为动态渲染
- ✅ 使用 `v-for="activity in activities"` 渲染后端数据
- ✅ 实现智能状态判断（进行中/已结束/即将开放）
- ✅ 动态倒计时计算
- ✅ 按钮文本和禁用状态动态控制
- ✅ **保留返回按钮跳转至 `/travel`**

**后端集成：**
```javascript
import { volunteerAPI } from '@/api'

const fetchActivities = async () => {
  const response = await volunteerAPI.getActivities()
  activities.value = response.data
}

const joinActivity = async (id) => {
  const response = await volunteerAPI.joinActivity(id)
  alert(response.message)
  fetchActivities() // 刷新列表
}
```

**辅助函数：**
- `getStatusClass(status)` - 根据状态返回 CSS 类名
- `getCountdownText(activity)` - 智能计算倒计时
- `getButtonText(status)` - 返回按钮文本

**API 端点：**
- `GET /api/volunteer/activities` - 获取所有志愿活动
- `POST /api/volunteer/join/:id` - 参与活动

---

### 3. TravelShop.vue（商城页）

**前端改动：**
- ✅ 已有完整的后端集成（无需修改）
- ✅ 热门商品从后端加载，失败时降级到静态数据
- ✅ 系列商品从后端加载，失败时降级到静态数据
- ✅ **保留商品详情跳转逻辑**（点击跳转到 `/travel/shop/detail`）

**后端集成：**
```javascript
import { shopAPI } from '@/api'

const fetchHotProducts = async () => {
  const response = await shopAPI.getHotProducts()
  hotItems.value = response.data.map((item, index) => ({
    ...item,
    rank: `NO.${index + 1}`,
    label: item.category || '文创产品'
  }))
}
```

**API 端点：**
- `GET /api/shop/hot` - 获取热门商品
- `GET /api/shop/series?series=江姐故里系列` - 获取系列商品

---

### 4. TravelShop_1.vue（商品详情页）

**前端改动：**
- ✅ 已有完整的后端集成（无需修改）
- ✅ 从路由参数或 localStorage 获取商品 ID
- ✅ 根据商品 ID 从后端加载详细信息
- ✅ 显示加载状态
- ✅ **保留返回按钮和收藏功能**

**后端集成：**
```javascript
import { shopAPI } from '@/api'

const fetchProductDetail = async (id) => {
  const response = await shopAPI.getProductById(id)
  product.value = response.data
}
```

**API 端点：**
- `GET /api/shop/products/:id` - 获取商品详情

---

## 数据流程

```
前端组件
   ↓
import { xxxAPI } from '@/api'
   ↓
调用 API 函数
   ↓
axios/fetch 请求
   ↓
后端 Express 服务器 (http://localhost:3000)
   ↓
MongoDB 数据库
   ↓
返回 JSON 数据
   ↓
更新前端响应式数据
   ↓
Vue 自动更新 DOM
```

---

## 页面跳转关系（已保留）

```
TravelPage.vue (游历主页)
   ├─→ BeautifulAR.vue (AR 导览)
   └─→ BeautifulMap.vue (地图导览)

TravelVolunteer.vue (志愿服务)
   └─→ TravelPage.vue (返回游历主页)

TravelShop.vue (商城列表)
   └─→ TravelShop_1.vue (商品详情)

TravelShop_1.vue (商品详情)
   └─→ TravelShop.vue (返回列表)
```

---

## 启动步骤

### 1. 启动后端服务器
```bash
cd backend
npm install
node seed.js          # 首次运行，初始化数据库
node server.js        # 启动后端服务
```

后端将在 `http://localhost:3000` 运行

### 2. 启动前端开发服务器
```bash
npm run serve
```

前端将在 `http://localhost:8080` 运行

---

## 测试验证

### TravelPage 测试
1. 访问游历首页
2. 检查全景展示是否显示数据库中的图片
3. 点击"AR 实景导览"应弹出提示框

### TravelVolunteer 测试
1. 进入志愿服务页面
2. 检查活动列表是否显示 3 个活动
3. 验证状态标签颜色：
   - 进行中 → 绿色
   - 已结束 → 灰色
   - 即将开放 → 橙色
4. "立即参与"按钮应可点击
5. 其他状态的按钮应禁用

### TravelShop 测试
1. 进入商城页面
2. 检查热门商品和系列商品是否正常显示
3. 点击任意商品应跳转到详情页

### TravelShop_1 测试
1. 从商城列表点击进入商品详情
2. 检查商品信息、价格、评价等是否正常显示
3. 返回按钮应能回到列表页

---

## 故障排除

### 问题 1：数据显示"加载中..."
**原因：** 后端服务器未启动或数据库连接失败

**解决：**
1. 检查后端服务是否运行：访问 http://localhost:3000/api/health
2. 检查 MongoDB 是否运行
3. 查看浏览器控制台的网络请求错误

### 问题 2：ESLint no-unused-vars 错误
**原因：** 定义了但未使用的变量或函数

**解决：**
- 如果是暂时不用的功能函数，添加注释：
  ```javascript
  // eslint-disable-next-line no-unused-vars
  const someFunction = () => {}
  ```
- 或者移除未使用的导入和函数

### 问题 3：CORS 跨域错误
**原因：** 后端未配置 CORS

**解决：**
检查 `backend/server.js` 中是否包含：
```javascript
app.use(cors())
```

---

## API服务配置

所有 API 基础路径配置在 `src/api/index.js`：
```javascript
const API_BASE_URL = 'http://localhost:3000/api'
```

如需修改后端端口，在此文件统一修改。

---

## 总结

✅ **已完成：**
- 前后端数据打通
- 动态数据渲染
- 错误降级处理
- 页面跳转功能保留
- 加载状态显示
- 智能状态判断

✅ **保留的功能：**
- 所有页面间的路由跳转
- 返回按钮导航
- 商品详情跳转
- AR 导览入口
- 收藏功能 UI

📊 **数据源：**
- 全景展示：MongoDB `travels` 集合
- 志愿活动：MongoDB `volunteeractivities` 集合
- 商品信息：MongoDB `products` 集合
