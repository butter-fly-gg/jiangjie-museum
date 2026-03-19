const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');

// 获取所有活动
router.get('/activities', volunteerController.getActivities);

// 按状态筛选活动
router.get('/activities/status/:status', volunteerController.getActivitiesByStatus);

// 参与活动报名
router.post('/join/:id', volunteerController.joinActivity);

// 搜索活动
router.get('/search', volunteerController.searchActivities);

// 参与活动
router.post('/activities/:id/join', async (req, res) => {
  try {
    const activity = await VolunteerActivity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: '活动未找到'
      });
    }
    
    if (activity.status !== '进行中') {
      return res.status(400).json({
        success: false,
        message: '该活动当前不可参与'
      });
    }
    
    if (activity.currentParticipants >= activity.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: '活动参与人数已满'
      });
    }
    
    activity.currentParticipants += 1;
    await activity.save();
    
    res.json({
      success: true,
      message: '参与成功',
      data: {
        currentParticipants: activity.currentParticipants,
        remainingSpots: activity.maxParticipants - activity.currentParticipants
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '参与活动失败',
      error: error.message
    });
  }
});

// 搜索活动
router.get('/search', async (req, res) => {
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
        { description: { $regex: keyword, $options: 'i' } },
        { location: { $regex: keyword, $options: 'i' } }
      ]
    }).sort({ startDate: 1 });
    
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
});

module.exports = router;