const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['文创产品', '纪念品', '食品', '酒类', '其他']
  },
  series: {
    type: String,
    default: '江姐故里系列'
  },
  image: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  sales: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  flavors: [{
    name: String,
    description: String
  }],
  isHot: {
    type: Boolean,
    default: false
  },
  rank: {
    type: Number,
    default: 0
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
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema);