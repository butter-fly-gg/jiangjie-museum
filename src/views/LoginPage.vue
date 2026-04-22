<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Logo 和标题 -->
      <div class="login-header">
        <img src="../imgs/欢迎.png" alt="Logo" class="logo" />
        <h1 class="title">红梅故里—江姐博物馆</h1>
        <p class="subtitle">红色传承 · 精神永存</p>
      </div>

      <!-- 登录/注册切换 -->
      <div class="tab-switch">
        <button 
          :class="['tab-btn', { active: isLogin }]" 
          @click="isLogin = true"
        >
          登录
        </button>
        <button 
          :class="['tab-btn', { active: !isLogin }]" 
          @click="isLogin = false"
        >
          注册
        </button>
      </div>

      <!-- 登录表单 -->
      <form v-if="isLogin" @submit.prevent="handleLogin" class="form">
        <div class="form-group">
          <label>用户名</label>
          <input 
            v-model="loginForm.username" 
            type="text" 
            placeholder="请输入用户名/手机号"
            required
          />
        </div>
        <div class="form-group">
          <label>密码</label>
          <input 
            v-model="loginForm.password" 
            type="password" 
            placeholder="请输入密码"
            required
          />
        </div>
        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <!-- 注册表单 -->
      <form v-else @submit.prevent="handleRegister" class="form">
        <div class="form-group">
          <label>用户名</label>
          <input 
            v-model="registerForm.username" 
            type="text" 
            placeholder="请输入用户名"
            required
          />
        </div>
        <div class="form-group">
          <label>密码</label>
          <input 
            v-model="registerForm.password" 
            type="password" 
            placeholder="请输入密码"
            required
          />
        </div>
        <div class="form-group">
          <label>确认密码</label>
          <input 
            v-model="registerForm.confirmPassword" 
            type="password" 
            placeholder="请再次输入密码"
            required
          />
        </div>
        <div class="form-group">
          <label>昵称（可选）</label>
          <input 
            v-model="registerForm.nickname" 
            type="text" 
            placeholder="请输入昵称"
          />
        </div>
        <div class="form-group">
          <label>手机号（可选）</label>
          <input 
            v-model="registerForm.phone" 
            type="tel" 
            placeholder="请输入手机号"
          />
        </div>
        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? '注册中...' : '注册' }}
        </button>
      </form>

      <!-- 提示信息 -->
      <div v-if="message" :class="['message', messageType]">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { authAPI } from '@/api';

export default {
  name: 'LoginPage',
  data() {
    return {
      isLogin: true,
      loading: false,
      message: '',
      messageType: 'success',
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        phone: ''
      }
    };
  },
  methods: {
    showMessage(msg, type = 'success') {
      this.message = msg;
      this.messageType = type;
      setTimeout(() => {
        this.message = '';
      }, 3000);
    },

    async handleLogin() {
      this.loading = true;
      try {
        const response = await authAPI.login(this.loginForm);
        
        if (response.code === 200) {
          this.showMessage('登录成功！', 'success');
          // 保存用户信息到 localStorage
          localStorage.setItem('userInfo', JSON.stringify(response.data));
          localStorage.setItem('token', response.data.token);
          
          // 跳转到个人中心
          setTimeout(() => {
            this.$router.push('/mine');
          }, 1000);
        } else {
          this.showMessage(response.message || '登录失败', 'error');
        }
      } catch (error) {
        console.error('登录失败:', error);
        this.showMessage('网络错误，请稍后重试', 'error');
      } finally {
        this.loading = false;
      }
    },

    async handleRegister() {
      // 验证密码
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.showMessage('两次密码输入不一致', 'error');
        return;
      }

      if (this.registerForm.password.length < 6) {
        this.showMessage('密码长度不能少于6位', 'error');
        return;
      }

      this.loading = true;
      try {
        const response = await authAPI.register({
          username: this.registerForm.username,
          password: this.registerForm.password,
          nickname: this.registerForm.nickname,
          phone: this.registerForm.phone
        });
        
        if (response.code === 200) {
          this.showMessage('注册成功！请登录', 'success');
          // 清空注册表单
          this.registerForm = {
            username: '',
            password: '',
            confirmPassword: '',
            nickname: '',
            phone: ''
          };
          // 切换到登录
          setTimeout(() => {
            this.isLogin = true;
          }, 1500);
        } else {
          this.showMessage(response.message || '注册失败', 'error');
        }
      } catch (error) {
        console.error('注册失败:', error);
        this.showMessage('网络错误，请稍后重试', 'error');
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background-image: url('../imgs/1（背景图）.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
}

.login-container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  width: 120px;
  height: 120px;
  margin-bottom: 15px;
}

.title {
  font-size: 28px;
  color: #333;
  margin: 0 0 10px 0;
  font-weight: bold;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.tab-switch {
  display: flex;
  margin-bottom: 30px;
  background: #f5f5f5;
  border-radius: 10px;
  padding: 5px;
}

.tab-btn {
  flex: 1;
  padding: 12px;
  border: none;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s;
  color: #666;
}

.tab-btn.active {
  background: white;
  color: #667eea;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.message {
  margin-top: 20px;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@media (max-width: 480px) {
  .login-container {
    padding: 30px 20px;
  }
  
  .title {
    font-size: 24px;
  }
}
</style>