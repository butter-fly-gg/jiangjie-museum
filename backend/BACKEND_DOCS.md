// 后端项目完整结构说明

## 目录结构
```
backend/
├── models/                 # 数据模型
│   ├── Product.js         # 商品模型
│   ├── VolunteerActivity.js # 志愿活动模型
│   └── Travel.js          # 导览模型
├── routes/                # 路由定义
│   ├── travel.js          # 游历相关路由
│   ├── shop.js            # 商城相关路由
│   └── volunteer.js       # 志愿者相关路由
├── controllers/           # 控制器
│   ├── productController.js
│   ├── travelController.js
│   └── volunteerController.js
├── middleware/            # 中间件
├── utils/                 # 工具函数
├── server.js              # 服务器入口
├── seed.js                # 数据初始化脚本
├── package.json           # 依赖配置
└── .env                   # 环境变量配置
```

## API接口文档

### 游历板块 (Travel)
- GET /api/travel/guides - 获取所有导览内容
- GET /api/travel/guides/:id - 获取导览详情
- GET /api/travel/panoramas - 获取全景展示
- GET /api/travel/routes - 获取路线规划
- GET /api/travel/search?keyword=xxx - 搜索导览内容

### 商城板块 (Shop)
- GET /api/shop/hot - 获取热门商品
- GET /api/shop/series - 获取系列商品
- GET /api/shop/products - 获取商品列表（分页）
- GET /api/shop/products/:id - 获取商品详情
- GET /api/shop/categories/:category - 按分类获取商品
- GET /api/shop/search?keyword=xxx - 搜索商品

### 志愿者板块 (Volunteer)
- GET /api/volunteer/activities - 获取所有志愿活动
- GET /api/volunteer/activities/:id - 获取活动详情
- GET /api/volunteer/activities/status/:status - 按状态筛选活动
- GET /api/volunteer/featured - 获取推荐活动
- POST /api/volunteer/activities/:id/join - 参与活动
- GET /api/volunteer/search?keyword=xxx - 搜索活动

## 数据模型说明

### Product (商品模型)
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
- isHot: 是否热门
- rank: 排名

### VolunteerActivity (志愿活动模型)
- title: 活动标题
- description: 活动描述
- image: 活动图片
- startDate: 开始时间
- endDate: 结束时间
- status: 活动状态
- location: 活动地点
- maxParticipants: 最大参与人数
- currentParticipants: 当前参与人数
- requirements: 参与要求
- benefits: 参与福利
- isFeatured: 是否推荐

### Travel (导览模型)
- title: 导览标题
- description: 导览描述
- image: 导览图片
- type: 导览类型
- location: 位置
- duration: 预计时长
- difficulty: 难度等级
- points: 景点列表
- isFeatured: 是否推荐
- viewCount: 浏览次数