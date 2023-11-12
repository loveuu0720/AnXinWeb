<script setup>
import { Edit } from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
// 引入医生预约管理接口
import { doctorOrder } from '@/api/getAllOrder/doctorOrder'
// 引入更改状态的接口
import { refundStatus } from '@/api/ChangeStatus/docotrStatus'
import { ElMessage } from 'element-plus';
// 引入更改预约订单接口
import { changeDoctor } from '../../api/get/index'
// 引入baseURL
// 总页数
const total = ref(1)
// 医生数据（数组）
let doctorList = ref([])
// 当前的页码
const pageNo = ref(1)
// 条数
const limit = ref(5)
// 修改的抽屉开关
let drawer = ref(false)
// 存放修改的预约订单
let doctor_order_arr = reactive({})
// 页面一刷新就获取数据
onMounted(() => {
  getDoctorInfo()
})
// 封装获取医生预约数据
const getDoctorInfo = async () => {
  let res = await doctorOrder(pageNo.value, limit.value)
  console.log(res);
  doctorList.value = res.data.records
  total.value = parseInt(res.data.total)
}
// 更改订单状态
const change_doctor = (row) => {
  // 打开抽屉
  drawer.value = !drawer.value
  // 合并数据
  Object.assign(doctor_order_arr, row)
}
// 点击修改抽屉的确认按钮回调
const submit = async()=>{
 let res =  await changeDoctor(doctor_order_arr)
//  关闭抽屉
drawer.value = !drawer.value
 ElMessage.success("修改成功")
//  清空里面的数据
  doctor_order_arr = ''
  // 获取最新数据
  getDoctorInfo()
}
</script>

<template>
  <!-- main -->
  <!-- table展示用户信息 -->
  <el-card style="margin-top: 0px">
    <h1 class="title">医生预约订单管理</h1>
    <el-table stripe border style="margin: 10px 0px" :data="doctorList">
      <el-table-column label="序号" width="60px" type="index" align="center"></el-table-column>
      <el-table-column label="订单id" prop="id" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="医院" prop="hospital" align="center" show-overflow-tooltip width="100px"></el-table-column>
      <el-table-column label="科室" prop="department" align="center" show-overflow-tooltip width="80px"></el-table-column>
      <el-table-column label="医生姓名" prop="doctorname" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="医生电话" prop="phone" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="患者姓名" prop="patientuser" align="center" show-overflow-tooltip width="80px"></el-table-column>
      <el-table-column label="花费" prop="cost" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="医生头像" width="180px" prop="avatar" align="center" show-overflow-tooltip>
        <template #="{ row, $index }">
          <img :src="`${row.img}`" style="width: 150px; height: 180px" />
        </template>
      </el-table-column>
      <el-table-column label="预约时间" prop="reservationtime" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="状态" prop="comp" align="center" show-overflow-tooltip>
        <template #default="{ row, $index }">
          <el-select v-model="row.status" disabled>
            <el-option label="申请退款中" value="-2">申请退款中</el-option>
            <el-option label="已取消订单" value="-1">已取消订单</el-option>
            <el-option label="待支付" value="0">待支付</el-option>
            <el-option label="已支付" value="1">已支付</el-option>
            <el-option label="已预约陪诊" value="2">已预约陪诊</el-option>
            <el-option label="待完成" value="3">待完成</el-option>
            <el-option label="已完成" value="4">已完成</el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="reservationtime" align="center">
        <template #="{ row, $index }">
          <el-button type="primary" :icon="Edit" size="default" @click="change_doctor(row)" class="btn_pay">更改状态</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[5, 10, 15]" :background="true"
      layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="getDoctorInfo()"
      @current-change="getDoctorInfo()" />
  </el-card>

  <!-- (修改)抽屉组件 -->
  <el-drawer v-model="drawer" title="修改患者信息" direction="rtl">
    <el-form :rules="updateRules" :model="doctor_order_arr" label-position="left" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="doctor_order_arr.doctorname" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input placeholder="请输入手机号" v-model="doctor_order_arr.phone" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <template #="{ row, $index }">
          <el-select v-model="doctor_order_arr.status">
            <el-option label="申请退款中" value="-2" disabled />
            <el-option label="已取消订单" value="-1" />
            <el-option label="待支付" value="0" />
            <el-option label="已支付" value="1" />
            <el-option label="已预约陪诊" value="2" />
            <el-option label="待完成" value="3" />
            <el-option label="已完成" value="4" />
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit" class="btn">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.title {
  text-align: center;
  font-size: 25px;
  margin: -10px 0px 10px 0px;
}
.btn_pay {
    background: #7c83a5;
    border: none;
}
.btn_pay:disabled {
    background: #d3d3d3;
    border: none;
}
.btn_pay:disabled:hover {
    background: #d3d3d3;
    border: none;
}
.btn_pay:hover {
    background: #404455;
}
</style>
