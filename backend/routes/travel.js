const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');

// 获取所有导览内容
router.get('/guides', travelController.getGuides);

// 获取全景展示
router.get('/panoramas', travelController.getPanoramas);

// 获取路线规划
router.get('/routes', travelController.getRoutes);

// 搜索导览内容
router.get('/search', travelController.searchGuides);

module.exports = router;