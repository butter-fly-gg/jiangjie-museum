# 江姐故里博物馆后端服务

## 项目介绍
为江姐故里博物馆Vue3前端应用提供RESTful API服务

## 技术栈
- Node.js + Express
- MongoDB + Mongoose
- JWT认证
- RESTful API设计

## 安装依赖
```bash
npm install
```

## 环境配置
创建 `.env` 文件：
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/jiangjie_museum
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## 启动服务
```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

## 初始化数据
```bash
node seed.js
```

## API接口文档

### 游历板块 (Travel)
- `GET /api/travel/guides` - 获取所有导览内容
- `GET /api/travel/guides/:id` - 获取导览详情
- `GET /api/travel/panoramas` - 获取全景展示
- `GET /api/travel/routes` - 获取路线规划
- `GET /api/travel/search?keyword=xxx` - 搜索导览内容

### 商城板块 (Shop)
- `GET /api/shop/hot` - 获取热门商品
- `GET /api/shop/series` - 获取系列商品
- `GET /api/shop/products` - 获取商品列表（分页）
- `GET /api/shop/products/:id` - 获取商品详情
- `GET /api/shop/categories/:category` - 按分类获取商品
- `GET /api/shop/search?keyword=xxx` - 搜索商品

### 志愿者板块 (Volunteer)
- `GET /api/volunteer/activities` - 获取所有志愿活动
- `GET /api/volunteer/activities/:id` - 获取活动详情
- `GET /api/volunteer/activities/status/:status` - 按状态筛选活动
- `GET /api/volunteer/featured` - 获取推荐活动
- `POST /api/volunteer/activities/:id/join` - 参与活动
- `GET /api/volunteer/search?keyword=xxx` - 搜索活动

### 健康检查
- `GET /api/health` - 服务健康检查

## 数据模型

### Product (商品)
- name: 商品名称
- description: 商品描述
- price: 价格
- category: 分类
- series: 系列
- image: 图片
- stock: 库存
- sales: 销量
- rating: 评分
- flavors: 口味选项

### VolunteerActivity (志愿活动)
- title: 活动标题
- description: 活动描述
- image: 图片
- startDate: 开始时间
- endDate: 结束时间
- status: 状态
- maxParticipants: 最大参与人数
- currentParticipants: 当前参与人数

### Travel (导览)
- title: 标题
- description: 描述
- image: 图片
- type: 类型
- points: 景点列表
- difficulty: 难度等级

## 前端对接说明
前端应用默认访问地址：http://localhost:3000
确保在前端项目中配置正确的API基础URL