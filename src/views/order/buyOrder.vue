<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { Comment } from '@element-plus/icons-vue'
// 引入获取全部买药数据
import { buyMedicine } from '../../api/getAllOrder/buyOrder'
// 引入获取药瓶详情的接口
import { getDetail } from '../../api/getAllOrder/buyOrder'
// 存储当前页面|条数
const pageNo = ref({
    page: 1,
    pageSize: 10
})
// 总条数
const total = ref(1)
// 存储所有买药订单的数据
const buyOrderArr = ref([])
// 存储药品详情数据
let buyOrderList = ref([])
// 控制抽屉的开关
const drawer = ref(false)
// 封装获取全部买药订单的方法
const getAllOrder = async () => {
    let res = await buyMedicine(pageNo.value)
    buyOrderArr.value = res.data.records
    total.value = Number(res.data.total)
}
// 页面挂载钩子函数
onMounted(() => {
    getAllOrder()
})
// 点击获取药瓶详情
const getMeDetail = async (id: any) => {
    // 打开抽屉
    drawer.value = !drawer.value
    let res = await getDetail(id)
    buyOrderList.value = res.data
    console.log(buyOrderList.value);

}
</script>

<template>
    <transition>
        <el-card style="margin-top: 10px">
            <h1 class="title">买药订单管理</h1>
            <el-table border :data="buyOrderArr" stripe style="width: 100%">
                <el-table-column type="selection" width="55" />
                <el-table-column type="index" label="序号" width="55" align="center" />
                <el-table-column prop="id" label="买药订单id" align="center" show-overflow-tooltip />
                <el-table-column prop="prescriptionId" label="处方订单id" align="center" show-overflow-tooltip />
                <el-table-column prop="patientUserName" label="患者姓名" align="center" show-overflow-tooltip />
                <el-table-column prop="patientUserId" label="患者id" align="center" show-overflow-tooltip />
                <el-table-column prop="phone" label="手机号" align="center" show-overflow-tooltip />
                <el-table-column prop="totalPrice" label="总价" align="center" show-overflow-tooltip />
                <el-table-column prop="state" label="订单状态" width="280px" height="100px" align="center"
                    show-overflow-tooltip>
                    <template #default="{ row, $index }">
                        <el-radio-group v-model="row.state">
                            <el-radio label="0" disabled border>待支付</el-radio>
                            <el-radio label="1" disabled border>待发货</el-radio>
                            <el-radio label="2" disabled border>已发货</el-radio>
                            <el-radio label="3" disabled border>已完成</el-radio>
                        </el-radio-group>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="200px">
                    <template #="{ row, $index }">
                        <el-button type="primary" class="btn" :icon="Comment" @click="getMeDetail(row.id)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination v-model:current-page="pageNo.page" v-model:page-size="pageNo.pageSize" :page-sizes="[5, 10, 15]"
                :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="getAllOrder()"
                @current-change="getAllOrder()" />
            <!-- 抽屉组件：显示详情 -->
            <el-drawer class="drawer" v-model="drawer" direction="rtl" size="40%">
                <h2 class="title">药品简介</h2>
                <!-- 药品轮播图 -->
                <el-carousel :interval="2000" arrow="always" height="450px">
                    <el-carousel-item v-for="item in buyOrderList" :key="item">
                        <h3 text="2xl" justify="center">
                            <img class="img" :src="item.img" alt="">
                        </h3>
                    </el-carousel-item>
                </el-carousel>
                <!-- 表格 -->
                <el-table :data="buyOrderList" stripe border style="margin-top: 20px;">
                    <el-table-column prop="prescriptionid" label="处方id" align="center"
                        show-overflow-tooltip></el-table-column>
                    <el-table-column prop="drugname" label="药品名" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="price" label="价格" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="number" label="数量" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="totalprice" label="总价" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="drugid" label="药瓶id" align="center" show-overflow-tooltip></el-table-column>
                </el-table>
            </el-drawer>
        </el-card>
    </transition>
</template>

<style scoped lang="scss">
.btn {
    background: #7c83a5;
    border: none;
}

.btn:hover {
    background: #404455;
}

.title {
    text-align: center;
    font-size: 25px;
}

.drawer {
    .title {
        margin-top: -20px;
        text-align: center;
    }
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>