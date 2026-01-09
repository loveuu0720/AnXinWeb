import axios from 'axios'
import { ElMessage } from 'element-plus'
// 引入进度条
import { start,close } from '@/utils/nprogress'
export const baseURL = '/api'
const httpsRequest = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL: baseURL,
  timeout: 5000,
})
httpsRequest.interceptors.request.use((config) => {
  start()
  // config配置对象，headers属性请求头，经常给服务器端携带公共参数
    config.headers.token = localStorage.getItem('user_token')
  // 返回配置对象 
  return config
})
// 第三步：响应拦截器
httpsRequest.interceptors.response.use(
  (response) => {
    //成功回调
    close()
    // 简化数据
    return response.data
  },
  (error) => {
    // 失败回调：处理http网络错误的
    // 定义一个变量：存储网路错误信息
    let message = ''
    // http状态码
    message = error.response?.data?.errMessage || error.message || '网络错误'
    //提示错误信息
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)


export default httpsRequest

