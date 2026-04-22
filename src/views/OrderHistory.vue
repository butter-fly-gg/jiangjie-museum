<template>
  <div class="order-history-page">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="back-btn" @click="$router.push('/mine')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
          <path d="M15 19l-7-7 7-7"/>
        </svg>
      </div>
      <div class="title">历史订单</div>
      <div class="placeholder"></div>
    </div>

    <!-- 订单列表 -->
    <div class="order-list">
      <div v-if="orders.length === 0" class="empty-state">
        <p>暂无订单</p>
      </div>

      <div v-for="order in orders" :key="order.id" class="order-card">
        <!-- 订单头部 -->
        <div class="order-header">
          <span class="order-no">订单号: {{ order.orderNo }}</span>
          <span class="order-status" :class="order.status">{{ getStatusText(order.status) }}</span>
        </div>

        <!-- 订单内容 -->
        <div class="order-content">
          <div class="product-brief" v-if="getOrderGoods(order)">
            <img v-if="getOrderGoods(order).cover" :src="getOrderGoods(order).cover" :alt="getOrderGoods(order).name" class="product-cover" />
            <div class="product-meta">
              <div class="product-name">{{ getOrderGoods(order).name }}</div>
              <div class="product-price">
                ¥{{ getOrderGoods(order).price || order.totalPrice }} x {{ getOrderGoods(order).quantity || 1 }}
              </div>
            </div>
          </div>

          <div class="order-info">
            <div class="info-item">
              <span class="label">下单时间:</span>
              <span class="value">{{ formatTime(order.createTime) }}</span>
            </div>
            <div class="info-item">
              <span class="label">收货人:</span>
              <span class="value">{{ order.receiverName }}</span>
            </div>
            <div class="info-item">
              <span class="label">联系电话:</span>
              <span class="value">{{ order.receiverPhone }}</span>
            </div>
            <div class="info-item">
              <span class="label">收货地址:</span>
              <span class="value">{{ getAddressText(order.receiverAddress) }}</span>
            </div>
          </div>
          
          <div class="order-total">
            <span class="label">订单总价:</span>
            <span class="price">¥{{ order.totalPrice }}</span>
          </div>
        </div>

        <!-- 订单操作 -->
        <div class="order-actions">
          <button
            v-if="order.status === 'pending'"
            class="btn settle-btn"
            @click="openSettleDialog(order)"
          >
            结算
          </button>
          <button 
            v-if="order.status === 'pending'" 
            class="btn cancel-btn" 
            @click="cancelOrder(order.id)"
          >
            取消订单
          </button>
          <button class="btn delete-btn" @click="deleteOrder(order.id)">
            删除
          </button>
        </div>
      </div>
    </div>

    <div v-if="showSettleDialog" class="settle-mask" @click.self="closeSettleDialog">
      <div class="settle-card">
        <div class="settle-title">订单结算</div>
        <input v-model.trim="settleForm.receiverName" class="settle-input" placeholder="收货人" />
        <input v-model.trim="settleForm.receiverPhone" class="settle-input" placeholder="联系电话" />
        <input v-model.trim="settleForm.receiverAddress" class="settle-input" placeholder="收货地址" />
        <div class="settle-actions">
          <button class="btn cancel-btn" @click="closeSettleDialog">取消</button>
          <button class="btn settle-btn" @click="goToPayStep">下一步</button>
        </div>
      </div>
    </div>

    <div v-if="showPayDialog" class="settle-mask" @click.self="closePayDialog">
      <div class="settle-card">
        <div class="settle-title">选择支付方式</div>
        <div class="pay-options">
          <button
            class="pay-option"
            :class="{ active: payMethod === 'wechat' }"
            @click="payMethod = 'wechat'"
          >
            微信支付
          </button>
          <button
            class="pay-option"
            :class="{ active: payMethod === 'alipay' }"
            @click="payMethod = 'alipay'"
          >
            支付宝支付
          </button>
        </div>
        <div class="settle-actions">
          <button class="btn cancel-btn" @click="closePayDialog">取消</button>
          <button class="btn settle-btn" @click="submitSettle">确认并支付</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { orderAPI } from '@/api';

const router = useRouter();
const orders = ref([]);
const showSettleDialog = ref(false);
const showPayDialog = ref(false);
const currentOrder = ref(null);
const payMethod = ref('wechat');
const settleForm = ref({
  receiverName: '',
  receiverPhone: '',
  receiverAddress: ''
});

// 加载订单列表
onMounted(async () => {
  const userInfo = localStorage.getItem('userInfo');
  if (!userInfo) {
    router.push('/login');
    return;
  }

  const user = JSON.parse(userInfo);
  
  try {
    const response = await orderAPI.getOrderList(user.id);
    if (response.code === 200) {
      orders.value = response.data || [];
    }
  } catch (error) {
    console.error('加载订单失败:', error);
  }
});

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    'pending': '待付款',
    'paid': '已付款',
    'shipped': '已发货',
    'completed': '已完成',
    'cancelled': '已取消'
  };
  return statusMap[status] || status;
};

// 格式化时间
const formatTime = (timeStr) => {
  if (!timeStr) return '';
  const date = new Date(timeStr);
  return date.toLocaleString('zh-CN');
};

const parseGoodsMeta = (receiverAddress) => {
  if (!receiverAddress || !receiverAddress.startsWith('GOODS|')) return null;
  const parts = receiverAddress.split('|');
  if (parts.length < 5) return null;
  return {
    name: parts[1] || '',
    cover: parts[2] || '',
    price: parts[3] || '',
    quantity: Number(parts[4]) || 1
  };
};

const getOrderGoods = (order) => parseGoodsMeta(order.receiverAddress);

const getAddressText = (receiverAddress) => {
  if (!receiverAddress) return '-';
  if (receiverAddress.startsWith('GOODS|')) return '商城商品下单';
  return receiverAddress;
};

const openSettleDialog = (order) => {
  currentOrder.value = order;
  settleForm.value.receiverName = order.receiverName && order.receiverName !== '商城下单' ? order.receiverName : '';
  settleForm.value.receiverPhone = order.receiverPhone || '';
  settleForm.value.receiverAddress = order.receiverAddress && !order.receiverAddress.startsWith('GOODS|') ? order.receiverAddress : '';
  showSettleDialog.value = true;
};

const closeSettleDialog = () => {
  showSettleDialog.value = false;
};

const closePayDialog = () => {
  showPayDialog.value = false;
};

const resetSettleState = () => {
  showSettleDialog.value = false;
  showPayDialog.value = false;
  currentOrder.value = null;
  payMethod.value = 'wechat';
};

const goToPayStep = () => {
  if (!settleForm.value.receiverName || !settleForm.value.receiverPhone || !settleForm.value.receiverAddress) {
    alert('请填写完整收货信息');
    return;
  }
  showSettleDialog.value = false;
  showPayDialog.value = true;
};

const reloadOrders = async () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const res = await orderAPI.getOrderList(user.id);
  if (res.code === 200) {
    orders.value = res.data || [];
  }
};

const submitSettle = async () => {
  if (!currentOrder.value) return;
  const user = JSON.parse(localStorage.getItem('userInfo'));
  try {
    const response = await orderAPI.settleOrder(currentOrder.value.id, user.id, {
      receiverName: settleForm.value.receiverName,
      receiverPhone: settleForm.value.receiverPhone,
      receiverAddress: settleForm.value.receiverAddress
    });
    if (response.code === 200) {
      triggerPaymentJump();
      resetSettleState();
      await reloadOrders();
    } else {
      alert(response.message || '结算失败');
    }
  } catch (error) {
    console.error('结算失败:', error);
    alert('网络错误，请稍后重试');
  }
};

const triggerPaymentJump = () => {
  // Web 页面无法保证 100% 拉起支付 App，以下为常见 deep link 方式
  if (payMethod.value === 'wechat') {
    window.location.href = 'weixin://';
    setTimeout(() => {
      window.location.href = 'https://weixin.qq.com/';
    }, 1200);
    return;
  }
  window.location.href = 'alipays://';
  setTimeout(() => {
    window.location.href = 'https://www.alipay.com/';
  }, 1200);
};

// 取消订单
const cancelOrder = async (orderId) => {
  if (!confirm('确定要取消该订单吗？')) return;

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  try {
    const response = await orderAPI.cancelOrder(orderId, userInfo.id);
    if (response.code === 200) {
      alert('订单已取消');
      await reloadOrders();
    } else {
      alert(response.message || '取消失败');
    }
  } catch (error) {
    console.error('取消订单失败:', error);
    alert('网络错误，请稍后重试');
  }
};

const deleteOrder = async (orderId) => {
  if (!confirm('确定删除该订单吗？')) return;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  try {
    const response = await orderAPI.deleteOrder(orderId, userInfo.id);
    if (response.code === 200) {
      orders.value = orders.value.filter(order => order.id !== orderId);
      alert('订单已删除');
    } else {
      alert(response.message || '删除失败');
    }
  } catch (error) {
    console.error('删除订单失败:', error);
    alert('网络错误，请稍后重试');
  }
};

</script>

<style scoped>
.order-history-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.back-btn {
  cursor: pointer;
  padding: 8px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.placeholder {
  width: 40px;
}

.order-list {
  padding: 16px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}

.order-card {
  background: white;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f9f9f9;
  border-bottom: 1px solid #eee;
}

.order-no {
  font-size: 13px;
  color: #666;
}

.order-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.order-status.pending {
  background: #fff3cd;
  color: #856404;
}

.order-status.paid {
  background: #d1ecf1;
  color: #0c5460;
}

.order-status.shipped {
  background: #d4edda;
  color: #155724;
}

.order-status.completed {
  background: #d4edda;
  color: #155724;
}

.order-status.cancelled {
  background: #f8d7da;
  color: #721c24;
}

.order-content {
  padding: 16px;
}

.order-info {
  margin-bottom: 16px;
}

.product-brief {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
  padding: 10px;
  border-radius: 8px;
  background: #fafafa;
}

.product-cover {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.product-meta {
  min-width: 0;
  flex: 1;
}

.product-name {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  margin-bottom: 6px;
}

.product-price {
  font-size: 13px;
  color: #c43e3a;
}

.info-item {
  display: flex;
  margin-bottom: 8px;
  font-size: 14px;
}

.info-item .label {
  color: #666;
  width: 90px;
  flex-shrink: 0;
}

.info-item .value {
  color: #333;
  flex: 1;
}

.order-total {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.order-total .label {
  font-size: 14px;
  color: #666;
  margin-right: 8px;
}

.order-total .price {
  font-size: 20px;
  color: #e74c3c;
  font-weight: bold;
}

.order-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 12px 16px;
  border-top: 1px solid #eee;
}

.btn {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-btn {
  background: #f5f5f5;
  color: #666;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.detail-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.detail-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.settle-btn {
  background: linear-gradient(135deg, #4f7cff 0%, #5b6ee1 100%);
  color: #fff;
}

.delete-btn {
  background: #fff1f1;
  color: #b42318;
  border: 1px solid #ffd6d6;
}

.settle-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  padding: 16px;
}

.settle-card {
  width: 100%;
  max-width: 360px;
  background: #fff;
  border-radius: 10px;
  padding: 16px;
}

.settle-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.settle-input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

.settle-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.pay-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 14px;
}

.pay-option {
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  padding: 10px 8px;
  font-size: 14px;
  color: #333;
}

.pay-option.active {
  border-color: #4f7cff;
  color: #2f54eb;
  background: #eef3ff;
  font-weight: 600;
}
</style>
