const mongoose = require('mongoose');

const volunteerActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['进行中', '已结束', '即将开放'],
    default: '即将开放'
  },
  location: {
    type: String,
    default: '江姐故里'
  },
  maxParticipants: {
    type: Number,
    default: 50
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  requirements: [{
    type: String
  }],
  benefits: [{
    type: String
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 更新时间戳
volunteerActivitySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// 虚拟属性：计算剩余时间
volunteerActivitySchema.virtual('timeLeft').get(function() {
  const now = new Date();
  if (this.status === '进行中' && this.endDate > now) {
    const diff = this.endDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}天 ${hours}:${minutes.toString().padStart(2, '0')}后结束`;
  }
  return this.status === '已结束' ? '活动已结束' : `${this.startDate.getFullYear()}-${(this.startDate.getMonth() + 1).toString().padStart(2, '0')}-${this.startDate.getDate().toString().padStart(2, '0')} 开始`;
});

module.exports = mongoose.model('VolunteerActivity', volunteerActivitySchema);