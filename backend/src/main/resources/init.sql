-- 统一字符集，防止乱码
SET NAMES utf8mb4;

-- 使用我们的项目数据库
USE jiangjie_museum;

-- 用户表（登录、注册用）
CREATE TABLE IF NOT EXISTS `user` (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户ID',
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '账号/手机号',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    nickname VARCHAR(50) DEFAULT '' COMMENT '昵称',
    avatar VARCHAR(255) DEFAULT '' COMMENT '头像URL',
    role VARCHAR(20) DEFAULT 'user' COMMENT '角色 user/admin',
    phone VARCHAR(20) DEFAULT '' COMMENT '手机号',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 文创商品表
CREATE TABLE IF NOT EXISTS `product` (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '商品ID',
    name VARCHAR(100) NOT NULL COMMENT '商品名称',
    cover VARCHAR(255) COMMENT '商品封面图',
    price DECIMAL(10,2) NOT NULL COMMENT '售价',
    original_price DECIMAL(10,2) DEFAULT 0 COMMENT '原价',
    stock INT DEFAULT 0 COMMENT '库存数量',
    sales INT DEFAULT 0 COMMENT '销量',
    description TEXT COMMENT '商品描述',
    category VARCHAR(50) COMMENT '分类：如AR读本、印章、酒类、非遗手作',
    tags VARCHAR(255) COMMENT '标签：限时折扣/爆款推荐',
    sort INT DEFAULT 0 COMMENT '排序',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 商品多图表
CREATE TABLE IF NOT EXISTS `product_image` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL COMMENT '关联商品ID',
    url VARCHAR(255) NOT NULL COMMENT '图片URL',
    sort INT DEFAULT 0 COMMENT '排序',
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 订单/购物
-- 购物车表
CREATE TABLE IF NOT EXISTS `cart` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1 COMMENT '购买数量',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- 订单表
CREATE TABLE IF NOT EXISTS `order` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_no VARCHAR(50) NOT NULL UNIQUE COMMENT '订单号',
    total_price DECIMAL(10,2) NOT NULL COMMENT '订单总价',
    status VARCHAR(20) DEFAULT 'pending' COMMENT '状态：待付款/已付款/已发货/已完成/已取消',
    receiver_name VARCHAR(50) COMMENT '收货人',
    receiver_phone VARCHAR(20) COMMENT '收货人电话',
    receiver_address VARCHAR(200) COMMENT '收货地址',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 展览 / 活动表
CREATE TABLE IF NOT EXISTS `exhibition` (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '展览ID',
    title VARCHAR(100) NOT NULL COMMENT '展览名称',
    cover VARCHAR(255) COMMENT '海报/封面',
    start_time DATE COMMENT '开始时间',
    end_time DATE COMMENT '结束时间',
    location VARCHAR(100) COMMENT '展览地点',
    description TEXT COMMENT '展览介绍',
    qrcode_url VARCHAR(255) COMMENT '展览二维码图片',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 评论 / 留言表
CREATE TABLE IF NOT EXISTS `comment` (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '评论ID',
    user_id INT NOT NULL COMMENT '评论人ID',
    type VARCHAR(20) NOT NULL COMMENT '类型：exhibit / exhibition',
    target_id INT NOT NULL COMMENT '关联展品/展览ID',
    content TEXT NOT NULL COMMENT '评论内容',
    star INT DEFAULT 5 COMMENT '评分',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 场馆 / 可预约场所表
CREATE TABLE IF NOT EXISTS `venue` (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '场馆ID',
    name VARCHAR(100) NOT NULL COMMENT '场馆名称',
    cover VARCHAR(255) COMMENT '封面图',
    description TEXT COMMENT '场馆介绍',
    address VARCHAR(200) COMMENT '详细地址',
    open_time VARCHAR(100) COMMENT '开放时间说明',
    max_capacity INT DEFAULT 0 COMMENT '单日最大接待量',
    price DECIMAL(10,2) DEFAULT 0 COMMENT '门票价格',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 预约 / 订单表
CREATE TABLE IF NOT EXISTS `reservation` (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '预约ID',
    user_id INT NOT NULL COMMENT '预约用户ID',
    venue_id INT NOT NULL COMMENT '预约场馆ID',
    phone VARCHAR(20) NOT NULL COMMENT '预约手机号',
    visit_date DATE NOT NULL COMMENT '预约日期',
    visit_time VARCHAR(20) NOT NULL COMMENT '预约时间段（如10:00）',
    people_count INT DEFAULT 1 COMMENT '同行人数',
    status VARCHAR(20) DEFAULT 'pending' COMMENT '状态：pending已预约/checked_in已核销/cancelled已取消',
    verify_code VARCHAR(50) COMMENT '核销码',
    qrcode_url VARCHAR(255) COMMENT '预约二维码图片',
    total_price DECIMAL(10,2) DEFAULT 0 COMMENT '订单总价',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (venue_id) REFERENCES venue(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;