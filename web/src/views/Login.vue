<template>
  <div class="login">
    <el-form :model="loginForm" status-icon ref="loginForm" label-width="100px" class="login__form" @submit.prevent="submitForm()">
      <h3>后台管理系统</h3>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="chpacha" label="验证码">
        <!-- 验证码 -->
        <el-row type="flex">
          <el-input placeholder="验证码" v-model="loginForm.chpacha" @keyup.enter.native="submitForm()"></el-input>

          <chpacha :identifyCode="identifyCode" @change="random_chpacha()"></chpacha>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="loginForm.checked">保持登录</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Chpacha from '../components/common/Chpacha'
export default {
  name: 'Login',
  components: {
    Chpacha
  },
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '1234',
        chpacha: '',
        // 是否保持登录
        checked: false
      },
      identifyCode: 'abcde'
    }
  },
  created() {
    this.random_chpacha()
  },
  methods: {
    check() {
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        this.$message.error('请输入用户名或密码')
        return false
      }
      if (this.loginForm.chpacha !== this.identifyCode) {
        this.$message.error('验证码错误')
        return false
      }
      return true
    },
    async submitForm() {
      const isValid = this.check()
      if (isValid) {
        try {
          const res = await this.$http.post('login', this.loginForm)
          console.log(res)
          // 保存token,nestjs规定token值必须前面加上"Bearer "
          window.sessionStorage.setItem('token', 'Bearer ' + res.data.access_token)
          this.$message.success('登录成功')
        } catch (error) {
          console.log('登录失败', error)
          this.$message.error('登录失败')
          this.random_chpacha()
        }
      } else {
        this.random_chpacha()
      }
    },
    resetForm() {
      // el-form-item 带有 prop 属性才能用此方法
      this.$refs.loginForm.resetFields()
    },
    random_chpacha() {
      const arr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      this.identifyCode = ''
      for (let i = 0; i < 5; i++) {
        this.identifyCode += arr[Math.floor(Math.random() * arr.length)]
      }
      // comment it
      this.loginForm.chpacha = this.identifyCode
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  position: relative;

  &__form {
    h3 {
      margin-left: 100px;
      margin-bottom: 30px;
    }
    min-width: 400px;
    max-width: 550px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
