<template>
  <div class="appointment-container">
    <!-- 页面基础内容（被遮挡的部分） -->
    <div class="page-content">
      <h2>课程预约</h2>
      <div class="form-item">
        <label for="name">姓名</label>
        <input v-model="formData.name" type="text" id="name" placeholder="请输入您的姓名" />
      </div>
      <div class="form-item">
        <label for="phone">手机号码</label>
        <input v-model="formData.phone" type="tel" id="phone" placeholder="请输入您的手机号" />
      </div>
      <div class="form-item">
        <label for="course">预约课程</label>
        <input v-model="formData.course" type="text" id="course" placeholder="请输入想要预约的课程" />
      </div>
      <button @click="handleAppointment" id="appointmentBtn">立即预约</button>
    </div>

    <!-- 预约成功弹窗（通过 v-show 控制显示/隐藏） -->
    <div v-show="showSuccessModal" class="success-modal">
      <div class="success-icon">✓</div>
      <h3>预约成功</h3>
      <p>我们会尽快与您取得联系，感谢您的预约！</p>
      <button @click="showSuccessModal = false" class="close-btn">关闭</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 定义表单数据和弹窗显示状态
const formData = ref({
  name: '',
  phone: '',
  course: ''
});
const showSuccessModal = ref(false); // 控制预约成功弹窗的显示/隐藏

// 点击立即预约的处理函数
const handleAppointment = () => {
  // 表单基础验证
  if (!formData.value.name.trim()) {
    alert('请输入您的姓名！');
    return;
  }
  if (!/^1[3-9]\d{9}$/.test(formData.value.phone.trim())) {
    alert('请输入正确的手机号码！');
    return;
  }

  // 验证通过，显示预约成功弹窗
  showSuccessModal.value = true;
  
  // 可选：这里可以添加接口请求逻辑，比如提交预约信息到后端
  // fetch('/api/appointment', {
  //   method: 'POST',
  //   body: JSON.stringify(formData.value)
  // }).then(res => res.json()).then(data => {
  //   if (data.code === 200) {
  //     showSuccessModal.value = true;
  //   }
  // });
};
</script>

<style scoped>
/* 全局样式重置（scoped 下对当前组件生效） */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "微软雅黑", sans-serif;
}

.appointment-container {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative; /* 为弹窗绝对定位提供参考 */
  min-height: 500px;
}

/* 表单内容样式 */
.page-content h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.page-content .form-item {
  margin-bottom: 20px;
}

.page-content .form-item label {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-size: 16px;
}

.page-content .form-item input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

/* 立即预约按钮 */
#appointmentBtn {
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

#appointmentBtn:hover {
  background-color: #0056b3;
}

/* 预约成功弹窗 */
.success-modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  z-index: 10; /* 确保弹窗在最上层 */
}

.success-modal .success-icon {
  font-size: 60px;
  color: #28a745;
  margin-bottom: 20px;
}

.success-modal h3 {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.success-modal p {
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
}

.success-modal .close-btn {
  padding: 10px 30px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.success-modal .close-btn:hover {
  background-color: #5a6268;
}
</style>