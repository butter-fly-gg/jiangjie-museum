// API 配置
const API_BASE_URL = 'http://localhost:8080/api';


// 通用请求函数
const request = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API请求失败:', error);
    throw error;
  }
};

// 游历板块API
export const travelAPI = {
  // 获取所有导览内容
  getGuides: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return request(`/travel/guides${queryParams ? `?${queryParams}` : ''}`);
  },

  // 获取导览详情
  getGuideById: (id) => {
    return request(`/travel/guides/${id}`);
  },

  // 获取全景展示
  getPanoramas: () => {
    return request('/travel/panoramas');
  },

  // 获取路线规划
  getRoutes: () => {
    return request('/travel/routes');
  },

  // 搜索导览内容
  searchGuides: (keyword) => {
    return request(`/travel/search?keyword=${encodeURIComponent(keyword)}`);
  }
};

// 商城板块API
export const shopAPI = {
  // 获取热门商品
  getHotProducts: () => {
    return request('/shop/hot');
  },

  // 获取系列商品
  getSeriesProducts: (series = '江姐故里系列') => {
    return request(`/shop/series?series=${encodeURIComponent(series)}`);
  },

  // 获取商品列表（分页）
  getProducts: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return request(`/shop/products${queryParams ? `?${queryParams}` : ''}`);
  },

  // 获取商品详情
  getProductById: (id) => {
    return request(`/shop/products/${id}`);
  },

  // 按分类获取商品
  getProductsByCategory: (category) => {
    return request(`/shop/categories/${encodeURIComponent(category)}`);
  },

  // 搜索商品
  searchProducts: (keyword) => {
    return request(`/shop/search?keyword=${encodeURIComponent(keyword)}`);
  }
};

// 志愿者板块API
export const volunteerAPI = {
  // 获取所有志愿活动
  getActivities: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return request(`/volunteer/activities${queryParams ? `?${queryParams}` : ''}`);
  },

  // 获取活动详情
  getActivityById: (id) => {
    return request(`/volunteer/activities/${id}`);
  },

  // 按状态筛选活动
  getActivitiesByStatus: (status) => {
    return request(`/volunteer/activities/status/${encodeURIComponent(status)}`);
  },

  // 获取推荐活动
  getFeaturedActivities: () => {
    return request('/volunteer/featured');
  },

  // 参与活动
  joinActivity: (id) => {
    return request(`/volunteer/activities/${id}/join`, {
      method: 'POST',
    });
  },

  // 搜索活动
  searchActivities: (keyword) => {
    return request(`/volunteer/search?keyword=${encodeURIComponent(keyword)}`);
  }
};

// 购物车 API
export const cartAPI = {
  // 添加到购物车
  addToCart: (data) => {
    return request('/cart/add', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 获取购物车列表
  getCartList: (userId) => {
    return request(`/cart/list/${userId}`);
  },

  // 更新购物车数量
  updateQuantity: (data) => {
    return request('/cart/update', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // 删除购物车商品
  deleteItem: (cartId) => {
    return request(`/cart/delete/${cartId}`, {
      method: 'DELETE',
    });
  },

  // 清空购物车
  clearCart: (userId) => {
    return request(`/cart/clear/${userId}`, {
      method: 'DELETE',
    });
  }
};

// 订单 API
export const orderAPI = {
  // 创建订单
  createOrder: (data) => {
    return request('/order/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 直接创建单商品订单（用于商品页快速下单）
  createDirectOrder: (data) => {
    return request('/order/create-direct', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 获取订单列表
  getOrderList: (userId) => {
    return request(`/order/list/${userId}`);
  },

  // 获取订单详情
  getOrderDetail: (orderId, userId) => {
    return request(`/order/detail/${orderId}?userId=${userId}`);
  },

  // 取消订单
  cancelOrder: (orderId, userId) => {
    return request(`/order/cancel/${orderId}?userId=${userId}`, {
      method: 'PUT',
    });
  },

  // 结算订单并填写收货信息
  settleOrder: (orderId, userId, data) => {
    return request(`/order/settle/${orderId}?userId=${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // 删除订单
  deleteOrder: (orderId, userId) => {
    return request(`/order/delete/${orderId}?userId=${userId}`, {
      method: 'DELETE',
    });
  }
};

// 用户认证 API
export const authAPI = {
  // 用户注册
  register: (data) => {
    return request('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 用户登录
  login: (data) => {
    return request('/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 获取用户信息
  getUserInfo: (userId) => {
    return request(`/user/${userId}`);
  },

  // 更新用户信息
  updateUserInfo: (userId, data) => {
    return request(`/user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // 上传头像文件
  uploadAvatar: async (userId, file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/user/${userId}/avatar`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
};

// 健康检查
export const healthCheck = () => {
  return request('/hello');
};



export const reservationAPI = {
  // 新增预约
  addReservation: (data) => {
    return request('/reservation/add', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 获取预约列表
  getReservationList: (userId) => {
    return request(`/reservation/list/${userId}`);
  },

  // 获取预约详情（参数名改为 reservationId）
  getReservationDetail: (reservationId) => {
    return request(`/reservation/detail/${reservationId}`);
  },

  // 取消预约
  cancelReservation: (reservationId) => {
    return request(`/reservation/cancel/${reservationId}`, {
      method: 'PUT',
    });
  }
};

// 默认导出所有 API
export default {
  auth: authAPI,
  cart: cartAPI,
  order: orderAPI,
  travel: travelAPI,
  shop: shopAPI,
  volunteer: volunteerAPI,
  health: healthCheck,
  reservation: reservationAPI
};