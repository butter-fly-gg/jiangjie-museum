const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 连接MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB连接成功'))
.catch(err => console.error('MongoDB连接失败:', err));

// 路由
app.use('/api/travel', require('./routes/travel'));
app.use('/api/shop', require('./routes/shop'));
app.use('/api/volunteer', require('./routes/volunteer'));

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: '江姐故里博物馆后端服务运行正常' });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: '服务器内部错误',
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});