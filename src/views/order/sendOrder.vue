<script setup lang='ts'>
// 引入获取全部寄药订单数据的接口
import { sendMedicine } from '../../api/getAllOrder/sendOrder'
// 引入修改快递单号的接口
import { sendChange } from '../../api/ChangeOrDelete/sendChange'
import { reactive, ref, onMounted } from 'vue'
import { Edit } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
// 定义获取的页数|当前页数
const pageNo = ref({
    page: 1,
    pageSize: 10
})
// 总页数
const total = ref(0)
// 寄药订单全部信息
const sendOrderArr = ref([])
// 每一个寄药订单的数据
const sendOrderList = reactive({})
// 控制dialog开关
const dialog = ref(false)
onMounted(() => {
    getAllSend()
})
// 封装获取全部订单数据的接口
const getAllSend = async () => {
    let res = await sendMedicine(pageNo.value)
    console.log(res);
    
    sendOrderArr.value = res.data.records
    total.value = Number(res.data.total)
}
// 点击编辑按钮的回调
const editSend = (row: any) => {
    Object.assign(sendOrderList, row)
    dialog.value = !dialog.value
}
// 点击dialog种的确定按钮回调
const changeUser = async()=>{
    await sendChange(sendOrderList)
    ElMessage.success("寄药成功")
    dialog.value = !dialog.value
}
// 点击取消的回调
const cancel = ()=>{
    dialog.value = !dialog.value
}
</script>

<template>
    <el-card style="margin-top: 10px">
        <h1 class="title">寄药订单管理</h1>
        <el-table border :data="sendOrderArr" stripe style="width: 100%">
            <el-table-column type="index" label="序号" align="center" width="70px" />
            <el-table-column prop="id" label="寄药订单id" align="center" />
            <el-table-column prop="prescriptionId" label="处方订单id" align="center" />
            <el-table-column prop="patientUserName" label="患者姓名" align="center" />
            <el-table-column prop="patientUserId" label="患者id" align="center" />
            <el-table-column prop="phone" label="手机号" align="center" />
            <el-table-column prop="address" label="地点" align="center" />
            <el-table-column prop="freight" label="运费" align="center" />
            <el-table-column prop="state" label="订单状态" width="240px" align="center">
                <template #default="{ row, $index }">
                    <el-radio-group v-model="row.state">
                        <el-radio label="0" disabled>待支付</el-radio>
                        <el-radio label="1" disabled>待发货</el-radio>
                        <el-radio label="2" disabled>已发货</el-radio>
                        <el-radio label="3" disabled>已完成</el-radio>
                    </el-radio-group>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200px">
                <template #="{ row, $index }">
                    <el-button class="btn" type="primary" :icon="Edit" @click="editSend(row)">寄药</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo.page" v-model:page-size="pageNo.pageSize" :page-sizes="[5, 10, 15]"
            :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="getAllSend()"
                @current-change="getAllSend()" />

        <!-- dialog组件 -->
        <el-dialog v-model="dialog" title="寄快递">
            <el-form :model="sendOrderList" label-position="left" label-width="100px">
                <el-form-item label="订单id">
                    <el-input v-model="sendOrderList.id" autocomplete="off" />
                </el-form-item>
                <el-form-item label="快递单号">
                    <el-input v-model="sendOrderList.trackingNumber" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="changeUser">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>

<style scoped lang="scss">
.title {
  text-align: center;
  font-size: 25px;
}
.btn {
    background: #7c83a5;
    border: none;
}
.btn:hover {
    background: #404455;
}
</style>