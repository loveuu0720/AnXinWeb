<script setup>
import { reactive, ref } from 'vue'
import router from '@/router'
import { staffUserLogin } from '@/api/user'
import { ElMessage } from 'element-plus'

/**
 * 
 */
const formModel = reactive({
  username: 'admin',
  password: '123456'
})
const form = ref()
const token = ref()
// 用户名
const username = ref()
// 点击登录的回调
const submit = async () => {
  let res1 =  await form.value.validate()
  console.log(res1);
  try {
    const res = await staffUserLogin(formModel)
    if (res && res.data) {
      // 存放用户名
      username.value = res.data
      // 本地存储token
      token.value = res.map?.token
      localStorage.setItem('user_token', token.value)
      // 本地存储用户名
      localStorage.setItem('name', username.value)
      ElMessage.success("登录成功！")
      router.push('/')
    } else {
      ElMessage.error(res?.msg || "登录失败，请检查用户名或密码")
    }
  } catch (error) {
    console.error('Login error:', error)
  }
}

// 表单校验规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 6,
      max: 16,
      message: '密码必须是6-16位',
      trigger: 'blur'
    }
  ]
}
</script>
<template>
  <el-form :model="formModel" ref="form" label-width="100px" :rules="rules" class="loginForm sign-in-form">
    <el-form-item label="用户名" prop="username">
      <el-input placeholder="请输入用户名" v-model="formModel.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" placeholder="请输入密码" v-model="formModel.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="submit-btn" @click="submit">登录</el-button>
    </el-form-item>
    <!-- 找回密码 -->
    <div class="tiparea">
      <p>忘记密码？ <a>立即找回</a></p>
    </div>
  </el-form>
</template>
<style scoped>
/* form */
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
  width: 100%;
  background-color: #388cee;
}

.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}

.tiparea p a {
  color: #409eff;
}
</style>
