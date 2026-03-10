const VolunteerActivity = require('../models/VolunteerActivity');

// 获取所有活动
exports.getActivities = async (req, res) => {
  try {
    const activities = await VolunteerActivity.find().sort({ startDate: -1 });
    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取活动列表失败',
      error: error.message
    });
  }
};

// 按状态筛选活动
exports.getActivitiesByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: '请提供状态参数'
      });
    }
    
    const activities = await VolunteerActivity.find({ status }).sort({ startDate: -1 });
    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '筛选活动失败',
      error: error.message
    });
  }
};

// 参与活动报名
exports.joinActivity = async (req, res) => {
  try {
    const activity = await VolunteerActivity.findById(req.params.id);
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: '活动不存在'
      });
    }
    
    if (activity.status !== '进行中') {
      return res.status(400).json({
        success: false,
        message: '该活动当前不可报名'
      });
    }
    
    // 这里可以添加报名逻辑，如：检查是否已报名、更新报名人数等
    
    res.json({
      success: true,
      message: '报名成功',
      data: activity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '报名失败',
      error: error.message
    });
  }
};

// 搜索活动
exports.searchActivities = async (req, res) => {
  try {
    const { keyword } = req.query;
    
    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: '请提供搜索关键词'
      });
    }
    
    const activities = await VolunteerActivity.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ]
    }).sort({ startDate: -1 });
    
    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '搜索活动失败',
      error: error.message
    });
  }
};