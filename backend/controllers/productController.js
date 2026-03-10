const Product = require('../models/Product');

// 获取热门商品
exports.getHotProducts = async (req, res) => {
  try {
    const hotProducts = await Product.find({ isHot: true })
      .sort({ rank: 1, sales: -1 })
      .limit(10);
    
    res.json({
      success: true,
      data: hotProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取热门商品失败',
      error: error.message
    });
  }
};

// 获取系列商品
exports.getSeriesProducts = async (req, res) => {
  try {
    const { series } = req.query;
    const products = await Product.find({ series: series || '江姐故里系列' })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取系列商品失败',
      error: error.message
    });
  }
};

// 获取商品详情
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: '商品不存在'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取商品详情失败',
      error: error.message
    });
  }
};

// 搜索商品
exports.searchProducts = async (req, res) => {
  try {
    const { keyword } = req.query;
    
    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: '请提供搜索关键词'
      });
    }
    
    const products = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ]
    }).sort({ sales: -1 });
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '搜索商品失败',
      error: error.message
    });
  }
};