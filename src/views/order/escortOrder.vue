<script setup>
import { ref, onMounted } from 'vue'
// 引入陪诊订单信息接口
import { cescortOrder } from '@/api/getAllOrder/escortOrder'
// 总页数
let total = ref(1)
// 当前页数
let pageNo = ref(1)
// 每页的数量
let limit = ref(10)
// 订单数据（数组）
let orderList = ref([])
/**
 * 
 */
onMounted(() => {
  getEscortOrder()
})
// 封装获取陪诊订单管理的方法
const getEscortOrder = async () => {
  let res = await cescortOrder()
  orderList.value = res.data
  total.value = res.data.length
}
// 分页器页面条数切换的回调
const changeSize = () => {
  getEscortOrder()
}
</script>

<template>
  <transition name="el-zoom-in-center">
    <div>
      <!-- main -->
      <!-- table展示用户信息 -->
      <el-card style="margin-top: 0px">
        <h1 class="title">陪诊订单管理</h1>
        <el-table border style="margin: 10px 0px" :data="orderList">
          <el-table-column label="序号" width="60px" type="index" align="center"></el-table-column>
          <el-table-column label="患者名称" prop="patientuser" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="患者手机号" prop="phone" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="医院" prop="hospital" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="科室" prop="department" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="医生姓名" prop="doctorname" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="陪诊师" prop="traineruser" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="状态" align="center" width="383px">
            <template #default="{ row, $index }">
              <el-select v-model="row.status" disabled>
                <el-option label="申请退款中" value="-2">申请退款中</el-option>
                <el-option label="已退款" value="-1">已退款</el-option>
                <el-option label="未付款" value="0">未付款</el-option>
                <el-option label="已支付" value="1">已支付</el-option>
                <el-option label="待接单" value="2">待接单</el-option>
                <el-option label="待完成" value="3">待完成</el-option>
                <el-option label="已完成" value="4">已完成</el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[10, 15,20]"
          :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="changeSize"
          @current-change="getEscortOrder()" />
      </el-card>
    </div>
  </transition>
</template>

<style scoped >
:deep() .el-radio__input {
  &[ is-disabled] {
    opacity: 0.8;
    cursor: not-allowed;
    background: red;
  }
}

.title {
  text-align: center;
  font-size: 25px;
  margin-top: -10px;
}
</style>
 