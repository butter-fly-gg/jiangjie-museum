const Travel = require('../models/Travel');

// 获取所有导览内容
exports.getGuides = async (req, res) => {
  try {
    const { type, featured } = req.query;
    let query = {};
    
    if (type) {
      query.type = type;
    }
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    const guides = await Travel.find(query).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: guides
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取导览内容失败',
      error: error.message
    });
  }
};

// 获取全景展示
exports.getPanoramas = async (req, res) => {
  try {
    const panoramas = await Travel.find({ type: '全景展示' }).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: panoramas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取全景展示失败',
      error: error.message
    });
  }
};

// 获取路线规划
exports.getRoutes = async (req, res) => {
  try {
    const routes = await Travel.find({ type: '路线规划' }).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: routes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取路线规划失败',
      error: error.message
    });
  }
};

// 搜索导览
exports.searchGuides = async (req, res) => {
  try {
    const { keyword } = req.query;
    
    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: '请提供搜索关键词'
      });
    }
    
    const guides = await Travel.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { location: { $regex: keyword, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: guides
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '搜索失败',
      error: error.message
    });
  }
};