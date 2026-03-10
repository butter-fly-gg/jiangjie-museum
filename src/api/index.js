// API 配置
const API_BASE_URL = 'http://localhost:3000/api';

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

// 健康检查
export const healthCheck = () => {
  return request('/health');
};

// 默认导出所有API
export default {
  travel: travelAPI,
  shop: shopAPI,
  volunteer: volunteerAPI,
  health: healthCheck
};