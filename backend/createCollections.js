// MongoDB 数据库集合创建命令
// 在 MongoDB Shell 或 Navicat 中执行以下命令

// ============================================
// 1. 创建并切换到数据库
// ============================================
use jiangjie_museum

// ============================================
// 2. products 集合 - 商品信息
// ============================================
db.products.insertMany([
  {
    name: '《永远的江姐》青少年 AR 研学绘本',
    description: 'AR ILLUSTRATION TEENAGERS' ARTBOOK - 结合 AR 技术的互动式学习绘本，让青少年在沉浸式体验中学习红色文化',
    price: 29,
    category: '文创产品',
    series: '江姐故里系列',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5KZW50cm9sIEFydCwgVGhlIEVwbGFuY2Ugb2YgR2lyIGluIFRoZSBQb2ludGluZyBwcmltYSBpcyBsaWtlIGluIGFuIGJldHRlciBjb2xvci48L3RleHQ+PC9zdmc+',
    stock: 100,
    sales: 150,
    rating: 4.8,
    isHot: true,
    rank: 1
  },
  {
    name: '红梅傲雪公交印章',
    description: 'SNOWY STAMP - 纪念版公交印章，限量发行，以红梅为主题，象征坚韧不拔的革命精神',
    price: 10,
    category: '纪念品',
    series: '江姐故里系列',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5KZW50cm9sIEFydCwgVGhlIEVwbGFuY2Ugb2YgR2lyIGluIFRoZSBQb2ludGluZyBwcmltYSBpcyBsaWtlIGluIGFuIGJldHRlciBjb2xvci48L3RleHQ+PC9zdmc+',
    stock: 50,
    sales: 89,
    rating: 4.5,
    isHot: true,
    rank: 2
  },
  {
    name: '故居传承高粱酒',
    description: 'SUPERNOVA WINE - 江姐故居传承高粱酒，采用传统工艺酿造，精选优质红高粱，口感醇厚，回味悠长',
    price: 399,
    category: '酒类',
    series: '江姐故里系列',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5KZW50cm9sIEFydCwgVGhlIEVwbGFuY2Ugb2YgR2lyIGluIFRoZSBQb2ludGluZyBwcmltYSBpcyBsaWtlIGluIGFuIGJldHRlciBjb2xvci48L3RleHQ+PC9zdmc+',
    stock: 20,
    sales: 35,
    rating: 4.9,
    isHot: true,
    rank: 3,
    flavors: [
      { name: '原味', description: '传统原味' },
      { name: '陈酿', description: '陈年佳酿' },
      { name: '特制', description: '特别调制' }
    ]
  },
  {
    name: '【故里国庆非遗漆扇】',
    description: '国庆特别版非遗漆扇，手工制作，融合传统工艺与红色文化，扇面绘制精美图案',
    price: 29,
    category: '文创产品',
    series: '江姐故里系列',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5KZW50cm9sIEFydCwgVGhlIEVwbGFuY2Ugb2YgR2lyIGluIFRoZSBQb2ludGluZyBwcmltYSBpcyBsaWtlIGluIGFuIGJldHRlciBjb2xvci48L3RleHQ+PC9zdmc+',
    stock: 80,
    sales: 42,
    rating: 4.6,
    isHot: false
  },
  {
    name: '【经络疏通养生锤】',
    description: '传统工艺制作的养生锤，用于经络疏通，保健养生，适合中老年人使用',
    price: 30,
    category: '文创产品',
    series: '江姐故里系列',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5KZW50cm9sIEFydCwgVGhlIEVwbGFuY2Ugb2YgR2lyIGluIFRoZSBQb2ludGluZyBwcmltYSBpcyBsaWtlIGluIGFuIGJldHRlciBjb2xvci48L3RleHQ+PC9zdmc+',
    stock: 60,
    sales: 28,
    rating: 4.3,
    isHot: false
  }
])

// ============================================
// 3. volunteeractivities 集合 - 志愿活动信息
// ============================================
db.volunteeractivities.insertMany([
  {
    title: '那时春里——公益讲解',
    description: '为游客提供专业的江姐故里历史讲解服务，传播红色文化，弘扬革命精神',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5QaG90byBTYW1wbGU8L3RleHQ+PC9zdmc+',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-22'),
    status: '进行中',
    location: '江姐故里',
    maxParticipants: 20,
    currentParticipants: 8,
    requirements: ['热爱红色文化', '普通话标准', '有讲解经验优先'],
    benefits: ['志愿服务证书', '免费参观权限', '专业培训'],
    isFeatured: true
  },
  {
    title: '红色记忆·志愿行',
    description: '组织志愿者进行红色文化传承活动，通过多种形式宣传江姐事迹和革命精神',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5QaXhlbCBCYWNrZ3JvdW5kPC90ZXh0Pjwvc3ZnPg==',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-28'),
    status: '已结束',
    location: '江姐故里',
    maxParticipants: 30,
    currentParticipants: 25,
    requirements: ['热心公益', '服从安排'],
    benefits: ['志愿服务时长', '纪念品'],
    isFeatured: false
  },
  {
    title: '国庆特别讲解计划',
    description: '国庆期间特别策划的讲解服务活动，为来自全国各地的游客提供专业讲解',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5Gb3J0aGNvbWluZzwvdGV4dD48L3N2Zz4=',
    startDate: new Date('2024-10-01'),
    endDate: new Date('2024-10-07'),
    status: '即将开放',
    location: '江姐故里',
    maxParticipants: 50,
    currentParticipants: 0,
    requirements: ['普通话标准', '有志愿服务经验', '国庆期间有时间'],
    benefits: ['优秀志愿者证书', '免费文创产品', '志愿服务时长'],
    isFeatured: true
  }
])

// ============================================
// 4. travels 集合 - 导览信息
// ============================================
db.travels.insertMany([
  {
    title: '江姐故里园区导览',
    description: '完整的江姐故里园区游览路线，包含主要景点介绍，帮助游客全面了解江姐生平事迹和革命精神',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMzAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2VlZWIwMCIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9Ijc1IiByPSIyMCIgZmlsbD0iI2Q0MDAwMCIvPjx0ZXh0IHg9IjE1MCIgeT0iODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPk1hcCBTaW11bGF0aW9uPC90ZXh0Pjwvc3ZnPg==',
    type: '地图导览',
    location: '江姐故里',
    duration: '2-3 小时',
    difficulty: '中等',
    points: [
      { name: '江姐故居', description: '江姐出生和成长的地方，保存完好的川南民居建筑', order: 1 },
      { name: '纪念馆', description: '展示江姐生平事迹的纪念馆，收藏大量珍贵文物和历史资料', order: 2 },
      { name: '纪念碑', description: '纪念江姐的纪念碑，庄严肃穆', order: 3 }
    ],
    isFeatured: true,
    viewCount: 1580
  },
  {
    title: '全景场景 1',
    description: '江姐故里全景展示第一场景，360 度全方位展示故居全貌',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2VlZWIwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5QYW5vcmFtYSBTY2VuZSAxPC90ZXh0Pjwvc3ZnPg==',
    type: '全景展示',
    location: '江姐故里',
    duration: '5 分钟',
    difficulty: '简单',
    isFeatured: false,
    viewCount: 856
  },
  {
    title: '全景场景 2',
    description: '江姐故里全景展示第二场景，展示纪念馆内部陈列',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2VlZWIwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5QYW5vcmFtYSBTY2VuZSAyPC90ZXh0Pjwvc3ZnPg==',
    type: '全景展示',
    location: '江姐故里',
    duration: '5 分钟',
    difficulty: '简单',
    isFeatured: false,
    viewCount: 723
  },
  {
    title: '全景场景 3',
    description: '江姐故里全景展示第三场景，展示周边环境和文化广场',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2VlZWIwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5QYW5vcmFtYSBTY2VuZSAzPC90ZXh0Pjwvc3ZnPg==',
    type: '全景展示',
    location: '江姐故里',
    duration: '5 分钟',
    difficulty: '简单',
    isFeatured: false,
    viewCount: 692
  }
])

// ============================================
// 5. 创建索引（优化查询性能）
// ============================================

// products 集合索引
db.products.createIndex({ "name": 1 })
db.products.createIndex({ "category": 1 })
db.products.createIndex({ "series": 1 })
db.products.createIndex({ "isHot": 1, "rank": 1 })
db.products.createIndex({ "sales": -1 })

// volunteeractivities 集合索引
db.volunteeractivities.createIndex({ "status": 1 })
db.volunteeractivities.createIndex({ "startDate": 1 })
db.volunteeractivities.createIndex({ "endDate": 1 })
db.volunteeractivities.createIndex({ "isFeatured": 1 })

// travels 集合索引
db.travels.createIndex({ "type": 1 })
db.travels.createIndex({ "location": 1 })
db.travels.createIndex({ "isFeatured": 1 })
db.travels.createIndex({ "viewCount": -1 })

print("数据库集合创建成功！")