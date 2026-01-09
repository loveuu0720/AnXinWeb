<script setup lang='ts'>
import { Search, Delete, Plus, HelpFilled,RefreshRight } from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
import { getAllHospital } from '../../api/get/index'
import { deleteHspAndPart } from '../../api/DeleteUser/deletehospital'
import { ElMessage, ElMessageBox } from 'element-plus'
import { submitHospital } from '../../api/get/index'
import { getHspPart } from '../../api/get/index'
import { submitPartment } from '../../api/get/index'
import { searchHospital } from '../../api/Search/searchHospital'
// 引入baseURL
import { baseURL } from '../../utils/request'
// 存放医院数据
let hspArr = ref()
// 存放科室的数据
let partment = reactive({})
// 总个数
let total = ref(0)
// 当前页面
let pageNo = ref(1)
// 页面的条数
let limit = ref(10)
// 文件名
let key = ref({
    fileName: ''
})
// token
let token = ref()
// 抽屉组件的开关
const drawer = ref(false)
// 医院名关键字
const hospitalName = ref('')
// 封装请求医院列表
const getHspArr = async () => {
    try {
        let res = await getAllHospital(pageNo.value, limit.value)
        if (res && res.data) {
            hspArr.value = res.data.records || []
            total.value = parseInt(res.data.total || 0)
        }
    } catch (error) {
        console.error('Failed to fetch hospital list:', error)
    }
}
// 页面挂载钩子函数
onMounted(() => {
    getHspArr()
    token.value = localStorage.getItem("user_token")

})
// 删除医院回调
const deleteHsp = async (id) => {
    await deleteHspAndPart(id)
    ElMessage.success("删除成功")
    getHspArr()
}
// 文件上传成功后的回调函数
const handleUploadSuccess = async (res) => {
    key.value.fileName = res.data
    let result = await submitHospital(key.value)

}
// 点击查看旗下科室的按钮
const getPartment = async (name) => {
    try {
        // 转换格式
        let res = await getHspPart(name, pageNo.value, limit.value)
        if (res && res.data) {
            partment = res.data.records || []
            // 打开抽屉
            drawer.value = !drawer.value
        }
    } catch (error) {
        console.error('Failed to fetch department list:', error)
    }
}
// 点击抽屉外关闭抽屉的提示回调
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('确认关闭吗?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
// 文件上传科室(Excel)成功的回调函数
const partmentHandSuccess = async (res) => {
    key.value.fileName = res.data
    let result = await submitPartment(key.value)
    console.log(result)


}
// 分页器页数切换回调
const changeSize = () => {
    getHspArr()
}
// 点击搜索按钮的回调
const searchUser = async() =>{
    let res =  await searchHospital(hospitalName.value)
    hspArr.value = res.data
}
// 点击取消搜索的回调
const reset = ()=>{
    getHspArr()
}
</script>

<template>
    <el-card class="el_card">
        <div class="box">
            <div class="left">
                <el-form :inline="true">
                    <el-form-item label="查询医院">
                        <el-input placeholder="请输入医院名称" v-model="hospitalName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="default" title="请添加搜索条件" @click="searchUser"
                            :icon="Search">搜索</el-button>
                        <el-button :icon="RefreshRight" @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="right">
                <el-upload class="upload-demo" :action="`${baseURL}/common/upload/excel`" multiple
                    :headers="{ token: token }" :on-success="handleUploadSuccess">
                    <el-button type="success" :icon="Plus">批量导入Excel文件医院</el-button>
                </el-upload>
            </div>
        </div>
    </el-card>
    <el-card style="margin-top: 10px">
        <el-table border style="margin: 10px 0px" :data="hspArr">
            <el-table-column label="序号" width="60px" type="index" align="center"></el-table-column>
            <el-table-column label="id" prop="id" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="医院" prop="name" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="地区" prop="address" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" align="center" width="300px" show-overflow-tooltip>
                <template #="{ row, $index }">
                    <el-button type="primary" @click="getPartment(row.name)" :icon="HelpFilled">旗下科室</el-button>
                    <el-popconfirm title="旗下所有科室也会一同删除，确定删除吗?" width="240px" @confirm="deleteHsp(row.id)">
                        <template #reference>
                            <el-button type="danger" :icon="Delete">删除医院</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[10, 20, 30]" :background="true"
            layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="changeSize"
            @current-change="getHspArr()" />
    </el-card>

    <!-- 展示科室抽屉组件 -->
    <el-drawer v-model="drawer" :title="`旗下科室`" direction="rtl" :before-close="handleClose">
        <template #header>
            <h4 class="title">旗下医院全部科室</h4>
            <el-upload class="upload-demo" :action="`${baseURL}/common/upload`" multiple :on-success="partmentHandSuccess"
                :headers="{ token: token }">
                <el-button class="btn" type="info" @click="">导入Excel科室</el-button>
            </el-upload>
        </template>
        <el-table class="table" :data="partment" border style="width: 100%">
            <el-table-column prop="hospitalid" width="200px" label="医院id" />
            <el-table-column prop="hospitalname" label="医院名称" width="180" />
            <el-table-column prop="departmentname" label="科室名称" width="180" />
        </el-table>
    </el-drawer>
</template>

<style scoped lang="scss">
.box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    .left {
        margin-top: 20px;
    }
}

.upload-demo {
    margin-bottom: -10px;
}

.title {
    text-align: center;
    margin-bottom: -40px;
}

.btn {
    margin-top: 20px;
    margin-bottom: -60px;
    position: absolute;
    top: 70px;
    left: 37%;

}

.table {
    margin-top: 40px;
}
</style>