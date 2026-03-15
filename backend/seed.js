const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');
const VolunteerActivity = require('./models/VolunteerActivity');
const Travel = require('./models/Travel');

// 连接数据库
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB连接成功'))
.catch(err => console.error('MongoDB连接失败:', err));

// 示例数据
const seedData = async () => {
  try {
    // 清空现有数据
    await Product.deleteMany({});
    await VolunteerActivity.deleteMany({});
    await Travel.deleteMany({});
    
    // 插入商品数据
    const products = [
      {
        name: '《永远的江姐》青少年AR研学绘本',
        description: 'AR ILLUSTRATION TEENAGERS’ ARTBOOK - 结合AR技术的互动式学习绘本',
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
        description: 'SNOWY STAMP - 纪念版公交印章，限量发行',
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
        description: 'SUPERNOVA WINE - 江姐故居传承高粱酒，采用传统工艺酿造',
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
        description: '国庆特别版非遗漆扇，手工制作',
        price: 29,
        category: '文创产品',
        series: '江姐故里系列',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5KZW50cm9sIEFydCwgVGhlIEVwbGFuY2Ugb2YgR2lyIGluIFRoZSBQb2ludGluZyBwcmltYSBpcyBsaWtlIGluIGFuIGJldHRlciBjb2xvci48L3RleHQ+PC9zdmc+',
        stock: 80,
        sales: 42,
        rating: 4.6
      },
      {
        name: '【经络疏通养生锤】',
        description: '传统工艺制作的养生锤，用于经络疏通',
        price: 30,
        category: '文创产品',
        series: '江姐故里系列',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5KZW50cm9sIEFydCwgVGhlIEVwbGFuY2Ugb2YgR2lyIGluIFRoZSBQb2ludGluZyBwcmltYSBpcyBsaWtlIGluIGFuIGJldHRlciBjb2xvci48L3RleHQ+PC9zdmc+',
        stock: 60,
        sales: 28,
        rating: 4.3
      }
    ];

    await Product.insertMany(products);
    console.log('商品数据插入成功');

    // 插入志愿活动数据
    const activities = [
      {
        title: '那时春里——公益讲解',
        description: '为游客提供专业的江姐故里历史讲解服务',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5QaG90byBTYW1wbGU8L3RleHQ+PC9zdmc+',
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-03-22'),
        status: '进行中',
        maxParticipants: 20,
        currentParticipants: 8,
        requirements: ['热爱红色文化', '普通话标准', '有讲解经验优先'],
        benefits: ['志愿服务证书', '免费参观权限', '专业培训'],
        isFeatured: true
      },
      {
        title: '红色记忆·志愿行',
        description: '组织志愿者进行红色文化传承活动',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5QaXhlbCBCYWNrZ3JvdW5kPC90ZXh0Pjwvc3ZnPg==',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-02-28'),
        status: '已结束',
        maxParticipants: 30,
        currentParticipants: 25
      },
      {
        title: '国庆特别讲解计划',
        description: '国庆期间特别策划的讲解服务活动',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2Q0Yjg5MyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5Gb3J0aGNvbWluZzwvdGV4dD48L3N2Zz4=',
        startDate: new Date('2024-10-01'),
        endDate: new Date('2024-10-07'),
        status: '即将开放',
        maxParticipants: 50,
        currentParticipants: 0,
        isFeatured: true
      }
    ];

    await VolunteerActivity.insertMany(activities);
    console.log('志愿活动数据插入成功');

    // 插入导览数据
    const travels = [
      {
        title: '江姐故里园区导览',
        description: '完整的江姐故里园区游览路线，包含主要景点介绍',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMzAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2VlZWIwMCIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9Ijc1IiByPSIyMCIgZmlsbD0iI2Q0MDAwMCIvPjx0ZXh0IHg9IjE1MCIgeT0iODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPk1hcCBTaW11bGF0aW9uPC90ZXh0Pjwvc3ZnPg==',
        type: '地图导览',
        location: '江姐故里',
        duration: '2-3小时',
        difficulty: '中等',
        points: [
          { name: '江姐故居', description: '江姐出生和成长的地方', order: 1 },
          { name: '纪念馆', description: '展示江姐生平事迹的纪念馆', order: 2 },
          { name: '纪念碑', description: '纪念江姐的纪念碑', order: 3 }
        ],
        isFeatured: true
      },
      {
        title: '全景场景 1',
        description: '江姐故里全景展示第一场景',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2VlZWIwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5QYW5vcmFtYSBTY2VuZSAxPC90ZXh0Pjwvc3ZnPg==',
        type: '全景展示',
        location: '江姐故里'
      },
      {
        title: '全景场景 2',
        description: '江姐故里全景展示第二场景',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2VlZWIwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5QYW5vcmFtYSBTY2VuZSAyPC90ZXh0Pjwvc3ZnPg==',
        type: '全景展示',
        location: '江姐故里'
      },
      {
        title: '全景场景 3',
        description: '江姐故里全景展示第三场景',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2VlZWIwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5QYW5vcmFtYSBTY2VuZSAzPC90ZXh0Pjwvc3ZnPg==',
        type: '全景展示',
        location: '江姐故里'
      }
    ];

    await Travel.insertMany(travels);
    console.log('导览数据插入成功');

    console.log('所有示例数据插入完成！');
    process.exit(0);
  } catch (error) {
    console.error('数据插入失败:', error);
    process.exit(1);
  }
};

seedData();